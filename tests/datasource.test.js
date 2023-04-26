import fetch from 'node-fetch';

import getAll from '@src/datasource';

jest.mock('node-fetch');

describe('Datasource', () => {
  describe('getAll', () => {
    it('Should return a client error with cause when calling resource api returns a response with 4xx code.', () => {
      const expectedErrorName = 'Bad request';
      const expectedErrorMessage = '401 - Unauthorized';
      const httpResponse = {
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
      };

      fetch.mockResolvedValue(httpResponse);

      return getAll()
        .then(() => expect(false).toBe(true))
        .catch((error) => {
          expect(error.name).toEqual(expectedErrorName);
          expect(error.message).toEqual(expectedErrorMessage);
        });
    });
    it('Should return a server error with cause when calling resource api returns a response with 5xx code.', () => {
      const expectedErrorName = 'Internal server error';
      const expectedErrorMessage = '503 - Service unavailable';
      const httpResponse = {
        ok: false,
        status: 503,
        statusText: 'Service unavailable',
      };

      fetch.mockResolvedValue(httpResponse);

      return getAll()
        .then(() => expect(false).toBe(true))
        .catch((error) => {
          expect(error.name).toEqual(expectedErrorName);
          expect(error.message).toEqual(expectedErrorMessage);
        });
    });
    it('Should return a server error with cause when calling resource api returns a response with 5xx code.', () => {
      const expectedData = [{ id: 1 }];
      const body = {
        data: expectedData,
      };
      const httpResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue(body),
      };

      fetch.mockResolvedValue(httpResponse);

      return getAll()
        .then(data => expect(data).toBe(expectedData))
        .catch(() => expect(true).toBe(false));
    });
  });
});
