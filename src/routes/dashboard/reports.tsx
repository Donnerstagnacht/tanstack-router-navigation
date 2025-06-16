import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/reports"!</div>
}
