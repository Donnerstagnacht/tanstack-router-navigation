import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/files')({ component: Files });

function Files() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Hello Files</h1>
    </div>
  );
}
