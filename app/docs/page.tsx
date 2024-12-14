import { EmbedWidget } from "@/components/EmbedWidget";
import { ShareButton } from "@/components/ShareButton";
import { siteConfig } from '@/lib/config'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Integration Guide</h1>
          <p className="text-lg text-muted-foreground">
            Multiple ways to integrate and share civic tech opportunities
          </p>
        </div>

        <Tabs defaultValue="embed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="embed">Embed Widget</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
            <TabsTrigger value="share">Share</TabsTrigger>
          </TabsList>

          <TabsContent value="embed" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Embed the Issue Finder</CardTitle>
                  <CardDescription>
                    Add the Civic Issue Finder to your website or blog
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EmbedWidget />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Access our API to integrate civic tech issues into your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Endpoints</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-mono text-sm">
                      <Code className="h-4 w-4" />
                      GET /api/v1/issues
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Returns a list of civic tech issues with pagination support
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Query Parameters</h3>
                  <div className="space-y-4">
                    <div>
                      <code className="text-sm">page</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Page number for pagination (default: 1)
                      </p>
                    </div>
                    <div>
                      <code className="text-sm">per_page</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Number of issues per page (default: 12, max: 100)
                      </p>
                    </div>
                    <div>
                      <code className="text-sm">language</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        Filter issues by programming language
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="share" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Share & Spread</CardTitle>
                <CardDescription>
                  Help spread civic tech opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Share the Civic Issue Finder with your network and help grow the civic tech community.
                </p>
                <ShareButton url={siteConfig.url} title={siteConfig.title} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 