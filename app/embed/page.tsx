import { Suspense } from 'react'
import { IssuesList } from "@/components/IssuesList"

export default function EmbedPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-muted-foreground">Loading issues...</div>
      </div>
    }>
      <div className="p-2">
        <IssuesList minimal={true} />
      </div>
    </Suspense>
  )
}