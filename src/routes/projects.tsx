import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/projects')({
  component: Projects,
});

function Projects() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Projects Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage and track your project tasks.</p>
            <Button asChild>
              <Link to="/projects/tasks">View Tasks</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Review test results and performance metrics.</p>
            <Button asChild>
              <Link to="/projects/tests">View Tests</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <Link to="/projects/tasks">All Tasks</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/projects/tests">All Tests</Link>
        </Button>
      </div>
    </div>
  );
}
