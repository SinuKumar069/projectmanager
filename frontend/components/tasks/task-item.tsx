'use client'

import { Card } from '@/components/ui/card'

interface TaskItemProps {
  task: any
  isExpanded: boolean
  onToggleExpand: () => void
}

export function TaskItem({ task, isExpanded, onToggleExpand }: TaskItemProps) {
  const priorityColor = {
    high: 'bg-destructive/20 text-destructive',
    medium: 'bg-accent/20 text-accent',
    low: 'bg-muted text-muted-foreground',
  }[task.priority]

  const statusColor = {
    todo: 'bg-muted/40',
    in_progress: 'bg-accent/10',
    done: 'bg-success/10',
  }[task.status]

  return (
    <Card className={`p-3 cursor-pointer transition-all hover:shadow-md ${statusColor}`} onClick={onToggleExpand}>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm flex-1">{task.title}</h4>
          <span className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${priorityColor}`}>
            {task.priority}
          </span>
        </div>

        {isExpanded && (
          <div className="space-y-2 pt-2 border-t border-border text-xs text-muted-foreground">
            <p>{task.description}</p>
            <div className="flex items-center justify-between">
              <span>Assigned to: {task.assignee}</span>
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-4">
              <span>📎 {task.attachments} attachment{task.attachments !== 1 ? 's' : ''}</span>
              <span>✓ {task.completedSubtasks}/{task.subtasks} subtasks</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
