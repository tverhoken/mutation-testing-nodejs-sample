import { searchByEmail, searchByIdentity } from './search';

export default function main({ query }) {
    const queryParams = Object.keys(query);
    if (queryParams.length) {
        if (query.email) {
            return searchByEmail(query.email)
                .then(data => ({ status: 200, body: { data } }));
        }
        const hasEmailParam = queryParams.some(param => param === 'email');
        if (hasEmailParam) {
            return Promise.resolve({ status: 400, body: { error: 'email param provided with empty value.' } });
        }
        if (query.firstname && query.lastname) {
            return searchByIdentity(query.firstname, query.lastname)
                .then(data => ({ status: 200, body: { data } }));
        }
        const hasLastnameParam = queryParams.some(param => param === 'lastname');
        const hasFirstnameParam = queryParams.some(param => param === 'firstname');
        if (!hasLastnameParam || !hasFirstnameParam) {
            return Promise.resolve({ status: 400, body: { error: 'Missing required search parameter.' } });
        }
        return Promise.resolve({ status: 400, body: { error: 'lastname and firstname params provided with empty value.' } });
    }
    return Promise.resolve({ status: 400, body: { error: 'No query parameter provided.' } });
}