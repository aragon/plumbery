import fetch from 'node-fetch'
import fs from 'fs'

const GRAPH_URL = 'https://api.thegraph.com/subgraphs/name/0xgabi/dao-subgraph'
const ORG_ADDRESS = '0x022fd42a494e0f9e00960d1becc5a1bbed4b528a'

async function main(): Promise<void> {
  trace( 'App names:', await orgAppNames(ORG_ADDRESS) )
  trace( 'App addresses:', await orgAppAddresses(ORG_ADDRESS) )
  trace( 'Org permissions:', await orgPermissions(ORG_ADDRESS) )
  // trace( 'Full org data:',  await orgFull(ORG_ADDRESS)         )
}

function trace(title: string, data: any): void {
  console.log(`\n${title}:`)
  console.log(JSON.stringify(data, null, 2))
}

async function orgPermissions(orgAddress: string): Promise<void> {
  // Build query.
  const query = applyOrganizationOnQuery(
    orgAddress,
    'org_permissions.graphql'
  )

  // Post-process query.
  const data = (await graphQuery(query)).data
  const org = data.organizations[0]
  return org.acl.permissions.map(permission => {
    return {
      who: permission.entity,
      where: permission.app ? permission.app.address : 'unknown',
      what: permission.role.name,
      manager: permission.role.manager
    }
  })
}

async function orgAppAddresses(orgAddress: string): Promise<void> {
  // Build query.
  const query = applyOrganizationOnQuery(
    orgAddress,
    'org_app_addresses.graphql'
  )

  // Post-process query.
  const data = (await graphQuery(query)).data
  const org = data.organizations[0]
  const apps = org.apps
  return apps.map(app => app.address)
}

async function orgAppNames(orgAddress: string): Promise<void> {
  // Build query.
  const query = applyOrganizationOnQuery(
    orgAddress,
    'org_app_names.graphql'
  )

  // Post-process query.
  const data = (await graphQuery(query)).data
  const org = data.organizations[0]
  const apps = org.apps.filter(app => app.repo != null)
  return apps.map(app => app.repo.name)
}

async function orgFull(orgAddress: string): Promise<void> {
  // Build query.
  const query = applyOrganizationOnQuery(
    orgAddress,
    'org_full.graphql'
  )

  // Post-process query.
  const data = (await graphQuery(query)).data
  return data.organizations[0]
}

function applyOrganizationOnQuery(orgAddress: string, queryTemplateFileName: string): string {
  const template = fs.readFileSync(`./queries/${queryTemplateFileName}`, 'utf8')

  return applyVariableInQuery(
    template,
    'orgAddress',
    orgAddress
  )
}

function applyVariableInQuery(template: string, variableName: string, variableValue: string): string {
  // Regex that matches
  // (1) text within quotes: (?<=")[^"]+(?=")
  // (2) that is followed by (?=<this>)
  // (3) where <this> is for example $orgAddress.
  const regex = new RegExp('(?<=")[^"]+(?=")(?=.+\\$' + variableName + ')', 'gm')

  return template.replace(regex, variableValue)
}

async function graphQuery(query: string): Promise<any> {
  const response = await fetch(
    GRAPH_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    }
  )

  return response.json()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })