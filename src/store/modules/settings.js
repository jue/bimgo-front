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
      api_url: import.meta.env.VITE_API_URL,
    },
    // 系统默认用户分组
    defaultUserGroup: [
      {
        label: '管理员',
        value: 'admin',
        description: '拥有所有权限',
      },
      {
        label: '普通用户',
        value: 'user',
        description: '拥有部分权限',
      },
      {
        label: '合作者',
        value: 'contractor',
        description: '拥有部分权限，仅可读单位内部数据',
      },
    ],
    userStatus: [
      {
        label: '已删除',
        value: 0,
      },
      {
        label: '活跃',
        value: 1,
      },
      {
        label: '冻结',
        value: 2,
      },
      {
        label: '未激活',
        value: 3,
      },
    ],
    contractors: [],
  }),
  getters: {
    getStateLabel: state => (objectName, value) => {
      const objectMap = new Map(state[objectName].map(item => [item.value, item.label]))
      return objectMap.get(value) || '未知状态'
    },
    getContractorsLabel: state => (contractor_id) => {
      return state.contractors.find(contractor => contractor.contractor_id === contractor_id)
    },
  },
  actions: {
    setTitle(title) {
      this.state.title = title
    },

    async getContractors() {
      const { data: res } = await http.post('/contractor/list')
      if (res.code === 200)
        this.contractors = res.data
    },
  },
})
