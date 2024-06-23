import { createRouter, createWebHistory } from 'vue-router'

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = setupLayouts(generatedRoutes)

const defaultRouter = [
  ...routes,
]

const router = createRouter({
  history: createWebHistory(),
  routes: defaultRouter,
})

const whiteList = ['login', 'signup', 'wechat-login', 'wechat-error']

router.beforeEach(async (to, from, next) => {
  // 如果url里携带token，保存下来
  if (to.query.token && isWeixin())
    setToken(to.query.token)

  // 邀请页面特殊处理
  if (to.name === 'wechat-invitation') {
    next()
    return false
  }

  const userStore = useUserStore()
  const { getContractors, getAllUsers } = useSettingsStore()

  if (whiteList.includes(to.name)) {
    next()
    return
  }

  const hasToken = getToken()
  if (hasToken) {
    if (!userStore.user) {
      await userStore.userInfo()
      await getContractors()
      await getAllUsers()
    }

    // 这里设置分类，cate 为 task 或 issue
    const { cate, setCate } = useTaskStore()
    if (to.fullPath.startsWith('/task'))
      setCate('task')

    if (to.fullPath.startsWith('/issue'))
      setCate('issue')

    next()
  }
  else {
    if (isWeixin())
      location.href = `${useSettingsStore().project.api_url}/wechat/mp/authorize?redirect_uri=${encodeURIComponent(to.fullPath)}`

    else
      next(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})

router.afterEach((to, from) => {
  const settingsStore = useSettingsStore()
  document.title = to.meta.title ?? settingsStore.title
})

export default router
