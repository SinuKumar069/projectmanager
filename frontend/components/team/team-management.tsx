'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'admin' | 'project_admin' | 'member'
  status: 'active' | 'pending'
  joinedDate: string
  avatar: string
}

const mockMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active', joinedDate: '2024-10-01', avatar: '👨' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'project_admin', status: 'active', joinedDate: '2024-10-15', avatar: '👩' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', role: 'member', status: 'active', joinedDate: '2024-11-01', avatar: '👨' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', role: 'member', status: 'pending', joinedDate: '2024-12-10', avatar: '👩' },
]

export function TeamManagement() {
  const [members, setMembers] = useState(mockMembers)
  const [searchQuery, setSearchQuery] = useState('')
  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'member' | 'project_admin'>('member')

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault()
    // API call would go here
    const newMember: TeamMember = {
      id: String(members.length + 1),
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'pending',
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: '👤',
    }
    setMembers([...members, newMember])
    setInviteEmail('')
    setInviteRole('member')
    setIsInviteOpen(false)
  }

  const handleRoleChange = (memberId: string, newRole: any) => {
    setMembers(members.map(m => m.id === memberId ? { ...m, role: newRole } : m))
  }

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId))
  }

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getRoleColor = (role: string) => {
    const colors = {
      admin: 'bg-destructive/10 text-destructive',
      project_admin: 'bg-accent/10 text-accent',
      member: 'bg-primary/10 text-primary',
    }
    return colors[role as keyof typeof colors] || ''
  }

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: 'Admin',
      project_admin: 'Project Admin',
      member: 'Member',
    }
    return labels[role as keyof typeof labels] || ''
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-1">Manage team members and their permissions</p>
        </div>
        <Button
          onClick={() => setIsInviteOpen(true)}
          className="bg-accent hover:bg-accent/90"
        >
          + Invite Member
        </Button>
      </div>

      <Input
        placeholder="Search members..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-xs"
      />

      <div className="grid gap-4">
        {/* Active Members */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Active Members ({filteredMembers.filter(m => m.status === 'active').length})</h3>
          {filteredMembers.filter(m => m.status === 'active').map(member => (
            <MemberCard
              key={member.id}
              member={member}
              onRoleChange={handleRoleChange}
              onRemove={handleRemoveMember}
              getRoleColor={getRoleColor}
              getRoleLabel={getRoleLabel}
            />
          ))}
        </div>

        {/* Pending Invitations */}
        {filteredMembers.some(m => m.status === 'pending') && (
          <div className="space-y-3 pt-6 border-t border-border">
            <h3 className="font-semibold text-sm">Pending Invitations ({filteredMembers.filter(m => m.status === 'pending').length})</h3>
            {filteredMembers.filter(m => m.status === 'pending').map(member => (
              <MemberCard
                key={member.id}
                member={member}
                onRoleChange={handleRoleChange}
                onRemove={handleRemoveMember}
                getRoleColor={getRoleColor}
                getRoleLabel={getRoleLabel}
              />
            ))}
          </div>
        )}
      </div>

      {/* Invite Dialog */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-4">
              <h2 className="text-xl font-bold">Invite Team Member</h2>

              <form onSubmit={handleInviteMember} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="member@example.com"
                    className="mt-2"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full mt-2 px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <option value="member">Member</option>
                    <option value="project_admin">Project Admin</option>
                  </select>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <p className="font-medium text-foreground">Role Permissions:</p>
                  {inviteRole === 'member' ? (
                    <ul className="list-disc list-inside space-y-1">
                      <li>View projects and tasks</li>
                      <li>Update task status</li>
                      <li>View and add notes</li>
                    </ul>
                  ) : (
                    <ul className="list-disc list-inside space-y-1">
                      <li>All member permissions</li>
                      <li>Create and edit tasks</li>
                      <li>Manage team members</li>
                      <li>Edit project details</li>
                    </ul>
                  )}
                </div>

                <div className="flex gap-2 justify-end pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsInviteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-accent hover:bg-accent/90">
                    Send Invite
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

function MemberCard({
  member,
  onRoleChange,
  onRemove,
  getRoleColor,
  getRoleLabel,
}: {
  member: TeamMember
  onRoleChange: (id: string, role: any) => void
  onRemove: (id: string) => void
  getRoleColor: (role: string) => string
  getRoleLabel: (role: string) => string
}) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <Card className="p-4 flex items-center justify-between hover:shadow-sm transition-all group">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-lg">
          {member.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium">
            {member.name}
            {member.status === 'pending' && (
              <span className="text-xs text-muted-foreground ml-2">(Pending)</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground truncate">{member.email}</p>
          <p className="text-xs text-muted-foreground">
            Joined {new Date(member.joinedDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-4">
        <select
          value={member.role}
          onChange={(e) => onRoleChange(member.id, e.target.value)}
          disabled={member.status === 'pending'}
          className={`text-xs font-medium px-2 py-1 rounded ${getRoleColor(
            member.role
          )} border-0 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer`}
        >
          <option value="member">Member</option>
          <option value="project_admin">Project Admin</option>
          {/* Only show admin option in system-wide team management */}
        </select>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-muted rounded transition-colors opacity-0 group-hover:opacity-100"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-card border border-border rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  onRemove(member.id)
                  setShowMenu(false)
                }}
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted rounded-lg"
              >
                Remove Member
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
