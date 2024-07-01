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
  const userStore = useUserStore()
  const { getContractors, getAllUsers } = useSettingsStore()

  // // 1.白名单地址直接进入
  if (whiteList.includes(to.name)) {
    next()
    return
  }

  console.log(isWeixin())

  // // 2.如果有token，表示已经登陆，直接进入
  // if (getToken()) {
  //   // 初始化用户数据
  //   if (!userStore.user) {
  //     await userStore.userInfo()
  //     await getContractors()
  //     await getAllUsers()
  //   }

  //   // 这里设置分类，cate 为 task 或 issue
  //   const { cate, openedGid, setCate } = useTaskStore()
  //   if (to.fullPath.startsWith('/task'))
  //     setCate('task')

  //   if (to.fullPath.startsWith('/issue'))
  //     setCate('issue')

  //   next()
  //   return
  // }

  // // 3. 如果微信中url里携带token，保存下来
  // if (to.query.token && isWeixin())
  //   setToken(to.query.token)

  // // 3.如果没有token
  // // 3.1 是否微信环境，全部跳转到授权页
  // if (isWeixin()) {
  //   // 如果网址有中token就写入
  //   if (to.query.token) {
  //     setToken(to.query.token)
  //     next()
  //   }

  //   // 如果是邀请页
  //   if (to.name === 'wechat-invitation') {
  //     next()
  //     return false
  //   }
  // }

  // 如果url里携带token，保存下来
  if (to.query.token && isWeixin())
    setToken(to.query.token)

  // 邀请页面特殊处理
  if (to.name === 'wechat-invitation') {
    next()
    return false
  }

  const hasToken = getToken()
  if (hasToken) {
    if (!userStore.user) {
      await userStore.userInfo()
      await getContractors()
      await getAllUsers()
    }

    // 这里设置分类，cate 为 task 或 issue
    const { cate, openedGid, setCate } = useTaskStore()
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
