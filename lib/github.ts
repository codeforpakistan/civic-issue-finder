import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `bearer ${process.env.GITHUB_PAT}`,
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