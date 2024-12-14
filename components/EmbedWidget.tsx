"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IssuesList } from "@/components/IssuesList"
import { Textarea } from "@/components/ui/textarea"

export function EmbedWidget() {
  const [copied, setCopied] = useState(false)
  const [height, setHeight] = useState("600")
  
  const embedCode = `<iframe 
    src="${process.env.NEXT_PUBLIC_APP_URL}/embed" 
    width="100%" 
    height="${height}px" 
    frameborder="0"
    title="Civic Issue Finder">
  </iframe>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Height (px)</label>
          <Input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Embed Code</label>
        <div className="relative">
          <Textarea
            value={embedCode}
            readOnly
            className="font-mono text-sm min-h-[155px] resize-none"
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-2"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4 mr-2" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h4 className="text-sm font-medium mb-4">Preview</h4>
        <div 
          className="rounded border bg-background" 
          style={{ height: `${height}px` }}
        >
          <IssuesList minimal={true} />
        </div>
      </div>
    </div>
  )
} 