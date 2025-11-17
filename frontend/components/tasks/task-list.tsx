'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TaskCard } from './task-card'

const mockTasks = [
  {
    id: '1',
    title: 'Design homepage wireframes',
    description: 'Create wireframes for new homepage with Figma',
    status: 'in_progress',
    assignee: 'John Doe',
    priority: 'high',
    dueDate: '2024-12-20',
    subtasks: 3,
    completedSubtasks: 1,
    attachments: 1,
  },
  {
    id: '2',
    title: 'Setup development environment',
    description: 'Configure dev environment and all dependencies',
    status: 'done',
    assignee: 'Jane Smith',
    priority: 'medium',
    dueDate: '2024-12-15',
    subtasks: 2,
    completedSubtasks: 2,
    attachments: 0,
  },
  {
    id: '3',
    title: 'Create user authentication flow',
    description: 'Implement JWT-based authentication system',
    status: 'todo',
    assignee: 'Mike Johnson',
    priority: 'high',
    dueDate: '2024-12-25',
    subtasks: 4,
    completedSubtasks: 0,
    attachments: 2,
  },
]

export function TaskList({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState(mockTasks)

  const handleTaskUpdate = (updatedTask: any) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t))
  }

  const grouped = {
    todo: tasks.filter(t => t.status === 'todo'),
    in_progress: tasks.filter(t => t.status === 'in_progress'),
    done: tasks.filter(t => t.status === 'done'),
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(grouped).map(([status, statusTasks]) => (
          <Card key={status} className="p-4 bg-muted/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold capitalize">{status === 'in_progress' ? 'In Progress' : status}</h3>
              <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">{statusTasks.length}</span>
            </div>
            <div className="space-y-2">
              {statusTasks.map(task => (
                <TaskCard key={task.id} task={task} onTaskUpdate={handleTaskUpdate} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
