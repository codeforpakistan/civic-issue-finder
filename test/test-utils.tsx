import { render as rtlRender } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from 'next-themes'

function render(ui: ReactElement, options = {}) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider enableSystem={false} attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    )
  }

  return rtlRender(ui, {
    wrapper: Wrapper,
    ...options,
  })
}

// Re-export everything
export * from '@testing-library/react'
export { render } 