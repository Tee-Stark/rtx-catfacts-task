import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('The index route', () => {
  it('should welcome user to wired!', async () => {
    const response = request.get('/api/v1/');
    expect((await response).statusCode).toBe(200);
    expect((await response).body.title).toBe("You're welcome to Wired!");
  });
});
