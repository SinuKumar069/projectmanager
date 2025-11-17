'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function SettingsPanel() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Project Manager and Team Lead',
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleProfileUpdate = async () => {
    setIsSaving(true)
    setTimeout(() => setIsSaving(false), 500)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full max-w-xs grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-3xl">
                  👤
                </div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>

              <div>
                <label className="text-sm font-medium">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-muted border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleProfileUpdate}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Password</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input type="password" className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" className="mt-2" />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input type="password" className="mt-2" />
              </div>

              <Button className="bg-primary hover:bg-primary/90">Update Password</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Two-Factor Authentication</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Add an extra layer of security to your account
            </p>
            <Button variant="outline">Enable 2FA</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Active Sessions</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium text-sm">Chrome on macOS</p>
                  <p className="text-xs text-muted-foreground">Last active: 5 minutes ago</p>
                </div>
                <Button size="sm" variant="ghost">Sign Out</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Email Notifications</h3>
            <div className="space-y-3">
              {[
                { label: 'Task Assigned', description: 'When a task is assigned to you' },
                { label: 'Project Updates', description: 'When a project you\'re in is updated' },
                { label: 'Team Mentions', description: 'When you\'re mentioned in notes or comments' },
                { label: 'Weekly Digest', description: 'Weekly summary of your projects' },
              ].map((notif) => (
                <label key={notif.label} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50">
                  <input type="checkbox" defaultChecked className="rounded accent-accent" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{notif.label}</p>
                    <p className="text-xs text-muted-foreground">{notif.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
