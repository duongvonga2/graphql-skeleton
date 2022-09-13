import { NextFunction, Request, Response } from 'express';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL
} from 'graphql-helix';
import { graphqlSchema as schema } from '../../modules/schema.graphql';

export const graphqlMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (shouldRenderGraphiQL(req)) {
    res.send(renderGraphiQL({ endpoint: '/graphql' }));
    return;
  }
  const params = getGraphQLParameters(req);
  
  const result = await processRequest({
    operationName: params.operationName,
    query: params.query,
    variables: params.variables,
    request: req,
    schema,
    contextFactory: (context) => {
      return context;
    }
  });

  sendResult(result, res, (result) => {
    return {
      data: result.data,
      errors: result.errors?.map((err) => {
        return err;
      })
    };
  });
};