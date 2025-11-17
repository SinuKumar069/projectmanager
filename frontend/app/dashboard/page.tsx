import { AuthGuard } from '@/components/auth-guard'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProjectsList } from '@/components/projects/projects-list'

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground">Manage and monitor all your projects</p>
          </div>
          <ProjectsList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
