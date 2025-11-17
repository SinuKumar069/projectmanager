'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TaskList } from '@/components/tasks/task-list'
import { TeamPanel } from '@/components/team/team-panel'
import { NotesList } from '@/components/notes/notes-list'
import { ProjectSettings } from './project-settings'

export function ProjectDetail({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Website Redesign</h1>
          <p className="text-muted-foreground mt-1">Complete redesign of company website with modern UI</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Share</Button>
          <Button className="bg-accent hover:bg-accent/90">+ Add Task</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-4">
          <TaskList projectId={projectId} />
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <TeamPanel projectId={projectId} />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <NotesList projectId={projectId} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <ProjectSettings projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
