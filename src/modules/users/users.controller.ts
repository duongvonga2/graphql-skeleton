import { Response } from 'express';
import { baseController } from '../../commons/controllers';
import { userService } from './users.service';

export const userController = {
  async createNew(req: any, res: Response, next: any) {
    try {
      const data = await userService.createNew({
        name: 'graphqldemo',
        username: 'graphqldemo',
        password: 'graphqldemo',
        status: 'active'
      });
      baseController.success(res, data);
    } catch (error) {
      return baseController.badRequest(res, error);
    }
  },
  async findOne(req: any, res: Response, next: any){
    try{
      const data = await userService.findOne(req.query);
      baseController.success(res, data);
    }catch(error){
      return baseController.badRequest(res, error);
    }
  }
};
