import { ExecutionContext } from 'graphql-helix';
import jwt from 'jsonwebtoken';
import { UserModel, USER_CONSTANT } from '../../modules/users';
import { ResponseErrorDto } from '../dtos';
import { UnauthorizedException } from '../exceptions';

const decodeJWT = (token: string) => {
  const payload = jwt.verify(token, process.env.APP_SECRET_KEY || 'thisissecretkey');
  return payload;
};

export const authenticateUserMiddleware = async (context: ExecutionContext) => {
  const req = context.request;
  //@ts-ignore
  const token = req.headers['authorization']?.replace('Bearer ', '') || '';
  if (!token) {
    throw new ResponseErrorDto(new UnauthorizedException());
  }
  const data: any = decodeJWT(token);
  const user = await UserModel.findOne({
    where: { id: data.id, status: USER_CONSTANT.STATUS_DEFINED.ACTIVE }
  });
  if (!user) {
    throw new ResponseErrorDto(new UnauthorizedException());
  }
  //@ts-ignore
  req.user = user;
};
