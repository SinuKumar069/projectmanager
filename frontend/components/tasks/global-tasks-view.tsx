'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const mockTasks = [
  {
    id: '1',
    title: 'Design homepage wireframes',
    project: 'Website Redesign',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-12-20',
    assignee: 'John Doe',
  },
  {
    id: '2',
    title: 'Setup development environment',
    project: 'Mobile App MVP',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-12-15',
    assignee: 'Jane Smith',
  },
  {
    id: '3',
    title: 'Create user authentication flow',
    project: 'Website Redesign',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-12-25',
    assignee: 'Mike Johnson',
  },
]

export function GlobalTasksView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.project.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: 'bg-destructive/20 text-destructive',
      medium: 'bg-accent/20 text-accent',
      low: 'bg-muted text-muted-foreground',
    }
    return colors[priority as keyof typeof colors] || ''
  }

  const getStatusColor = (status: string) => {
    const colors = {
      todo: 'bg-muted/40',
      in_progress: 'bg-accent/10',
      done: 'bg-success/10',
    }
    return colors[status as keyof typeof colors] || ''
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Tasks</h1>
        <p className="text-muted-foreground mt-1">View and manage tasks across all projects</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          {['all', 'todo', 'in_progress', 'done'].map(status => (
            <Button
              key={status}
              size="sm"
              variant={filterStatus === status ? 'default' : 'outline'}
              onClick={() => setFilterStatus(status)}
              className={filterStatus === status ? 'bg-primary' : ''}
            >
              {status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filteredTasks.map(task => (
          <Card key={task.id} className={`p-4 hover:shadow-md transition-all cursor-pointer ${getStatusColor(task.status)}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <span>{task.project}</span>
                  <span>Assigned to {task.assignee}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className={`text-xs font-medium px-2 py-1 rounded ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
