/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { Organization, Permission } from 'plumbery-core'
import Group from './Group'
import Table from './Table'

export default function OrgPermissions({ org }: { org?: Organization }) {
  const [permissions, setOrgPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let cancelled = false

    const update = async () => {
      if (!org) {
        return
      }

      setLoading(true)
      const permissions = await org.permissions()

      console.log('!', permissions)

      if (!cancelled) {
        setLoading(false)
        setOrgPermissions(permissions)
      }
    }

    update()

    return () => {
      cancelled = true
    }
  }, [org])

  console.log('?', permissions)

  return (
    <Group name="Permissions" loading={loading}>
      <Table
        headers={['App', 'Role', 'Entity']}
        rows={permissions.map(permission => [
          (permission.app || '?').slice(0, 6),
          permission.role.slice(0, 6),
          permission.entity.slice(0, 6),
        ])}
      />
    </Group>
  )
}
