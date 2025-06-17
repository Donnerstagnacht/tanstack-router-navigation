import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/home')({
  component: Home,
});

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Hello Home</h1>
    </div>
  );
}
