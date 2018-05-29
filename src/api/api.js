import instance from './instance';

const api = {
  async signUp(email, username, password) {
    try {
      const user = { email, username, password };
      const res = await instance.post('auth', { user });
      return res;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async login(email, password) {
    try {
      const res = await instance.post('/login', { email, password });
      window.localStorage.setItem(
        'ourListAuthHeaders',
        JSON.stringify(res.data.token)
      );
      return res;
    } catch (error) {
      console.error(error);
      // throw new Error(error);
    }
  },

  async me() {
    try {
      const res = await instance.get('/users/me');
      return res;
    } catch (error) {
      console.error(error);
    }
  },

  async lists() {
    try {
      const res = await instance.get('/lists');
      console.log(res);

      return res;
    } catch (error) {
      console.error(error);
    }
  },

  async createList(title) {
    try {
      return await instance.post('/lists/new', {
        title
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default api;
