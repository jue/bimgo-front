<script setup>
const router = useRouter()
const route = useRoute()
const loginType = ref('wechat')
function jump() {
  router.push({ path: route.query?.redirect || '/' })
}
</script>

<template>
  <div class="py-5">
    <AuthPassword v-if="loginType === 'password'" @jump="jump" />
    <AuthWechat v-if="loginType === 'wechat'" />
    <div class="text-center mt-10 space-y-2">
      <div class="text-neutral-400">
        或使用以下方式登录
      </div>
      <Button v-if="loginType === 'password'" variant="secondary" class="h-8" @click="loginType = 'wechat'">
        <span class="icon-[ic--baseline-wechat] mr-1 text-lg text-green-500" />
        微信登录
      </Button>
      <Button v-if="loginType === 'wechat'" variant="secondary" class="h-8" @click="loginType = 'password'">
        <span class="icon-[ic--baseline-key] mr-1 text-lg" />
        密码登录
      </Button>
    </div>
  </div>
</template>

<route>
  {
    path: '/login',
    meta: {
      title: '用户登陆',
      layout: 'auth',
    },
    name: 'login',
  }
</route>
