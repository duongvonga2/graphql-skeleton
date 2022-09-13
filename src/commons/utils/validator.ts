import Joi from 'joi';

export const validate = (data: Record<string, any>, validatedSchema: Joi.ObjectSchema) => {
  const { error, value } = validatedSchema.validate(data, {
    abortEarly: false,
    allowUnknown: false
  });
  if (error) {
    const { errors, message } = getJoiError(error);
    return { errors, message };
  }
  return { value };
};

export const getJoiError = (error: Joi.ValidationError) => {
  const errors: any = {};
  const message: any = [];
  const errorDetails = error.details;
  errorDetails.forEach((err) => {
    const label = err.context?.label;
    if(label){
        errors[label] = err.type;
        message.push(err.message);
    }
  });
  return { errors, message };
};

