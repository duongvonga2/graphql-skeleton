`import { CountOptions, FindOptions } from "sequelize/types";
import { IDbFindOptions } from "../../commons/types";
import { {{upperModuleName}}Model } from "./{{moduleName}}.model";
import { I{{upperModuleName}} } from "./{{moduleName}}.types";

export const {{moduleName}}Service = {
    async createNew(data: I{{upperModuleName}}){
        const {{moduleName}} = await {{upperModuleName}}Model.create(data);
        const {password, ...result} = {{moduleName}}.toJSON();
        return result;
     },
     async findOne(query: FindOptions<I{{upperModuleName}}>, options?: IDbFindOptions){
         const {{moduleName}} = await {{upperModuleName}}Model.scope(...(options?.scope || [])).findOne(query);
         return {{moduleName}};
     },
     async find(query: FindOptions<I{{upperModuleName}}>, options?:IDbFindOptions){
         const {{moduleName}}List = await {{upperModuleName}}Model.scope(...(options?.scope || [])).findAll({...query});
         return {{moduleName}}List;
     },
     async getTotal(query: CountOptions<I{{upperModuleName}}>){
         return {{upperModuleName}}Model.count(query);
     }
}`