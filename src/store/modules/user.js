import { defineStore } from 'pinia'
import { useSettingsStore } from './settings'

export const useUserStore = defineStore('token', {
  state: () => ({
    type: 'vue3',
    token: 'aa--00',
    user: null,
    config: {
      task_table: {
        stripe: false,
        border: false,
        size: 'default',
        column: {
          title: {
            label: '任务名',
            width: 300,
            show: true,
            sort: 1,
          },
          contractor_id: {
            label: '执行团队',
            show: true,
            sort: 2,
          },
          status: {
            label: '任务状态',
            show: true,
            sort: 3,
          },
          start_time: {
            label: '开始日期',
            width: 150,
            show: true,
            sort: 4,
          },
          end_time: {
            label: '结束日期',
            show: true,
            sort: 5,
          },
          done_time: {
            label: '实际完成日期',
            show: true,
            sort: 6,
          },
          priority: {
            label: '优先级',
            show: true,
            sort: 7,
          },
          progress: {
            label: '进度',
            show: true,
            sort: 8,
          },
          budget: {
            label: '预算',
            show: true,
            sort: 9,
          },
        },

      },
    },
    issue_columns: {},
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
