import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, GitPullRequest } from "lucide-react"
import Link from "next/link"
import type { GitHubIssue } from "@/lib/github"

interface IssueCardProps {
  issue: GitHubIssue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <Card className="flex flex-col h-full transition-colors hover:bg-accent/5">
      <CardHeader>
        <CardTitle className="line-clamp-2 text-lg">
          <Link href={issue.url} target="_blank" className="hover:underline flex items-center gap-2">
            {issue.title}
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
        </CardTitle>
        <CardDescription>
          <Link href={issue.repository.url} target="_blank" className="hover:underline flex items-center gap-1">
            <GitPullRequest className="h-4 w-4" />
            {issue.repository.nameWithOwner}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {issue.body || 'No description provided'}
        </p>
        <div className="flex gap-2 flex-wrap">
          {issue.labels.nodes.map((label) => (
            <Badge 
              key={label.name}
              variant="secondary"
              style={{
                backgroundColor: `#${label.color}20`,
                color: `#${label.color}`,
                borderColor: `#${label.color}40`,
              }}
              className="border"
            >
              {label.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={issue.author.url} target="_blank" className="flex items-center gap-2 hover:underline">
          <Avatar className="h-6 w-6">
            <AvatarImage src={issue.author.avatarUrl} alt={issue.author.login} />
            <AvatarFallback className="text-xs">{issue.author.login[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{issue.author.login}</span>
        </Link>
      </CardFooter>
    </Card>
  )
} 