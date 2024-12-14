import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, Github, Globe } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

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
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group flex flex-col h-full transition-colors hover:bg-muted/50 cursor-pointer">
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              <CardTitle className="line-clamp-2 text-lg">
                {project.problemStatement}
              </CardTitle>
              <Badge variant="secondary">
                {project.type}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              {project.department}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <div className="flex gap-2 flex-wrap">
              <Badge variant={
                project.status === 'Completed' ? 'default' :
                project.status === 'In Progress' ? 'secondary' :
                'outline'
              }>
                {project.status}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {project.year}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project.problemStatement}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 pt-2">
            <Building2 className="h-4 w-4" />
            {project.department} • {project.year}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-2 flex-wrap">
            <Badge variant={
              project.status === 'Completed' ? 'default' :
              project.status === 'In Progress' ? 'secondary' :
              'outline'
            }>
              {project.status}
            </Badge>
            <Badge variant="secondary">
              {project.type}
            </Badge>
          </div>

          {(project.githubUrl || project.deploymentUrl) && (
            <div className="flex flex-wrap gap-4">
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <Link 
                    href={project.githubUrl} 
                    target="_blank" 
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </Link>
                </Button>
              )}
              {project.deploymentUrl && (
                <Button variant="outline" asChild>
                  <Link 
                    href={project.deploymentUrl} 
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <Globe className="h-4 w-4" />
                    View Live Demo
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 