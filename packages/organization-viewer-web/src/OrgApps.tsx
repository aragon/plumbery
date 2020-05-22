/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { App, Organization } from 'plumbery-core'
import Group from './Group'
import Table from './Table'
import TextButton from './TextButton'

type OrgAppsProps = {
  org?: Organization
  onOpenApp: (address: string) => void
}

export default function OrgApps({ onOpenApp, org }: OrgAppsProps) {
  const [apps, setOrgApps] = useState<App[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let cancelled = false

    const update = async () => {
      if (!org) {
        return
      }

      setLoading(true)
      const apps = await org.apps()

      if (!cancelled) {
        setLoading(false)
        setOrgApps(apps)
      }
    }

    update()

    return () => {
      cancelled = true
    }
  }, [org])

  return (
    <Group name="Apps" loading={loading}>
      <Table
        headers={['Name', 'Version', 'Address']}
        rows={[...apps]
          .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
          .map((app: App) => [
            app.name || 'unknown',
            app.version || '?',
            <TextButton onClick={() => onOpenApp(app.address)}>
              {app.address.slice(0, 6)}
            </TextButton>,
          ])}
      />
    </Group>
  )
}
