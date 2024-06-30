import { defineStore } from 'pinia'

export const useLogsStore = defineStore('logs', {
  state: () => ({
    logs: [],
  }),
  actions: {
    async getLogs(id, cate, action = []) {
      const { data: res } = await http.post('/logs/list', { id, cate, action })
      if (res.code === 200)
        this.logs = res.data // 更新日志数据
    },
    initLogs() {
      this.logs = []
    },
  },
})
