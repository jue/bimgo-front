import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    title: 'BIMGO',
    wechat: {
      mp: {
        appid: 'wx696779f3aa33a37f',
      },
    },
    project: {
      name: '聚怡信息',
    },
    // 系统默认用户分组
    defaultUserGroup: [
      {
        label: '管理员',
        value: 1,
      },
      {
        label: '普通用户',
        value: 2,
      },
      {
        label: '合作者',
        value: 3,
      },
    ],
  }),
  actions: {
    setTitle(title) {
      this.state.title = title
    },
  },
})
