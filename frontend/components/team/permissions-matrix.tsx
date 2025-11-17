'use client'

import { Card } from '@/components/ui/card'

export function PermissionsMatrix() {
  const permissions = [
    {
      feature: 'Create/Update/Delete Project',
      admin: true,
      project_admin: false,
      member: false,
    },
    {
      feature: 'Manage Project Members',
      admin: true,
      project_admin: true,
      member: false,
    },
    {
      feature: 'Create/Update/Delete Tasks',
      admin: true,
      project_admin: true,
      member: false,
    },
    {
      feature: 'View Tasks',
      admin: true,
      project_admin: true,
      member: true,
    },
    {
      feature: 'Update Task Status',
      admin: true,
      project_admin: true,
      member: true,
    },
    {
      feature: 'Create/Update/Delete Subtasks',
      admin: true,
      project_admin: true,
      member: false,
    },
    {
      feature: 'Create/Update/Delete Notes',
      admin: true,
      project_admin: true,
      member: false,
    },
    {
      feature: 'View Notes',
      admin: true,
      project_admin: true,
      member: true,
    },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Role-Based Access Control</h3>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Feature</th>
                <th className="px-4 py-3 text-center font-medium">Admin</th>
                <th className="px-4 py-3 text-center font-medium">Project Admin</th>
                <th className="px-4 py-3 text-center font-medium">Member</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map((perm, idx) => (
                <tr key={idx} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{perm.feature}</td>
                  <td className="px-4 py-3 text-center">
                    {perm.admin ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success">
                        ✓
                      </span>
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {perm.project_admin ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success">
                        ✓
                      </span>
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {perm.member ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-success/20 text-success">
                        ✓
                      </span>
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
