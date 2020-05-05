"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.QUERY_PERMISSIONS = graphql_tag_1.default `
  query Organization($orgAddress: ID!) {
    organization(id: $orgAddress) {
      acl {
        permissions {
          app {
            address
          }
          entity
          role {
            name
          }
        }
      }
    }
  }
`;
//# sourceMappingURL=queries.js.map