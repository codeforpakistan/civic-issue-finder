import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Heart, Github, Menu } from "lucide-react"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Civic Issue Finder",
  description: "Find open source civic tech issues to contribute to",
};

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Problem Statements', href: '/problems' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="flex flex-col min-h-screen">
            <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
              <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <h1 className="font-semibold">
                    <Link href="/">Civic Issue Finder</Link>
                  </h1>
                  {/* Desktop navigation */}
                  <nav className="hidden sm:flex gap-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="flex items-center gap-4">
                  <ModeToggle />
                  <a 
                    href="https://github.com/codeforpakistan/civic-issue-finder" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  {/* Mobile menu */}
                  <Sheet>
                    <SheetTrigger asChild className="sm:hidden">
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <div className="flex flex-col gap-4 mt-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </header>

            <main className="flex-1 container mx-auto px-4">
              {children}
            </main>

            <footer className="border-t py-6 bg-muted/50 mt-auto">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                Built with{" "}
                <Heart className="inline-block h-4 w-4 text-red-500" aria-label="love" />{" "}
                by{" "}
                <a 
                  href="https://codeforpakistan.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-foreground hover:text-primary transition-colors text-green-500 hover:text-green-600"
                >
                  Code for Pakistan
                </a>
                {" "}using the GitHub API
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
