'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { NoteEditor } from './note-editor'

interface Note {
  id: string
  title: string
  content: string
  author: string
  date: string
  attachments: number
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Design System Guidelines',
    content: 'Established color palette and typography standards for the project. All future components should follow these guidelines.',
    author: 'John Doe',
    date: '2024-12-10',
    attachments: 0,
  },
  {
    id: '2',
    title: 'Meeting Notes - Sprint Planning',
    content: 'Discussed Q1 roadmap and resource allocation. Prioritized mobile app MVP development.',
    author: 'Jane Smith',
    date: '2024-12-08',
    attachments: 1,
  },
]

export function NotesList({ projectId }: { projectId: string }) {
  const [notes, setNotes] = useState(mockNotes)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleCreateNote = (data: any) => {
    const newNote: Note = {
      id: String(notes.length + 1),
      ...data,
      author: 'You',
      date: new Date().toISOString().split('T')[0],
      attachments: 0,
    }
    setNotes([newNote, ...notes])
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Project Notes</h3>
        <Button
          onClick={() => setIsEditorOpen(true)}
          className="bg-accent hover:bg-accent/90"
        >
          + New Note
        </Button>
      </div>

      <input
        type="search"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
      />

      <div className="space-y-2">
        {filteredNotes.map(note => (
          <Card
            key={note.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium group-hover:text-accent transition-colors">{note.title}</h4>
              <span className="text-xs text-muted-foreground">{new Date(note.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{note.content}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>By {note.author}</span>
              {note.attachments > 0 && <span>📎 {note.attachments} file{note.attachments !== 1 ? 's' : ''}</span>}
            </div>
          </Card>
        ))}
      </div>

      <NoteEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onCreate={handleCreateNote}
      />
    </div>
  )
}
