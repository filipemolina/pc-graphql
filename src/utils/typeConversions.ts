import {
  ApiDocument,
  ApiOrganization,
  Document,
  Organization,
} from '@src/types';

// const convertApiOrganization = (apiOrg: ApiOrganization): Organization => ({
//   ...apiOrg,
//   __typename: 'Organization',
// });

const convertApiDocument = (apiDoc: ApiDocument): Document => ({
  ...apiDoc,
  __typename: 'Document',
});

export { convertApiDocument };
