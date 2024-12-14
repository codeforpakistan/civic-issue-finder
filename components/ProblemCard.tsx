import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Github, Globe } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  project: {
    id: string;
    department: string;
    problemStatement: string;
    status: string;
    year: number;
    githubUrl?: string;
    deploymentUrl?: string;
    type: string;
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full transition-colors hover:bg-accent/5">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="line-clamp-2 text-lg">
            {project.problemStatement}
          </CardTitle>
          <Badge className="bg-secondary text-secondary-foreground">
            {project.type}
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          {project.department}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Badge className={
            project.status === 'Completed' ? 'bg-primary text-primary-foreground' :
            project.status === 'In Progress' ? 'bg-secondary text-secondary-foreground' :
            'border bg-background hover:bg-accent'
          }>
            {project.status}
          </Badge>
          <Badge className="border bg-background hover:bg-accent flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {project.year}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {project.githubUrl && (
          <Link 
            href={project.githubUrl}
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
          </Link>
        )}
        {project.deploymentUrl && (
          <Link 
            href={project.deploymentUrl}
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-4 w-4" />
          </Link>
        )}
      </CardFooter>
    </Card>
  )
} 