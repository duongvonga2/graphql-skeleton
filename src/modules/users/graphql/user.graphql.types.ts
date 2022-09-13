import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { globalIdField } from 'graphql-relay';
import { IUser } from '../users.types';

export const UserGraphQLTypes = new GraphQLObjectType<IUser, any>({
  name: 'User',
  description: '',
  fields: {
    _id: globalIdField(),
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLFloat) }
  }
});

export const UserListGraphQLTypes = new GraphQLObjectType<[IUser], any>({
  name: 'UserList',
  description: '',
  fields: {
    users: { type: new GraphQLList(UserGraphQLTypes) },
    total: { type: new GraphQLNonNull(GraphQLInt) }
  }
});
