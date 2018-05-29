import instance from './instance';

const api = {
  async signUp(email, username, password) {
    try {
      const user = { email, username password };
      const res = await instance.post('auth', { user });
      return res;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },

  async login(email, password) {
    try {
      const user = { email, password };
      const res = await instance.post('login', { user });
      console.log(res);
      window.localStorage.setItem('ourListAuthHeaders', JSON.stringify(res.data.token));
      return res;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

export default api;
