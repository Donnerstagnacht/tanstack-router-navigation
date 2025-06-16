import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects')({
  component: Projects,
})

function Projects() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello Projects</h1>
    </div>
  )
}
