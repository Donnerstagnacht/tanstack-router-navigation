import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/analytics')({
  component: Analytics,
})

function Analytics() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card text-card-foreground rounded-lg shadow p-4">
          <h2 className="text-xl font-medium mb-2">User Statistics</h2>
          <p>Active users: 1,284</p>
          <p>New sign-ups: 48</p>
          <p>Average session time: 12m 34s</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow p-4">
          <h2 className="text-xl font-medium mb-2">Performance</h2>
          <p>Page load time: 1.2s</p>
          <p>API response time: 0.8s</p>
          <p>Server uptime: 99.98%</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg shadow p-4">
          <h2 className="text-xl font-medium mb-2">Engagement</h2>
          <p>Average pages per session: 5.3</p>
          <p>Bounce rate: 22%</p>
          <p>Return visitor rate: 68%</p>
        </div>
      </div>
    </div>
  );
}
