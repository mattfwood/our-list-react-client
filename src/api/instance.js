import axios from 'axios';

/**
 * Axios instance for our list
 *
 * if headers exist in localstorage
 * appends them to all requests automatically
 */

const URL =
  process.env.NODE_ENV === 'production'
    ? 'https://our-list-adonis.herokuapp.com/'
    : 'http://127.0.0.1:3333';

const instance = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data, headers) => {
      // check if JWT exists
      const jwt = JSON.parse(window.localStorage.getItem('ourListAuthHeaders'));

      console.log(jwt);

      // if it does, add to the headers
      if (jwt) {
        Object.assign(headers, {
          Authorization: `Bearer ${jwt}`,
        });
      }

      // return the data normally
      return JSON.stringify(data);
    },
  ],
});

export default instance;
