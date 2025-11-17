import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { ProjectDetail } from '@/components/projects/project-detail'

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <ProjectDetail projectId={params.id} />
    </DashboardLayout>
  )
}
