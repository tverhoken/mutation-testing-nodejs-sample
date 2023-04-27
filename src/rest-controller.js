import { searchByEmail, searchByIdentity } from './search';

export default function main({ query }) {
    return Promise.resolve(Object.keys(query))
        .then(hasQueryParams)
        .then(checkQueryParams(query))
        .then(searchUsers(query))
        .then(data => ({ status: 200, body: { data } }))
        .catch(reason => ({ status: 400, body: { error: reason } }));

}

function hasQueryParams(queryParams) {
    if (queryParams.length) {
        return queryParams;
    }
    return Promise.reject('No query parameter provided.');
}

function checkQueryParams(query) {
    return queryParams => {
        if (query.email || (query.firstname && query.lastname)) {
            return Promise.resolve();
        }
        const hasEmailParam = queryParams.some(param => param === 'email');
        if (hasEmailParam) {
            return Promise.reject('email param provided with empty value.');
        }
        const hasLastnameParam = queryParams.some(param => param === 'lastname');
        const hasFirstnameParam = queryParams.some(param => param === 'firstname');
        if (!hasLastnameParam || !hasFirstnameParam) {
            return Promise.reject('Missing required search parameter.');
        }
        return Promise.reject('lastname and firstname params provided with empty value.');
    }
}

function searchUsers({ email, firstname, lastname }) {
    return () => {
        if (email) {
            return searchByEmail(email);
        }
        return searchByIdentity(firstname, lastname);
    };
}