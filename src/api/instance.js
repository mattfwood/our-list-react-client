import axios from 'axios';

/**
 * Axios instance for our list
 *
 * if headers exist in localstorage
 * appends them to all requests automatically
 */

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  timeout: 10000,
  headers: {
    'X-Key-Inflection': 'camel',
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data, headers) => {
      // check if stored headers exist
      const storedHeaders = JSON.parse(
        window.localStorage.getItem('ourListAuthHeaders')
      );

      // if they do, add them to the headers
      if (storedHeaders) {
        Object.assign(headers, storedHeaders);
      }

      // return the data normally
      return JSON.stringify(data);
    },
  ],
});

export default instance;
