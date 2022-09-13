`import { ENUM, ModelDefined, STRING } from 'sequelize';
import { postgresDb } from '../../commons/databases';
import { I{{upperModuleName}} } from './{{moduleName}}.types';

export const {{upperModuleName}}Model: ModelDefined<I{{upperModuleName}}, I{{upperModuleName}}> = postgresDb.define(
  '{{moduleName}}s',
  {
    
  },
  {
    
  }
);
`