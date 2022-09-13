`import { get{{upperModuleName}}DetailQuery } from './{{moduleName}}.gql.query.get-detail';
import { get{{upperModuleName}}ListQuery } from './{{moduleName}}.gql.query.get-list';

export * from './{{moduleName}}.gql.query.get-detail';

export const {{moduleName}}GQLQueryFields = {
  {{moduleName}}: get{{upperModuleName}}DetailQuery,
  {{moduleName}}s: get{{upperModuleName}}ListQuery
};
`