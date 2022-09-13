import { getUserDetailQuery } from './user.gql.query.get-detail';
import { getUserListQuery } from './user.gql.query.get-list';

export * from './user.gql.query.get-detail';

export const userGQLQueryFields = {
  user: getUserDetailQuery,
  users: getUserListQuery
};
