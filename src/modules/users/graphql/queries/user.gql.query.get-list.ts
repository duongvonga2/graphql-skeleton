import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { userService } from '../../users.service';
import { UserListGraphQLTypes } from '../user.graphql.types';

export const getUserListQuery: GraphQLFieldConfig<any, any> = {
  description: 'user graphql query',
  type: UserListGraphQLTypes,
  args: {
    pageSize: { type: GraphQLInt },
    page: { type: GraphQLInt },
    order: { type: new GraphQLList(new GraphQLList(GraphQLString)) },
    status: { type: GraphQLString }
  },

  resolve: async (source, args, context) => {
    try {
      const { pageSize = 50, page = 1, order = [['createdAt'],['DESC']], ...query } = args;
      const limit = pageSize;
      const offset = pageSize * (page - 1);
      const userList = await userService.find(
        {
          limit,
          offset,
          order,
          where: query
        },
        {
          scope: ['withoutPwd']
        }
      );
      const total = await userService.getTotal({ where: query });
      return {
        users: userList,
        total
      };
    } catch (err: any) {
      throw handleGraphqlError(err);
    }
  }
};
