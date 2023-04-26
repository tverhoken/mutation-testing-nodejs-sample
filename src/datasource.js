import fetch from 'node-fetch';

export default function getAll() {
  return fetch('/api')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      const error = new Error(`${response.status} - ${response.statusText}`);
      error.name = response.status < 500 ? 'Bad request' : 'Internal server error';

      throw error;
    })
    .then(body => body.data);
}
