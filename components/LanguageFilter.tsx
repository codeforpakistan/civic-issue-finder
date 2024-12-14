import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const LANGUAGES = [
  { value: "all", label: "All Languages" },
  { value: "language:python", label: "Python" },
  { value: "language:javascript", label: "JavaScript" },
  { value: "language:typescript", label: "TypeScript" },
  { value: "language:java", label: "Java" },
  { value: "language:ruby", label: "Ruby" },
  { value: "language:go", label: "Go" },
  { value: "language:rust", label: "Rust" },
  { value: "language:php", label: "PHP" },
  { value: "language:csharp", label: "C#" },
  { value: "language:kotlin", label: "Kotlin" },
  { value: "language:swift", label: "Swift" },
];

interface LanguageFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageFilter({ value, onChange }: LanguageFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((language) => (
          <SelectItem key={language.value} value={language.value}>
            {language.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 