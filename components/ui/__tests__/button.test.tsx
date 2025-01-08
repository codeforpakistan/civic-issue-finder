import { render, screen } from '@testing-library/react'
import { Button } from '../button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders button with custom className', () => {
    render(<Button className="custom-class">Click me</Button>)
    expect(screen.getByText('Click me')).toHaveClass('custom-class')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    screen.getByText('Click me').click()
    expect(handleClick).toHaveBeenCalled()
  })
}) 