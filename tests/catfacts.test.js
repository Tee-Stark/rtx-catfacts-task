import supertest from 'supertest';
import app from '../index';
import db from '../data/'

const request = supertest(app);

jest.mock('knex', () => {
  const fn = () => {
      return {
          select: jest.fn().mockReturnThis(),
          from: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          first: jest.fn().mockReturnThis(),
          insert: jest.fn().mockReturnThis(),
          raw: jest.fn().mockReturnThis(),
          then: jest.fn(function (done) {
            done(null)
          })
          
      }
  }
  return fn
})

describe('The index route', () => {
  it('should welcome user to nothingness', async () => {
    const response = request.get('/');
    expect((await response).statusCode).toBe(200);
    expect((await response).body.message).toBe("Welcome to the beginning of nothingness.");
  });
});

describe('Get from External API', () => {
  it('should return 5 facts from external API', async () => {
    const response = request.get('/catfacts/fromSource');
    switch ((await response).statusCode) {
      case 400:
        expect((await response).body.message).toBe('one or more cat facts already exist in the database or could not be saved');
        break;
      case 404:
        expect((await response).body.message).toBe('No cat facts returned from API');
        break;
      case 500:
        expect((await response).body.message).toBe('Error saving cat facts to database' || 'Error getting cat facts from API');
        break;
      case 501:
        expect((await response).body.message).toBe('Unable to save cat facts to database from API');
      default:
        expect((await response).body.data.length).toBe(5);
        expect((await response).body.message).toBe('Cat facts found and saved to database');
        break;
    }
  })
})

describe()