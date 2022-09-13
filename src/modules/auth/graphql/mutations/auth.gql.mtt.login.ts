import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { ResponseErrorDto } from '../../../../commons/dtos';
import { validate } from '../../../../commons/utils';
import { authService } from '../../auth.service';
import { ILogin } from '../../auth.types';
import { loginSchema } from '../../validator-schema';

export const loginMutation: GraphQLFieldConfig<any, any> = {
  description: 'login',
  type: new GraphQLObjectType({
    name: 'login',
    fields: {
      accessToken: { type: new GraphQLNonNull(GraphQLString) }
    }
  }),
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) }
  },

  resolve: async (source, args, context) => {
    try {
      const { username, password }: ILogin = args;
      const { errors, message } = validate(args, loginSchema);
      if (errors) {
        throw new ResponseErrorDto({ error: errors, message, name: 'VALIDATE_ERROR' });
      }
      const accessToken = authService.login(username, password);
      return { accessToken };
    } catch (err: any) {
      throw handleGraphqlError(err);
    }
  }
};
