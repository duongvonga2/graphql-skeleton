import { Response } from 'express';
import { GraphQLError } from 'graphql';
import { ResponseErrorDto, ResponseSuccessDto } from '../dtos';

interface IResponseOptions {
  statusCode?: number;
  message?: string;
  messageCode?: string;
  total?: number;
  pageSize?: number;
  page?: number;
}

const response = (res: Response, data: any) => {
  res.json(data);
};

export const handleError = (error: Error | ResponseErrorDto) => {
  if (error instanceof ResponseErrorDto) {
    return error;
  }
  const result = new ResponseErrorDto({
    error,
    message: error.message,
    name: error.name || 'HANDLE_ERROR'
  });
  return result;
};

export const handleGraphqlError = (error: Error | ResponseErrorDto) => {
  const result = handleError(error);
  return new GraphQLError(result.message, { originalError: result, extensions: { ...result } });
};

export const baseController = {
  success(res: Response, data: any, options?: IResponseOptions) {
    data = new ResponseSuccessDto({ ...options, data });
    res.status(options?.statusCode || 200);
    response(res, data);
  },

  badRequest(res: Response, error: any, options?: IResponseOptions) {
    res.status(options?.statusCode || 400);
    error = handleError(error);
    response(res, error);
  }
};
