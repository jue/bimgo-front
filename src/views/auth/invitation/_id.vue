<script setup>
const route = useRoute()
const info = ref(null)
const settingsStore = useSettingsStore()

const step = ref(1)

const formRef = ref(null)
const form = reactive({
  id: route.params.id,
  openid: route.query.openid,
  realname: '',
  mobile: '',
})

const rules = reactive({
  realname: [
    { required: true, message: '请输入姓名', trigger: 'blur' },
  ],
  mobile: [
    { required: true, validator: validateMobilePhone, trigger: 'blur' },
  ],
})
async function getUserInfo(openid) {
  const { data: res } = await http.post('/user/infobyopenid', {
    openid,
  })

  if (res?.code === 200 && res?.data) {
    info.value = res.data
    step.value = 0
  }
}

function submit(formEl) {
  if (!formEl)
    return
  formEl.validate(async (valid) => {
    if (valid) {
      const { data: res } = await http.post('/user/join', form)
      if (res.code === 200) {
        step.value = 0
        info.value = res.data
        ElMessage.success('加入成功')
      }
    }
  })
}

onBeforeMount(() => {
  if (route.query.openid) {
    // 获取用户信息
    getUserInfo(route.query.openid)
  }
  else {
    location.href = `${useSettingsStore().project.api_url}/wechat/mp/authorize?redirect_uri=${encodeURIComponent(route.fullPath)}`
  }
})
</script>

<template>
  <div class="bg-white rounded-lg px-5">
    <div class="h-11 flex items-center bg-[#fafafa] text-xs text-gray-500/60">
      邀请你加入:
    </div>
    <div class="text-center pb-20 ">
      <div class="text-xl font-medium py-10">
        {{ settingsStore.project.name }}
      </div>
      <template v-if="step === 0">
        <div class="space-y-5">
          <div class="relative w-20 h-20 mx-auto">
            <el-avatar class="relative z-10" :size="80" :src="info?.avatar" />
            <span class="icon-[lucide--check-circle-2] bg-green-600 text-white text-2xl absolute bottom-0 right-0 z-20" />
          </div>
          <div class="text-gray-500/60">
            你已加入
          </div>
        </div>
      </template>
      <template v-if="step === 1">
        <div class="space-y-10">
          <div class=" text-gray-500/60">
            使用BIMGO，和同事沟通更健康 <br>还可通过工作流，快速完成工作
          </div>
          <div>
            <el-button type="primary" class="w-2/3 mt-10" size="large" @click="step = 2">
              加入项目
            </el-button>
          </div>
        </div>
      </template>
      <template v-if="step === 2">
        <div class=" space-y-10">
          <div class="text-xs text-gray-500/60">
            请补充你的资料后，申请加入该项目与同事沟通协作
          </div>
          <div>
            <el-form ref="formRef" :model="form" :rules="rules" label-position="top" size="large">
              <el-form-item prop="realname" label="姓名">
                <el-input v-model="form.realname" placeholder="姓名" />
              </el-form-item>
              <el-form-item prop="mobile" label="手机号">
                <el-input v-model="form.mobile" placeholder="手机号码" />
              </el-form-item>
              <el-form-item />
            </el-form>

            <el-button type="primary" class="w-full" size="large" @click="submit(formRef)">
              提交
            </el-button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<route>
  {
    meta: {
      layout: 'wechat',
    },
    name: 'wechat-invitation',
    path: '/invitation/:id',
  }
</route>
