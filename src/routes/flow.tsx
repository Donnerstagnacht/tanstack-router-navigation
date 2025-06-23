import { createFileRoute } from '@tanstack/react-router';
import { FlowEditor } from '@/components/ui-flow/flowEditor.tsx';

export const Route = createFileRoute('/flow')({
  component: RouteComponent,
});

function RouteComponent() {
  return <FlowEditor />;
}
