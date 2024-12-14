"use client"
import { ProjectCard } from "@/components/ProblemCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface Problem {
  id: string;
  department: string;
  problemStatement: string;
  status: string;
  year: number;
  githubUrl?: string;
  deploymentUrl?: string;
  type: string;
  isPublished: boolean;
}

interface ProblemsResponse {
  items: Problem[];
  total_count: number;
}

export default function ProblemsPage() {
  const [problems, setProblems] = useState<ProblemsResponse>({ items: [], total_count: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProblems = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/problems');
        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error('Failed to fetch problems:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblems();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Problem Statements</h1>
          <p className="text-muted-foreground">
            {problems.total_count} problems collected
          </p>
        </div>

        {/* Grid of problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.items.map((problem) => (
            <ProjectCard key={problem.id} project={problem} />
          ))}
        </div>
      </div>
    </div>
  );
} 