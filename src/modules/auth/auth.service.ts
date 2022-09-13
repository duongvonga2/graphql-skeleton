import * as bcrypt from 'bcrypt';
import { UserModel, USER_CONSTANT } from '../users';
import { LoginFailureException } from './exceptions';
import jwt from 'jsonwebtoken';

export const authService = {
  async login(username: string, password: string) {
    const user = await UserModel.findOne({
      where: { username, status: USER_CONSTANT.STATUS_DEFINED.ACTIVE }
    });
    if (!user) {
      throw new LoginFailureException();
    }

    const isAccess = bcrypt.compareSync(password, user.getDataValue('password'));
    if (!isAccess) {
      throw new LoginFailureException();
    }

    const payload = {
      id: user.getDataValue('id')
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY || 'thisissecretkey');
  }
};
