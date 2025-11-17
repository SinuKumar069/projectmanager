import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { GlobalTasksView } from '@/components/tasks/global-tasks-view'

export default function TasksPage() {
  return (
    <DashboardLayout>
      <GlobalTasksView />
    </DashboardLayout>
  )
}
