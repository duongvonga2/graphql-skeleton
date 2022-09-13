import request from 'supertest';
import { appRun, server } from '../..';

describe('test auth', () => {
  it('Auth login success', (done) => {
    const loginData = {
      query: `mutation {
            login(username: "user1", password:"user1"){
              accessToken
            }
          }`
    };
    request(appRun)
      .post('/graphql')
      .send(loginData)
      .then((response) => {
        expect(response.body.data.login).toHaveProperty('accessToken');
      })
      .finally(() => {
        done();
        server.close();
      });
  });

  it('Auth should error', (done) => {
    const loginData = {
      query: `mutation {
                login(username: "user1", password:"user11"){
                  accessToken
                }
              }`
    };
    request(appRun)
      .post('/graphql')
      .send(loginData)
      .then((response) => {
        expect(Array.isArray(response.body.errors)).toBe(true);
        expect(response.body.errors[0]).toHaveProperty('message');
      })
      .finally(() => {
        done();
        server.close();
      });
  });
});
