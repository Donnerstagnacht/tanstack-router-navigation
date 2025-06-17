import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/projects/tasks')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/projects/tasks"!</div>;
}
