import * as queries from './queries'
import * as parsers from './parsers';
import { Module } from '../../types';

const coreModule: Module = {
  selectors: {
    roleById: {
      query: queries.ROLE_BY_ID,
      parser: parsers.parseRole
    },

    permissionsForOrg: {
      query: queries.ORGANIZATION_PERMISSIONS,
      parser: parsers.parsePermissions
    },

    appsForOrg: {
      query: queries.ORGANIZATION_APPS,
      parser: parsers.parseApps
    },

    appByAddress: {
      query: queries.APP_BY_ADDRESS,
      parser: parsers.parseApp
    },

    repoForApp: {
      query: queries.REPO_BY_APP_ADDRESS,
      parser: parsers.parseRepo
    }
  }
}

export default coreModule