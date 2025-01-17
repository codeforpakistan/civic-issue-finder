"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GitPullRequest, Users, Loader2 } from "lucide-react"
import Link from "next/link"
import type { GitHubStats } from "@/lib/github"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function StatsPage() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openCount, setOpenCount] = useState(0)
  const [closedCount, setClosedCount] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) throw new Error('Failed to fetch stats')
        const data = await response.json()
        setStats(data)
        
        setTimeout(() => {
          setOpenCount(data.openIssues)
          setClosedCount(data.closedIssues)
        }, 300)
      } catch (error) {
        console.error('Error fetching stats:', error)
        setError('Failed to load statistics')
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading statistics...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Civic Tech Statistics</h1>
          <p className="text-muted-foreground mt-2">
            Overview of civic tech issue contributions and community engagement
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={openCount} />
              <p className="text-xs text-muted-foreground">
                Active civic tech opportunities
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Issues</CardTitle>
              <GitPullRequest className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={closedCount} />
              <p className="text-xs text-muted-foreground">
                Completed civic tech solutions
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Top Contributors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.contributors.map((contributor) => (
                <div
                  key={contributor.login}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={contributor.avatarUrl} />
                      <AvatarFallback>
                        {contributor.login.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`https://github.com/${contributor.login}`}
                        target="_blank"
                        className="font-medium hover:underline"
                      >
                        {contributor.login}
                      </Link>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">
                          {contributor.issuesOpened} opened
                        </Badge>
                        <Badge variant="outline">
                          {contributor.issuesClosed} closed
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
