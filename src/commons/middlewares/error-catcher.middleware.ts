import { Request, Response } from 'express';
import { handleError } from '../controllers';
import { logger } from '../utils';

export const ErrorCatcherMiddleware = (
  error: Error,
  req: Request & { user?: any },
  res: Response
) => {
  const response = handleError(error);
  logger.error('[ERROR CATCHER]', error);
  res.status(response.statusCode || 500).json(error);
};
