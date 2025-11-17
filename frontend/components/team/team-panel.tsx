'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const mockMembers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', avatar: '👨' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Project Admin', avatar: '👩' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'Member', avatar: '👨' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Member', avatar: '👩' },
]

export function TeamPanel({ projectId }: { projectId: string }) {
  const [members] = useState(mockMembers)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Project Members ({members.length})</h3>
        <Button size="sm" className="bg-accent hover:bg-accent/90">+ Add Member</Button>
      </div>

      <div className="space-y-2">
        {members.map(member => (
          <Card key={member.id} className="p-4 flex items-center justify-between hover:shadow-sm transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-lg">
                {member.avatar}
              </div>
              <div>
                <p className="font-medium text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2 py-1 rounded bg-primary/10 text-primary">
                {member.role}
              </span>
              <button className="p-2 hover:bg-muted rounded transition-colors">
                ⋮
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
