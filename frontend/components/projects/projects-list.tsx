'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CreateProjectDialog } from './create-project-dialog'
import { projectsApi, type Project } from '@/lib/api/projects'

interface ProjectWithRole extends Project {
  role?: string
  members?: number
  tasks?: number
  progress?: number
  status?: 'in_progress' | 'done'
}

export function ProjectsList() {
  const [projects, setProjects] = useState<ProjectWithRole[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await projectsApi.getProjects()
      // Backend returns array of { project: {...}, role: '...' } from aggregation
      const mappedProjects = data.map((item: any) => {
        const project = item.project || item
        return {
          ...project,
          _id: project._id,
          role: item.role || 'member',
          members: project.members || 0,
          tasks: 0, // TODO: Calculate from tasks
          progress: 0, // TODO: Calculate from tasks
          status: 'in_progress' as const,
        }
      })
      setProjects(mappedProjects)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
      console.error('Error loading projects:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async (data: { name: string; description: string }) => {
    try {
      const newProject = await projectsApi.createProject(data)
      // Reload projects to get the updated list with role
      await loadProjects()
      setIsDialogOpen(false)
    } catch (err) {
      console.error('Error creating project:', err)
      throw err
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 h-48 animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
            <div className="h-20 bg-muted rounded"></div>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-600">{error}</div>
        <Button onClick={loadProjects} className="mt-4">
          Retry
        </Button>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project._id} href={`/projects/${project._id}`}>
            <Card className="p-6 hover:shadow-lg hover:border-accent transition-all cursor-pointer h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{project.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{project.role}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  project.status === 'done' ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'
                }`}>
                  {project.status === 'done' ? 'Completed' : 'In Progress'}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 flex-1">{project.description}</p>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">Progress</span>
                    <span className="text-muted-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground pt-2 border-t border-border">
                  <span>{project.members} members</span>
                  <span>{project.tasks} tasks</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}

        <button
          onClick={() => setIsDialogOpen(true)}
          className="h-full"
        >
          <Card className="p-6 flex items-center justify-center border-2 border-dashed border-border hover:border-accent hover:bg-accent/5 transition-all cursor-pointer h-full">
            <div className="w-full flex flex-col gap-2 items-center justify-center">
              <span className="text-4xl font-light text-accent">+</span>
              <span className="font-medium text-foreground">Create New Project</span>
              <span className="text-xs text-muted-foreground">Click to start a new project</span>
            </div>
          </Card>
        </button>
      </div>

      <CreateProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateProject}
      />
    </>
  )
}
