/** @jsx jsx */
import { useEffect, useState } from 'react'
import { css, jsx } from '@emotion/core'
import { connect } from 'plumbery-core'
import Main from './Main'
import OrgApps from './OrgApps'
import OrgInfo from './OrgInfo'
import OrgPermissions from './OrgPermissions'
import TextButton from './TextButton'
import { useCancellableAsync } from './generic-hooks'

const ORG_ADDRESSES_MAINNET_STAGING = new Map([
  ['piedao', '0x0c188b183ff758500d1d18b432313d10e9f6b8a4'],
])

const ORG_ADDRESSES_MAINNET = new Map([
  ['a1', '0x635193983512c621E6a3E15ee1dbF36f0C0Db8E0'],
])

const ORG_ADDRESSES_RINKEBY = new Map([
  ['org1', '0x0146414e5a819240963450332f647dfb7c722af4'],
  ['org2', '0x00018d22ece8b2ea4e9317b93f7dff67385693d8'],
  ['td.aragonid.eth', '0xa9Aad8e278eECf369c42F78D5A3f2d866DE902C8'],
  ['hive.aragonid.eth', '0xe520428C232F6Da6f694b121181f907931fD2211'],
  ['mesh.aragonid.eth', '0xa48300a4E89b59A79452Db7d3CD408Df57f4aa78'],
])

const ORG_ADDRESSES = ORG_ADDRESSES_MAINNET_STAGING

function addressFromOrgName(orgName: string) {
  return (
    ORG_ADDRESSES.get(orgName) ||
    ORG_ADDRESSES.get(`${orgName}.aragonid.eth`) ||
    orgName
  )
}

function useRouting() {
  const [orgName, setOrgName] = useState('')

  const openOrg = (orgName: string) => {
    window.location.hash = `/${orgName}`
  }

  const openApp = (appAddress: string) => {
    window.location.hash = `/${orgName}/${appAddress}`
  }

  useEffect(() => {
    const onChange = () => {
      const org = window.location.hash.match(/^#\/([^\/]+)/)?.[1]
      setOrgName(org || '')
    }

    onChange()
    window.addEventListener('hashchange', onChange)

    return () => {
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  return { orgName, openOrg, openApp }
}

export default function App() {
  const { openOrg, openApp, orgName } = useRouting()

  useEffect(() => {
    openOrg([...ORG_ADDRESSES.keys()][0])
  }, [])

  const [org] = useCancellableAsync(
    async () => connect(addressFromOrgName(orgName.trim()), 'thegraph'),
    [orgName]
  )

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
          onChange={event => openOrg(event.target.value)}
          placeholder="e.g. xyz.aragonid.eth"
          type="text"
          value={orgName}
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
        {[...ORG_ADDRESSES.keys()].map((name, index) => (
          <span key={name}>
            {index > 0 && <span>, </span>}
            <TextButton onClick={() => openOrg(name)}>
              {name.match(/^[^\.]+/)?.[0]}
            </TextButton>
          </span>
        ))}
        .
      </div>
      <OrgInfo org={org} orgAddress={addressFromOrgName(orgName)} />
      <OrgApps org={org} onOpenApp={openApp} />
      <OrgPermissions org={org} />
    </Main>
  )
}
