`import { GraphQLFieldConfig, GraphQLString } from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { authenticateUserMiddleware } from '../../../../commons/middlewares';
import { {{moduleName}}Service } from '../../{{moduleName}}.service';
import { {{upperModuleName}}GraphQLTypes } from '../{{moduleName}}.graphql.types';

export const get{{upperModuleName}}DetailQuery: GraphQLFieldConfig<any, any> = {
  description: '{{moduleName}} graphql query',
  type: {{upperModuleName}}GraphQLTypes,
  args: {
  },

  resolve: async (source, args, context) => {
    try {
      await authenticateUserMiddleware(context);
      const {{moduleName}} = await {{moduleName}}Service.findOne({ where: args }, { scope: ['withoutPwd'] });
      return {{moduleName}};
    } catch (error: any) {
      throw handleGraphqlError(error);
    }
  }
};
`