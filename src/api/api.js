import instance from './instance';

const api = {
  async signUp(email, username, password) {
    try {
      const res = await instance.post('/users/create', {
        email,
        username,
        password,
      });
      window.localStorage.setItem(
        'ourListAuthHeaders',
        JSON.stringify(res.data.token)
      );
      console.log(res);
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
        title,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async createTask(name, list_id) {
    try {
      return await instance.post('/tasks/new', {
        list_id,
        name,
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  async updateTask(task_id, updatedTask) {
    try {
      return await instance.post(`/tasks/${task_id}`, updatedTask);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default api;
