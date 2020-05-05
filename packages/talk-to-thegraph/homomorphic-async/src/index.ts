import Client from './client'

async function main(): Promise<void> {
  const client = new Client()

  const org = await client.getOrganization('0xd0a36F6441678140bbA1fB8Cba3d75cB87dbe60b')

  console.log('Address:', org.address)

  const apps = await org.apps
  for(let app of apps) {
    const repo = await app.repo
    console.log(`App:`, repo?.name)
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })