/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { Organization } from 'plumbery-core'
import Group from './Group'
import Table from './Table'
import TextButton from './TextButton'

type OrgInfoProps = {
  org?: Organization
  orgAddress: string
}

export default function OrgApps({ org, orgAddress }: OrgInfoProps) {
  if (!org) {
    return null
  }

  return (
    <Group name="Organization">
      <Table
        headers={['Name', 'Value']}
        rows={Object.entries({ ...org, address: orgAddress }).map(
          ([name, value]) => {
            if (value.startsWith('0x')) {
              value = value.slice(0, 6)
            }
            return [name, value]
          }
        )}
      />
    </Group>
  )
}
