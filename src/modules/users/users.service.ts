import { CountOptions, FindOptions } from "sequelize/types";
import { IDbFindOptions } from "../../commons/types";
import { UserModel } from "./users.model";
import { IUser, IUserCreate } from "./users.types";

export const userService = {
    async createNew(data: IUserCreate){
       const user = await UserModel.create(data);
       const {password, ...result} = user.toJSON();
       return result;
    },
    async findOne(query: FindOptions<IUser>, options?: IDbFindOptions){
        const user = await UserModel.scope(...(options?.scope || [])).findOne(query);
        return user;
    },
    async find(query: FindOptions<IUser>, options?:IDbFindOptions){
        const userList = await UserModel.scope(...(options?.scope || [])).findAll({...query});
        return userList; 
    },
    async getTotal(query: CountOptions<IUser>){
        return UserModel.count(query);
    }
}