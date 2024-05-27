import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'

export const useUserStore = defineStore('token', {
  state: () => ({
    type: 'vue3',
    token: 'aa--00',
    user: null,
    issue_columns: {},
    task_columns: [],
    issue_columns_v2: [],
  }),
  actions: {
    async userLogin(params) {
      try {
        const { data: res } = await http.post('/user/login/password', {
          ...params,
          platform: 'web',
        })

        if (res.code === 200) {
          this.token = res.data.token
          // this.token(res.data.token)
          setToken(res.data.token)
          this.userInfo()
        }

        return res
      }
      catch (error) {
        return error
      }
    },

    async userInfo() {
      const { data: res } = await http.post('/user/info')
      if (res?.code === 200) {
        this.user = res.data
        this.issue_columns = res.data.issue_columns
        this.task_columns = res.data.task_columns
        this.issue_columns_v2 = res.data.issue_columns_v2

        // 获取 settings store 实例
        const settingsStore = useSettingsStore()

        // 设置侧边栏折叠状态
        settingsStore.setSideCollapsed(res.data.sideCollapsed)
      }

      return res
    },

    async logout() {
      const { data: res } = await http.post('/user/logout')
      if (res.code === 200)
        removeToken()
    },
  },
})
