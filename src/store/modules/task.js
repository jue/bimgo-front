import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    form: {
      type: 'tree',
      key: '',
      sort: 'default',
    },
    tasks: [],
  }),
  actions: {
    async getTasks() {
      const { data: res } = await http.post('/task/list', this.form)
      if (res.code === 200)
        this.tasks = res.data
    },
  },
})
