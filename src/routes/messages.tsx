import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/messages')({
  component: Messages,
})

function Messages() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hello Messages</h1>
    </div>
  )
}
