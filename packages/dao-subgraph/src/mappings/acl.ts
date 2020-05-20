import {BigInt} from '@graphprotocol/graph-ts'

// Import entity types from the schema
import {
  Organization as OrganizationEntity,
  Permission as PermissionEntity,
  Role as RoleEntity,
  Param as ParamEntity,
} from '../types/schema'

// Import event types from the templates contract ABI
import {
  ACL as AclContract,
  SetPermission as SetPermissionEvent,
  SetPermissionParams as SetPermissionParamsEvent,
  ChangePermissionManager as ChangePermissionManagerEvent,
} from '../types/templates/Acl/ACL'

export function handleSetPermission(event: SetPermissionEvent): void {
  const acl = AclContract.bind(event.address)
  const orgAddress = acl.kernel()
  const orgId = orgAddress.toHex()
  const org = OrganizationEntity.load(orgId)

  const appAddress = event.params.app
  const roleHash = event.params.role
  const entityAddress = event.params.entity

  const allowed = event.params.allowed

  // Generate role id
  const roleId = appAddress
    .toHexString()
    .concat('-')
    .concat(roleHash.toHexString())

  // If no Role yet create new one
  let role = RoleEntity.load(roleId)
  if (role == null) {
    role = new RoleEntity(roleId) as RoleEntity
    role.nameHash = roleHash
    role.appAddress = appAddress
    role.grantees = []
  }

  /****** Update Permission ******/
  const permissionId = appAddress
    .toHexString()
    .concat('-')
    .concat(roleHash.toHexString())
    .concat('-')
    .concat(entityAddress.toHexString())

  if (allowed) {
    // if no Permission yet create new one
    let permission = PermissionEntity.load(permissionId)
    if (permission == null) {
      permission = new PermissionEntity(permissionId) as PermissionEntity
      permission.appAddress = appAddress
      permission.roleHash = roleHash
      permission.entityAddress = event.params.entity
    }

    // update org permissions
    const orgPermissions = org.permissions || []
    orgPermissions.push(permission.id)
    org.permissions = orgPermissions

    // update role grantees
    const roleGrantees = role.grantees
    roleGrantees.push(permission.id)
    role.grantees = roleGrantees

    permission.save()
  } else {
    // update role grantees
    const roleGrantees = role.grantees || []
    const index = roleGrantees.indexOf(permissionId)
    if (index > -1) {
      roleGrantees.splice(index, 1)
    }
  }
  role.save()
  org.save()
}

export function handleChangePermissionManager(
  event: ChangePermissionManagerEvent,
): void {
  const appAddress = event.params.app
  const roleHash = event.params.role

  // get role id and load from store
  const roleId = appAddress
    .toHexString()
    .concat('-')
    .concat(roleHash.toHexString())

  let role = RoleEntity.load(roleId)
  if (role == null) {
    role = new RoleEntity(roleId) as RoleEntity
    role.nameHash = roleHash
    role.appAddress = appAddress
    role.grantees = []
  }

  // Update values
  role.manager = event.params.manager

  role.save()
}

export function handleSetPermissionParams(
  event: SetPermissionParamsEvent,
): void {
  const acl = AclContract.bind(event.address)
  const orgAddress = acl.kernel()
  const orgId = orgAddress.toHex()
  const org = OrganizationEntity.load(orgId)

  const appAddress = event.params.app
  const roleHash = event.params.role
  const entityAddress = event.params.entity

  // get permission id and load from store
  const permissionId = appAddress
    .toHexString()
    .concat('-')
    .concat(roleHash.toHexString())
    .concat('-')
    .concat(entityAddress.toHexString())

  let permission = PermissionEntity.load(permissionId)
  if (permission == null) {
    permission = new PermissionEntity(permissionId) as PermissionEntity
  }

  // get params length
  const paramsLength = acl
    .getPermissionParamsLength(entityAddress, appAddress, roleHash)
    .toI32()

  const paramHash = event.params.paramsHash

  // iterate getting the params
  for (let index = 0; index < paramsLength; index++) {
    const paramData = acl.getPermissionParam(
      entityAddress,
      appAddress,
      roleHash,
      BigInt.fromI32(index),
    )

    // get param id and create new entity
    const paramId = paramHash
      .toHexString()
      .concat('-')
      .concat(index.toString())

    let param = ParamEntity.load(paramId)
    if (param == null) {
      param = new ParamEntity(paramId) as ParamEntity
      param.argumentId = paramData.value0
      param.operationType = paramData.value1
      param.argumentValue = paramData.value2
    }

    // update permission params
    const permissionParams = permission.params
    permissionParams.push(param.id)
    permission.params = permissionParams

    // save param to the store
    param.save()
  }

  permission.save()
  org.save()
}
