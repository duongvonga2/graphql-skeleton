import Joi from "joi";

export const JOI_STRING = Joi.string();
export const JOI_NUMBER = Joi.number();
export const JOI_INT_NUMBER = Joi.number().integer();