import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IAuth } from '../auth.types';

export const AuthGraphQLTypes = new GraphQLObjectType<IAuth, any>({
  name: 'Auth',
  description: '',
  fields: {
    _id: globalIdField(),
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});

export const AuthListGraphQLTypes = new GraphQLObjectType<[IAuth], any>({
  name: 'AuthList',
  description: '',
  fields: {
    auths: { type: new GraphQLList(AuthGraphQLTypes) },
    total: { type: new GraphQLNonNull(GraphQLInt) }
  }
});
