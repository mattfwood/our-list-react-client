import instance from './instance';

const api = {
  async signUp(email, username, password, token = '') {
    try {
      const res = await instance.post('/users/create', {
        email,
        username,
        password,
        token
      });
      console.log(res);
      window.localStorage.setItem(
        'ourListAuthHeaders',
        JSON.stringify(res.data.token)
      );
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

  async createGroup(groupName) {
    try {
      return await instance.post('/groups/new', {
        name: groupName,
      });
    } catch (error) {
      console.error(error);
    }
  },

  async getGroup(token) {
    try {
      return await instance.post('/groups/show', {
        token,
      });
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

  async token() {
    try {
      return await instance.get(`/groups/token`);
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default api;
