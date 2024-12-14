import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">About Civic Issue Finder</h1>
          <p className="text-lg text-muted-foreground">
            Connecting developers with meaningful civic tech opportunities
          </p>
        </div>

        <div className="space-y-6 text-muted-foreground">
          <p className="leading-7">
            The Civic Issue Finder helps connect developers, designers, and civic innovators 
            with open source projects that make a difference in communities. Inspired by 
            Code for America&apos;s original civic issue finder, this tool aggregates GitHub issues 
            from civic tech projects to help you find ways to contribute.
          </p>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Why Civic Tech?</h2>
            <p className="leading-7">
              Civic technology bridges the gap between government services and public needs, 
              making services more accessible, efficient, and user-friendly. By contributing 
              to civic tech projects, you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Make a direct impact on how people interact with government services</li>
              <li>Join a community of civic-minded technologists</li>
              <li>Build your portfolio while working on meaningful projects</li>
              <li>Help make public services more efficient and accessible</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">How to Contribute</h2>
            <p className="leading-7">
              Each issue card represents an opportunity to contribute to a civic tech project. 
              You can filter by programming language to find issues that match your skills. 
              When you find an interesting issue:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Read the issue description and project guidelines</li>
              <li>Join the project&apos;s community (Discord, Slack, or discussions)</li>
              <li>Comment on the issue to express your interest</li>
              <li>Fork the repository and start contributing!</li>
            </ol>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Get Started</h3>
              <p className="text-muted-foreground mb-4">
                Ready to make a difference? Browse open issues and find your first contribution.
              </p>
              <Button asChild>
                <Link href="/">
                  Browse Issues
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Join the Community</h3>
              <p className="text-muted-foreground mb-4">
                Connect with other civic tech contributors and find projects to collaborate on.
              </p>
              <Button variant="outline" asChild>
                <a 
                  href="https://github.com/your-repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            Inspired from (now deprecated) Code for America&apos;s original Civic Issue Finder
          </p>
        </div>
      </div>
    </div>
  )
} 