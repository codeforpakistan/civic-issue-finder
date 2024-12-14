import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { Heart } from "lucide-react"
import Link from "next/link"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Civic Issue Finder",
  description: "Find open source civic tech issues to contribute to",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="font-semibold">
                  <Link href="/">Civic Issue Finder</Link>
                </h1>
                <nav className="hidden sm:flex gap-6">
                  <Link 
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <a 
                  href="https://github.com/your-repo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t py-6 mt-8 bg-muted/50">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              Built with{" "}
              <Heart className="inline-block h-4 w-4 text-red-500" aria-label="love" />{" "}
              by{" "}
              <a 
                href="https://codeforpakistan.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary transition-colors"
              >
                Code for Pakistan
              </a>
              {" "}using the GitHub API
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
