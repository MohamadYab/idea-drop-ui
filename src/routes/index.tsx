import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div>
      This project is part of a "Modern React" course by Brad Traversy - 2025
    </div>
  )
}
