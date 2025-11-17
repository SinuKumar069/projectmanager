'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { CreateProjectDialog } from './create-project-dialog'
import Link from 'next/link'

const mockProjects = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of company website with modern UI',
    role: 'Admin',
    members: 5,
    tasks: 12,
    progress: 65,
    status: 'in_progress',
    createdDate: '2024-11-01',
  },
  {
    id: '2',
    name: 'Mobile App MVP',
    description: 'Mobile application MVP development',
    role: 'Project Admin',
    members: 8,
    tasks: 24,
    progress: 40,
    status: 'in_progress',
    createdDate: '2024-10-15',
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Third-party API integration project',
    role: 'Member',
    members: 3,
    tasks: 5,
    progress: 100,
    status: 'done',
    createdDate: '2024-09-01',
  },
]

export function ProjectsManagement() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projects, setProjects] = useState(mockProjects)

  const handleCreateProject = (data: any) => {
    const newProject = {
      id: String(projects.length + 1),
      ...data,
      role: 'Admin',
      members: 1,
      tasks: 0,
      progress: 0,
      status: 'in_progress',
      createdDate: new Date().toISOString().split('T')[0],
    }
    setProjects([newProject, ...projects])
  }

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and collaborate on all your projects</p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-accent hover:bg-accent/90 gap-2"
        >
          <span>+</span> New Project
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>

      <div className="grid gap-4">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="p-4 hover:shadow-lg hover:border-accent transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === 'done' ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'
                    }`}>
                      {project.status === 'done' ? 'Completed' : 'In Progress'}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {project.role}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>👥 {project.members} members</span>
                    <span>✓ {project.tasks} tasks</span>
                    <span>📅 {new Date(project.createdDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="ml-4 flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.progress}% Complete</p>
                    <div className="w-32 bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <CreateProjectDialog 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  )
}
