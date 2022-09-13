`import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLObjectType,
} from 'graphql';
import { handleGraphqlError } from '../../../../commons/controllers';
import { ResponseErrorDto } from '../../../../commons/dtos';
import { validate } from '../../../../commons/utils';
import { {{moduleName}}Service } from '../../{{moduleName}}.service';
import { I{{upperModuleName}} } from '../../{{moduleName}}.types';
import { create{{upperModuleName}}Schema } from '../../validator-schema';
import { {{upperModuleName}}GraphQLTypes } from '../{{moduleName}}.graphql.types';

export const create{{upperModuleName}}Mutation: GraphQLFieldConfig<any, any> = {
  description: '{{moduleName}} graphql query',
  type: new GraphQLObjectType({
    name: 'create{{upperModuleName}}Payload',
    fields: {
      {{moduleName}}: { type: {{upperModuleName}}GraphQLTypes }
    }
  }),
  args: {
  },

  resolve: async (source, args, context) => {
    try {
      const {{moduleName}}CreatedDocs: I{{upperModuleName}} = args.input;
      const { errors, message, value } = validate({{moduleName}}CreatedDocs, create{{upperModuleName}}Schema);
      if (errors) {
        throw new ResponseErrorDto({ error: errors, message, name: 'VALIDATE_ERROR' });
      }
      const {{moduleName}} = await {{moduleName}}Service.createNew(value);
      return { {{moduleName}} };
    } catch (err: any) {
      throw handleGraphqlError(err);
    }
  }
};
`