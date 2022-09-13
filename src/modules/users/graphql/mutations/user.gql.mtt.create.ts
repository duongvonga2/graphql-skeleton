import {
    GraphQLFieldConfig,
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLString
  } from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { ResponseErrorDto } from '../../../../commons/dtos';
import { validate } from '../../../../commons/utils';
import { userService } from '../../users.service';
import { IUser } from '../../users.types';
import { createUserSchema } from '../../validator-schema';
import { UserGraphQLTypes } from '../user.graphql.types';
  
  export const createUserMutation: GraphQLFieldConfig<any, any> = {
    description: 'user graphql query',
    type: new GraphQLObjectType({
      name: 'createUserPayload',
      fields: {
        user: { type: UserGraphQLTypes }
      }
    }),
    // type: userConnection,
    //   args: connectionArgs,
    args: {
      input: {
        type: new GraphQLInputObjectType({
          name: 'createUserInputPayload',
          fields: {
            username: { type: GraphQLString },
            password: { type: GraphQLString },
            name: { type: GraphQLString },
            status: { type: GraphQLString }
          }
        })
      }
    },
  
    resolve: async (source, args, context) => {
      try {
        const userCreatedDocs: IUser = args.input;
        const { errors, message, value } = validate(userCreatedDocs, createUserSchema);
        if (errors) {
          throw new ResponseErrorDto({ error: errors, message, name: 'VALIDATE_ERROR' });
        }
        const user = await userService.createNew(value);
        return { user };
      } catch (err: any) {
        throw handleGraphqlError(err);
      }
    }
  };
  