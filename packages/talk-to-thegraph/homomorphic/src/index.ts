import Client from './client'

async function main(): Promise<void> {
  const client = new Client()

  const org = await client.getOrganization('0xd0a36F6441678140bbA1fB8Cba3d75cB87dbe60b')

  console.log('Address:', org.address)

  org.apps?.map(app => {
    console.log(`App:`, app.repo?.name)
  })

  // org.acl?.permissions.map(permission => {
  //   console.log(permission.id)
  // })
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log(error)
    process.exit(1)
  })