import { defineStore } from 'pinia'

export const useIssueStore = defineStore('issue', {
  state: () => ({
    payload: {
      key: '',
      key_field: '',
      sort_field: '',
      sort: '',
      groupby_field: '',
    },
    issues: [],
  }),
  actions: {
    async getIssues() {
      const { data: res } = await http.post('/issue/list', this.payload)
      if (res.code === 200)
        this.issues = res.data
    },
  },
})
