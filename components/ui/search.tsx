"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void
}

export function SearchInput({ onSearch, ...props }: SearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search projects..."
        className="pl-8"
        onChange={(e) => onSearch(e.target.value)}
        {...props}
      />
    </div>
  )
} 