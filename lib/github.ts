import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer ${process.env.GH_PAT}`,
  },
});

export interface GitHubIssue {
  id: number;
  title: string;
  url: string;
  body: string;
  repository: {
    nameWithOwner: string;
    url: string;
  };
  author: {
    login: string;
    url: string;
    avatarUrl: string;
  };
  labels: {
    nodes: {
      name: string;
      color: string;
    }[];
  };
}

export interface GitHubStats {
  openIssues: number;
  closedIssues: number;
  totalRepositories: number;
  averageTimeToClose: number;
  topLanguages: Array<{
    name: string;
    count: number;
  }>;
  recentActivity: Array<{
    date: string;
    opened: number;
    closed: number;
  }>;
  contributors: Array<{
    login: string;
    avatarUrl: string;
    issuesOpened: number;
    issuesClosed: number;
  }>;
}

export async function fetchGitHubIssues(
  page: number = 1, 
  perPage: number = 12,
  language: string = ""
) {
  const query = `
    query ($searchQuery: String!, $first: Int!, $after: String) {
      search(query: $searchQuery, type: ISSUE, first: $first, after: $after) {
        issueCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          ... on Issue {
            id
            title
            url
            body
            repository {
              nameWithOwner
              url
            }
            author {
              login
              url
              avatarUrl
            }
            labels(first: 5) {
              nodes {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const after = page > 1 ? btoa(`cursor:${(page - 1) * perPage}`) : null;
    const searchQuery = `label:civic-tech-issue is:open is:issue ${language === 'all' ? '' : language}`.trim();
    const response: any = await graphqlWithAuth(query, {
      searchQuery: searchQuery,
      first: perPage,
      after,
    });

    return {
      items: response.search.nodes,
      total_count: response.search.issueCount,
      pageInfo: response.search.pageInfo,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    throw error;
  }
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  console.log("Fetching fresh stats from GitHub...");
  
  const query = `
    query {
      openIssues: search(query: "label:civic-tech-issue is:open is:issue", type: ISSUE, first: 100) {
        issueCount
        nodes {
          ... on Issue {
            state
            author {
              login
              avatarUrl
            }
            repository {
              nameWithOwner
              primaryLanguage { name }
            }
            createdAt
          }
        }
      }
      closedIssues: search(query: "label:civic-tech-issue is:closed is:issue", type: ISSUE, first: 100) {
        issueCount
        nodes {
          ... on Issue {
            state
            author {
              login
              avatarUrl
            }
            closedAt
            createdAt
          }
        }
      }
      repositories: search(query: "label:civic-tech-issue", type: REPOSITORY, first: 100) {
        repositoryCount
      }
    }
  `;

  try {
    const data: any = await graphqlWithAuth(query);
    
    // Process contributors from both open and closed issues
    const contributorMap = new Map();
    
    // Process open issues
    if (data.openIssues?.nodes) {
      data.openIssues.nodes.forEach((issue: any) => {
        if (!issue.author) return;
        
        const login = issue.author.login;
        if (!contributorMap.has(login)) {
          contributorMap.set(login, {
            login,
            avatarUrl: issue.author.avatarUrl,
            issuesOpened: 0,
            issuesClosed: 0,
          });
        }
        const contributor = contributorMap.get(login);
        contributor.issuesOpened++;
      });
    }

    // Process closed issues
    if (data.closedIssues?.nodes) {
      data.closedIssues.nodes.forEach((issue: any) => {
        if (!issue.author) return;
        
        const login = issue.author.login;
        if (!contributorMap.has(login)) {
          contributorMap.set(login, {
            login,
            avatarUrl: issue.author.avatarUrl,
            issuesOpened: 0,
            issuesClosed: 0,
          });
        }
        const contributor = contributorMap.get(login);
        contributor.issuesClosed++;
      });
    }

    // Convert to array and sort by total issues
    const contributors = Array.from(contributorMap.values())
      .sort((a, b) => 
        (b.issuesOpened + b.issuesClosed) - (a.issuesOpened + a.issuesClosed)
      )
      .slice(0, 10); // Top 10 contributors

    const result: GitHubStats = {
      openIssues: data.openIssues?.issueCount || 0,
      closedIssues: data.closedIssues?.issueCount || 0,
      totalRepositories: data.repositories?.repositoryCount || 0,
      averageTimeToClose: 0,
      topLanguages: [],
      recentActivity: [],
      contributors,
    };

    console.log("Fresh stats fetched:", result);
    return result;
    
  } catch (error) {
    console.error("GitHub API Error:", error);
    throw error;
  }
} 