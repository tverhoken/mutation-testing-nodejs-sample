import restController from '@src/rest-controller';
import { searchByEmail, searchByIdentity } from '@src/search';

jest.mock('@src/search');

describe('REST controller', () => {

    beforeEach(() => {
        searchByEmail.mockRejectedValue('NOPE');
        searchByIdentity.mockRejectedValue('NOPE');
    });

    it('Should respond with 400 status code when no query param provided on request.', () => {
        const mockedRequest = {
            query: {},
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'No query parameter provided.' });
        });

    });
    it('Should respond with 400 status code when request query params contains email param with empty value.', () => {
        const mockedRequest = {
            query: {
                email: '',
            },
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'email param provided with empty value.' });
        });
    });
    it('Should send result of email search when request query params contains non empty email param.', () => {
        const emailParam = 'emailParam';
        const expectedData = [{ id: 1, email: emailParam }];
        const mockedRequest = {
            query: {
                email: emailParam,
            },
        };

        searchByEmail.mockImplementation((emailArg) => {
            if (emailArg === emailParam) {
                return Promise.resolve(expectedData);
            }
            return Promise.resolve([]);
        });

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expectedData });
        });
    });
    it('Should send results of email search when request query params contains non empty email param and lastname param.', () => {
        const emailParam = 'emailParam';
        const expectedData = [{ id: 1, email: emailParam }];
        const mockedRequest = {
            query: {
                email: emailParam,
                lastname: '',
            },
        };

        searchByEmail.mockImplementation((emailArg) => {
            if (emailArg === emailParam) {
                return Promise.resolve(expectedData);
            }
            return Promise.resolve([]);
        });

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expectedData });
        });
    });
    it('Should respond with 400 status code when query param contains lastname but not firstname.', () => {
        const mockedRequest = {
            query: {
                lastname: 'lastname',
            },
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'Missing required search parameter.' });
        });
    });
    it('Should respond with 400 status code when query param contains firstname but not lastname.', () => {
        const mockedRequest = {
            query: {
                firstname: 'firstname',
            },
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'Missing required search parameter.' });
        });
    });
    it('Should respond with 400 status code when query param contains lastname and firstname with empty values.', () => {
        const mockedRequest = {
            query: {
                lastname: '',
                firstname: '',
            },
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'lastname and firstname params provided with empty value.' });
        });
    });
    it('Should respond with 400 status code when query param contains lastname with value and firstname with empty value.', () => {
        const mockedRequest = {
            query: {
                lastname: 'lastname',
                firstname: '',
            },
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'lastname and firstname params provided with empty value.' });
        });
    });
    it('Should respond with 400 status code when query param contains lastname with empty value and firstname with value.', () => {
        const mockedRequest = {
            query: {
                lastname: '',
                firstname: 'firstname',
            },
        };

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(400);
            expect(response.body).toEqual({ error: 'lastname and firstname params provided with empty value.' });
        });
    });
    it('Should send results of identity search when query param contains lastname and firstname with values.', () => {
        const lastnameParam = 'lastnameParam';
        const firstnameParam = 'firstnameParam';
        const expectedData = [{ id: 1, lastname: lastnameParam, firstname: firstnameParam }];
        const mockedRequest = {
            query: {
                lastname: lastnameParam,
                firstname: firstnameParam,
            },
        };

        searchByIdentity.mockImplementation((firstname, lastname) => {
            if (firstname === firstnameParam && lastname === lastnameParam) {
                return Promise.resolve(expectedData);
            }
            return Promise.resolve([]);
        });

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expectedData });
        });
    });
    it('Should send results of email search when query param contains email and lastname and firstname with values.', () => {
        const emailParam = 'emailParam';
        const lastnameParam = 'lastnameParam';
        const firstnameParam = 'firstnameParam';
        const expectedData = [{ id: 1, email: emailParam }];
        const mockedRequest = {
            query: {
                email: emailParam,
                lastname: lastnameParam,
                firstname: firstnameParam,
            },
        };

        searchByEmail.mockImplementation((emailArg) => {
            if (emailArg === emailParam) {
                return Promise.resolve(expectedData);
            }
            return Promise.resolve([]);
        });

        return restController(mockedRequest).then(response => {
            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expectedData });
        });
    });
});
