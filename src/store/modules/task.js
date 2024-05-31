import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    payload: {
      type: 'tree',
      key: '',
      sort: 'default',
    },
    payload_issue: {
      key: '',
      key_field: '',
      sort_field: '',
      sort: '',
      groupby_field: '',
      list: 'all',
    },
    cate: 'task',
    tasks: [],
    hoverGid: '', // 鼠标悬浮的任务组
    selectedGids: [], // 选中的任务组

    // 选中的任务单元格
    selectedCell: {
      gid: '',
      field: '',
    },

    // 所需显示的字段
    columns: [],

    // 任务组树隐藏节点
    unexpandedKeys: [],

    // 甘特图表格的宽度
    tableWidth: 0,
  }),
  getters: {
    // 数据列表接口
    apiList: state => `/${state.cate}/list`,
  },
  actions: {
    async getTasks() {
      const { data: res } = await http.post(this.apiList, this.cate === 'task' ? this.payload : this.payload_issue)
      if (res.code === 200)
        this.tasks = res.data
    },
    setCate(newCate) {
      this.cate = newCate
    },
    setColumns(columns) {
      this.columns = columns
    },
    setTableWidth(width) {
      this.tableWidth = width
    },
  },
})
