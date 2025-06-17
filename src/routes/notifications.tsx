import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/notifications')({
  component: Notifications,
});

function Notifications() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Hello Notifications</h1>
    </div>
  );
}
