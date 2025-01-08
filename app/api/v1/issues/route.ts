import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'
import { graphql } from "@octokit/graphql"

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GH_PAT}`,
  },
});

interface GitHubResponse {
  search: {
    issueCount: number
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
    nodes: Array<{
      id: string
      title: string
      body: string
      url: string
      repository: {
        name: string
        owner: {
          login: string
          avatarUrl: string
        }
      }
      labels: {
        nodes: Array<{
          name: string
          color: string
        }>
      }
    }>
  }
}

export async function GET(request: Request) {
  const headersList = headers()
  const apiKey = headersList.get('x-api-key')
  
  // Rate limiting
  const limiter = await rateLimit(request)
  if (!limiter.success) {
    return new NextResponse('Too Many Requests', { status: 429 })
  }

  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const per_page = Number(searchParams.get('per_page')) || 12
  const language = searchParams.get('language') || ''

  try {
    const query = `
      query($queryString: String!, $first: Int!, $after: String) {
        search(query: $queryString, type: ISSUE, first: $first, after: $after) {
          issueCount
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on Issue {
              id
              title
              body
              url
              repository {
                name
                owner {
                  login
                  avatarUrl
                }
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
    `

    const queryString = `is:open is:issue label:civic-tech-issue archived:false ${language ? `language:${language}` : ''}`
    const after = page > 1 ? btoa(`cursor:${(page - 1) * per_page}`) : null

    const data = await graphqlWithAuth(query, {
      queryString,
      first: per_page,
      after,
    }) as GitHubResponse

    return NextResponse.json({
      items: data.search.nodes,
      meta: {
        total: data.search.issueCount,
        page,
        per_page,
        has_next_page: data.search.pageInfo.hasNextPage,
        documentation_url: `${process.env.NEXT_PUBLIC_APP_URL}/docs/api`
      }
    })

  } catch (error: any) {
    console.error('GitHub API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch issues' }, 
      { status: 500 }
    )
  }
} 