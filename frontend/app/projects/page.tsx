import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProjectsManagement } from '@/components/projects/projects-management'

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsManagement />
    </DashboardLayout>
  )
}
