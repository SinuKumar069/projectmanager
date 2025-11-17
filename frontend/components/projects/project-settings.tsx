'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProjectSettingsProps {
  projectId: string
}

export function ProjectSettings({ projectId }: ProjectSettingsProps) {
  const [projectName, setProjectName] = useState('Website Redesign')
  const [description, setDescription] = useState('Complete redesign of company website with modern UI')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // API call would go here
    setTimeout(() => setIsLoading(false), 500)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <Input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-2 px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              rows={4}
            />
          </div>

          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="bg-accent hover:bg-accent/90"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Card>

      <Card className="p-6 border-destructive/50">
        <h3 className="font-semibold mb-4 text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Deleting a project is permanent and cannot be undone.
        </p>
        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
          Delete Project
        </Button>
      </Card>
    </div>
  )
}
