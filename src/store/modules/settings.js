import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    title: 'BIMGO',
    sideWidth: 256,
    sideCollapsed: false,
    wechat: {
      mp: {
        appid: 'wx696779f3aa33a37f',
      },
    },
    project: {
      name: '聚怡信息',
      api_url: import.meta.env.VITE_API_URL,
      file_url: 'https://bimgo-files.nipao.com',
    },
    // 系统默认用户分组
    defaultUserGroup: [
      {
        label: '管理员',
        value: 'admin',
        description: '可以管理帐号设置等权限',
      },
      {
        label: '普通用户',
        value: 'user',
        description: '拥有部分权限',
      },
      {
        label: '合作者',
        value: 'contractor',
        description: '只能发表评论，更改状态和附件文件',
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
    taskStatus: [
      {
        label: '已删除',
        color: '#bdc1bc',
        value: 0,
      },
      {
        label: '未开始',
        color: '#e7ad02',
        value: 1,
      },
      {
        label: '进行中',
        color: '#2563eb',
        value: 2,
      },
      {
        label: '已完成',
        color: '#41ab37',
        value: 3,
      },
    ],
    taskPriority: [
      {
        label: '较低',
        color: '#8c8c8c',
        value: 0,
      },
      {
        label: '普通',
        color: '#1b9aee',
        value: 1,
      },
      {
        label: '紧急',
        color: '#ffa941',
        value: 2,
      },
      {
        label: '非常紧急',
        color: '#e62412',
        value: 3,
      },
    ],

    issueStatus: [
      {
        label: '新建',
        desc: '该问题尚未开始',
        color: '#20883d',
        value: 'todo',
      },
      {
        label: '进行中',
        desc: '该工作正在积极进行中',
        color: '#9a6701',
        value: 'doing',
      },
      {
        label: '已完成',
        desc: '至此已经完成',
        color: '#8250df',
        value: 'done',
      },
    ],
    issuePriority: [
      {
        label: '较低',
        color: '#8c8c8c',
        value: 0,
      },
      {
        label: '普通',
        color: '#1b9aee',
        value: 1,
      },
      {
        label: '紧急',
        color: '#ffa941',
        value: 2,
      },
      {
        label: '非常紧急',
        color: '#e62412',
        value: 3,
      },
    ],
    contractors: [],
    users: [],
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

    async getAllUsers() {
      const { data: res } = await http.post('/user/all')
      if (res.code === 200)
        this.users = res.data
    },

    changeSideCollapsed() {
      this.sideCollapsed = !this.sideCollapsed

      if (this.sideCollapsed)
        this.sideWidth = 0
      else
        this.sideWidth = 256
    },
  },
})
