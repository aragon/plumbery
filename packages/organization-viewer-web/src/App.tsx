/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import {
  connect,
  App as AppType,
  Organization,
  Permission,
} from 'plumbery-core'
import Main from './Main'
import OrgApps from './OrgApps'
import OrgInfo from './OrgInfo'
import OrgPermissions from './OrgPermissions'
import TextButton from './TextButton'

const ORG_ADDRESSES = new Map([
  ['xyz', '0x0146414e5a819240963450332f647dfb7c722af4'],
  ['td.aragonid.eth', '0xa9Aad8e278eECf369c42F78D5A3f2d866DE902C8'],
  ['hive.aragonid.eth', '0xe520428C232F6Da6f694b121181f907931fD2211'],
  ['mesh.aragonid.eth', '0xa48300a4E89b59A79452Db7d3CD408Df57f4aa78'],
])

function addressFromOrgName(orgName: string) {
  return (
    ORG_ADDRESSES.get(orgName) ||
    ORG_ADDRESSES.get(`${orgName}.aragonid.eth`) ||
    orgName
  )
}

export default function App() {
  const [orgNameValue, setOrgNameValue] = useState('')
  const [org, setOrg] = useState<Organization>()
  const [path, setPath] = useState('')

  const updateOrg = (orgName: string) => {
    window.location.hash = `/${orgName}`
  }

  const openApp = (appAddress: string) => {
    window.location.hash = `/${orgNameValue}/${appAddress}`
  }

  useEffect(() => {
    const onChange = () => {
      const org = window.location.hash.match(/^#\/([^\/]+)/)?.[1]
      setOrgNameValue(org || '')
    }

    onChange()
    window.addEventListener('hashchange', onChange)
    updateOrg('xyz')

    return () => {
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const fetchOrg = async (orgName: string) => {
      const org = await connect(addressFromOrgName(orgName))
      if (!cancelled) {
        setOrg(org)
      }
    }

    fetchOrg(orgNameValue.trim())

    return () => {
      cancelled = true
    }
  }, [orgNameValue])

  return (
    <Main>
      <label>
        <div
          css={css`
            padding-left: 4px;
            padding-bottom: 8px;
            font-size: 20px;
          `}
        >
          Enter an org location:
        </div>
        <input
          onChange={event => updateOrg(event.target.value)}
          placeholder="e.g. xyz.aragonid.eth"
          type="text"
          value={orgNameValue}
          css={css`
            width: 100%;
            padding: 12px;
            border: 2px solid #fad4fa;
            border-radius: 6px;
            font-size: 24px;
            outline: 0;
          `}
        />
      </label>
      <div
        css={css`
          white-space: nowrap;
          padding-top: 8px;
          padding-left: 4px;
          font-size: 20px;
        `}
      >
        Or pick one:&nbsp;
        {[...ORG_ADDRESSES.keys()].map((name, index, items) => (
          <span key={name}>
            {index > 0 && <span>, </span>}
            <TextButton onClick={() => updateOrg(name)}>
              {name.match(/^[^\.]+/)?.[0]}
            </TextButton>
          </span>
        ))}
        .
      </div>
      <OrgInfo org={org} orgAddress={addressFromOrgName(orgNameValue)} />
      <OrgApps org={org} onOpenApp={openApp} />
      <OrgPermissions org={org} />
    </Main>
  )
}
