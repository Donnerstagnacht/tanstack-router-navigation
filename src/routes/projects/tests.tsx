import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/projects/tests')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/tests"!</div>
}
