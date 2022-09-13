import request from 'supertest';
import { appRun, server } from '../..';

describe('test root path', () => {
  //@ts-ignore
  test('It should be response status code 200', (done) => {
    request(appRun)
      .get('/api/user/user/detail?username=user1')
      .then((response) => {
        const example = {
          id: 'string',
          username: 'string',
          name: 'string',
          password: 'string'
        };
        for (const key in example) {
          expect(response.body.data).toHaveProperty(key);
        }
      }).finally(()=> {
        done();
        server.close();
      });
  });
});
