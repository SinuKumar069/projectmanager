'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Subtask {
  id: string
  title: string
  completed: boolean
  assignee?: string
  dueDate?: string
}

interface SubtasksManagerProps {
  taskId: string
  subtasks?: Subtask[]
  onUpdate?: (subtasks: Subtask[]) => void
}

export function SubtasksManager({ taskId, subtasks = [], onUpdate }: SubtasksManagerProps) {
  const [tasks, setTasks] = useState<Subtask[]>(subtasks)
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      const newSubtask: Subtask = {
        id: String(tasks.length + 1),
        title: newSubtaskTitle,
        completed: false,
      }
      const updated = [...tasks, newSubtask]
      setTasks(updated)
      setNewSubtaskTitle('')
      setIsAdding(false)
      onUpdate?.(updated)
    }
  }

  const handleToggleSubtask = (id: string) => {
    const updated = tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    setTasks(updated)
    onUpdate?.(updated)
  }

  const handleDeleteSubtask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id)
    setTasks(updated)
    onUpdate?.(updated)
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">
          Subtasks ({completedCount}/{tasks.length})
        </h4>
        {tasks.length > 0 && (
          <div className="w-24 bg-muted rounded-full h-2">
            <div
              className="bg-success h-2 rounded-full transition-all"
              style={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        {tasks.map(subtask => (
          <Card key={subtask.id} className="p-3 flex items-center gap-3 group hover:shadow-sm transition-all">
            <input
              type="checkbox"
              checked={subtask.completed}
              onChange={() => handleToggleSubtask(subtask.id)}
              className="rounded w-4 h-4 accent-accent"
            />
            <span className={`flex-1 text-sm ${subtask.completed ? 'line-through text-muted-foreground' : ''}`}>
              {subtask.title}
            </span>
            <button
              onClick={() => handleDeleteSubtask(subtask.id)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded transition-all"
            >
              ×
            </button>
          </Card>
        ))}
      </div>

      {isAdding ? (
        <Card className="p-3 space-y-2">
          <Input
            autoFocus
            placeholder="Add a subtask..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddSubtask()
              if (e.key === 'Escape') setIsAdding(false)
            }}
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleAddSubtask}
              className="bg-accent hover:bg-accent/90"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsAdding(true)}
          className="w-full"
        >
          + Add Subtask
        </Button>
      )}
    </div>
  )
}
