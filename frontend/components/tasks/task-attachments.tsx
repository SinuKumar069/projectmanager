'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TaskAttachmentsProps {
  taskId: string
  attachments?: Array<{ id: string; name: string; size: string; uploadedBy: string; uploadedAt: string }>
}

export function TaskAttachments({ taskId, attachments = [] }: TaskAttachmentsProps) {
  const [files, setFiles] = useState(attachments)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (uploadedFiles) {
      setIsUploading(true)
      // Simulate upload
      setTimeout(() => {
        const newFiles = Array.from(uploadedFiles).map((file, idx) => ({
          id: String(files.length + idx),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          uploadedBy: 'You',
          uploadedAt: new Date().toLocaleDateString(),
        }))
        setFiles([...files, ...newFiles])
        setIsUploading(false)
      }, 500)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Attachments</h4>
        <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button
              variant="outline"
              disabled={isUploading}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {isUploading ? 'Uploading...' : '📤 Choose Files'}
            </Button>
          </label>
          <p className="text-xs text-muted-foreground mt-2">or drag and drop</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map(file => (
            <Card key={file.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-lg">📄</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <span className="text-xs text-muted-foreground">{file.uploadedAt}</span>
                <button className="p-1 hover:bg-muted rounded transition-colors">⋮</button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
