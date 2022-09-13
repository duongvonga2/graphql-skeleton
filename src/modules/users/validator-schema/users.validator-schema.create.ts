import Joi from 'joi';
import { JOI_STRING } from '../../../commons/constansts';
import { USER_CONSTANT } from '../users.constant';
import { IUser } from '../users.types';

export const createUserSchema = Joi.object<IUser>().keys({
  username: JOI_STRING.required().trim(),
  name: JOI_STRING.required().trim(),
  password: JOI_STRING.required(),
  status: JOI_STRING.valid(...Object.values(USER_CONSTANT.STATUS_DEFINED)).required().trim()
});
