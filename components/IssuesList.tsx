"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Issue {
  id: string
  title: string
  repository: {
    name: string
    owner: {
      login: string
    }
  }
  url: string
}

interface IssuesListProps {
  minimal?: boolean
  theme?: 'light' | 'dark'
}

export function IssuesList({ minimal = false, theme }: IssuesListProps) {
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('/api/v1/issues?per_page=5')
        const data = await response.json()
        setIssues(data.items)
      } catch (error) {
        console.error('Failed to fetch issues:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchIssues()
  }, [])

  const content = (
    <div className="space-y-4">
      {minimal && (
        <div className="flex items-center justify-between text-sm">
          <span>Civic Issue Finder</span>
          <a 
            href={process.env.NEXT_PUBLIC_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View All
          </a>
        </div>
      )}
      {issues.map((issue) => (
        <a
          key={issue.id}
          href={issue.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base line-clamp-2">
                {issue.title}
              </CardTitle>
              <CardDescription>
                {issue.repository.owner.login}/{issue.repository.name}
              </CardDescription>
            </CardHeader>
          </Card>
        </a>
      ))}
    </div>
  )

  if (theme) {
    return (
      <div className={theme}>{content}</div>
    )
  }

  return content
} 