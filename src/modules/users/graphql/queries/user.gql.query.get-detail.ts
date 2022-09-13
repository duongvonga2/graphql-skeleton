import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { authenticateUserMiddleware } from '../../../../commons/middlewares';
import { userService } from '../../users.service';
import { UserGraphQLTypes } from '../user.graphql.types';

export const getUserDetailQuery: GraphQLFieldConfig<any, any> = {
  description: 'user graphql query',
  type: UserGraphQLTypes,
  args: {
    username: { type: GraphQLString },
    status: { type: GraphQLString }
  },

  resolve: async (source, args, context) => {
    try {
      await authenticateUserMiddleware(context);
      const user = await userService.findOne({ where: args }, { scope: ['withoutPwd'] });
      return user;
    } catch (error: any) {
      throw handleGraphqlError(error);
    }
  }
};
