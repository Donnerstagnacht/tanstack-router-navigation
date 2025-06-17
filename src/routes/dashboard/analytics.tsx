import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/analytics')({
  component: Analytics,
});

function Analytics() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow">
          <h2 className="mb-2 text-xl font-medium">User Statistics</h2>
          <p>Active users: 1,284</p>
          <p>New sign-ups: 48</p>
          <p>Average session time: 12m 34s</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow">
          <h2 className="mb-2 text-xl font-medium">Performance</h2>
          <p>Page load time: 1.2s</p>
          <p>API response time: 0.8s</p>
          <p>Server uptime: 99.98%</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow">
          <h2 className="mb-2 text-xl font-medium">Engagement</h2>
          <p>Average pages per session: 5.3</p>
          <p>Bounce rate: 22%</p>
          <p>Return visitor rate: 68%</p>
        </div>
      </div>
    </div>
  );
}
