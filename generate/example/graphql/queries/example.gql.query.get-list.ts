`import { GraphQLFieldConfig, GraphQLInt, GraphQLList, GraphQLString } from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { {{moduleName}}Service } from '../../{{moduleName}}.service';
import { {{upperModuleName}}ListGraphQLTypes } from '../{{moduleName}}.graphql.types';

export const get{{upperModuleName}}ListQuery: GraphQLFieldConfig<any, any> = {
  description: '{{moduleName}} graphql query',
  type: {{upperModuleName}}ListGraphQLTypes,
  args: {
    pageSize: { type: GraphQLInt },
    page: { type: GraphQLInt },
    order: { type: new GraphQLList(new GraphQLList(GraphQLString)) },
    status: { type: GraphQLString }
  },

  resolve: async (source, args, context) => {
    try {
      const { pageSize = 50, page = 1, order = [['createdAt'], ['DESC']], ...query } = args;
      const limit = pageSize;
      const offset = pageSize * (page - 1);
      const {{moduleName}}List = await {{moduleName}}Service.find(
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
      const total = await {{moduleName}}Service.getTotal({ where: query });
      return {
        {{moduleName}}s: {{moduleName}}List,
        total
      };
    } catch (err: any) {
      throw handleGraphqlError(err);
    }
  }
};
`