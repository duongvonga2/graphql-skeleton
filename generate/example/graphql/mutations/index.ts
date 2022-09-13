`export * from './{{moduleName}}.gql.mtt.create';

import { create{{upperModuleName}}Mutation } from './{{moduleName}}.gql.mtt.create';

export const {{moduleName}}GQLMutationFields = {
  create{{upperModuleName}}: create{{upperModuleName}}Mutation
};
`