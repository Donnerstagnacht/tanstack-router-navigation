import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/calendar')({
  component: Calendar,
})

function Calendar() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello Calendar</h1>
    </div>
  )
}
