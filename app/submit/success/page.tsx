import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function SubmitSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 text-center space-y-6">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold">Problem Statement Submitted!</h1>
          <p className="text-muted-foreground">
            Thank you for submitting your problem statement. Our team will review it
            and publish it once approved.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/problems">View All Problems</Link>
            </Button>
            <Button asChild>
              <Link href="/submit">Submit Another</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 