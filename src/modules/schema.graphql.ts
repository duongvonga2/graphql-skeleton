import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { authGQLMutationFields, authGQLQueryFields } from './auth';
import { userGQLMutationFields, userGQLQueryFields } from './users';

export const graphqlSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Root',
    description: 'top level query',
    fields: {
      ...userGQLQueryFields,
      ...authGQLQueryFields
    }
  }),
  mutation: new GraphQLObjectType({
    name:'Mutation',
    fields: {
      ...userGQLMutationFields,
      ...authGQLMutationFields
    }
  })
});
