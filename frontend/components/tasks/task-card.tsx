'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { TaskDetailDialog } from './task-detail-dialog'

interface TaskCardProps {
  task: any
  onTaskUpdate: (task: any) => void
  onClick?: () => void
}

export function TaskCard({ task, onTaskUpdate, onClick }: TaskCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSave = (data: any) => {
    onTaskUpdate({ ...task, ...data })
    setIsDialogOpen(false)
  }

  const priorityColor = {
    high: 'bg-destructive/20 text-destructive',
    medium: 'bg-accent/20 text-accent',
    low: 'bg-muted text-muted-foreground',
  }[task.priority]

  const statusLabel = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
  }[task.status]

  return (
    <>
      <Card
        className="p-4 cursor-pointer hover:shadow-md hover:border-accent transition-all group"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm flex-1 line-clamp-2 group-hover:text-accent transition-colors">
              {task.title}
            </h4>
            <span className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${priorityColor}`}>
              {task.priority}
            </span>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              {task.attachments > 0 && <span>📎 {task.attachments}</span>}
              {task.subtasks > 0 && <span>✓ {task.completedSubtasks}/{task.subtasks}</span>}
            </div>
            <span className="text-xs text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
      </Card>

      <TaskDetailDialog
        task={task}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
      />
    </>
  )
}
