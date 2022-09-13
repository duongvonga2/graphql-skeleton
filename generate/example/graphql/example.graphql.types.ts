`import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { I{{upperModuleName}} } from '../{{moduleName}}.types';

export const {{upperModuleName}}GraphQLTypes = new GraphQLObjectType<I{{upperModuleName}}, any>({
  name: '{{upperModuleName}}',
  description: '',
  fields: {
    _id: globalIdField(),
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});

export const {{upperModuleName}}ListGraphQLTypes = new GraphQLObjectType<[I{{upperModuleName}}], any>({
  name: '{{upperModuleName}}List',
  description: '',
  fields: {
    {{moduleName}}s: { type: new GraphQLList({{upperModuleName}}GraphQLTypes) },
    total: { type: new GraphQLNonNull(GraphQLInt) }
  }
});
`