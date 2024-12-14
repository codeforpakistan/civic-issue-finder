"use client"
import { IssuesList } from "@/components/IssuesList"
import { useSearchParams } from 'next/navigation'

export default function EmbedPage() {
  const searchParams = useSearchParams()
  const theme = searchParams.get('theme') === 'dark' ? 'dark' : 'light'

  return (
    <div className="p-2">
      <IssuesList minimal={true} theme={theme} />
    </div>
  )
} 