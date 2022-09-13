import Joi from 'joi';
import { JOI_STRING } from '../../../commons/constansts';
import { ILogin } from '../auth.types';

export const loginSchema = Joi.object<ILogin>().keys({
  username: JOI_STRING.required().trim(),
  password: JOI_STRING.required()
});
