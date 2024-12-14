"use client"
import { Suspense } from 'react'
import { IssueCard } from "@/components/IssueCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

// Move this to a separate client component
function IssueCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardFooter>
    </Card>
  )
}

// Client component with all the hooks
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import type { GitHubIssue } from "@/lib/github"
import { LanguageFilter } from "@/components/LanguageFilter"

interface IssuesResponse {
  items: GitHubIssue[];
  total_count: number;
}

function HomeContent() {
  const [issues, setIssues] = useState<IssuesResponse>({ items: [], total_count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLanguage = searchParams.get('language') || 'all';

  useEffect(() => {
    const fetchIssues = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/issues?page=${currentPage}&language=${currentLanguage}`
        );
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, [currentPage, currentLanguage]);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&language=${currentLanguage}`);
  };

  const handleLanguageChange = (language: string) => {
    router.push(`?page=1&language=${language}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading issues...
              </span>
            ) : (
              `${issues.total_count} Open Issues`
            )}
          </h2>
          <LanguageFilter 
            value={currentLanguage} 
            onChange={handleLanguageChange}
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="border rounded-lg p-6 shadow-sm">
                <IssueCardSkeleton />
              </div>
            ))}
          </div>
        ) : issues.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No issues found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.items.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            disabled={currentPage === 1 || isLoading}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={isLoading || issues.items.length === 0}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Server component
export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
