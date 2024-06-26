<script setup>
const route = useRoute()
const router = useRouter()

const form = reactive({
  rid: route.query.rid,
  title: '',
  type: 'daily',
  content: '',
})

const types = reactive([
  { label: '日报', value: 'daily' },
  { label: '周报', value: 'weekly' },
  { label: '月报', value: 'monthly' },
])

const rules = reactive({
  title: [{ required: true, message: '请输入报告名称', trigger: 'blur' }],
})

const formRef = ref(null)
const files = reactive([])

// 上传成功成更新文件列表
function onUploaded(file) {
  console.log(file)
  files.push(file)
}

const loading = ref(false)
// 提交数据报告
async function submitForm(formEl) {
  if (!formEl)
    return false

  loading.value = true

  try {
    await formEl.validate()
    // 向后台提交数据
    const { data: res } = await http.post('/report/edit', form)
    if (res.code === 200) {
      ElMessage.success('编辑成功')
      back()
    }
    else { ElMessage.error(res.message) }
  }
  catch (error) {
    console.log(error)
  }
  finally {
    loading.value = false
  }
}

function back() {
  router.push('/report')
}

// 获取报告信息
async function getReportByRid() {
  if (route.query.rid) {
    const { data: res } = await http.post('/report/detail', { rid: route.query.rid })
    if (res.code === 200)
      Object.assign(form, res.data)
  }
}

onMounted(() => {
  getReportByRid()
})
</script>

<template>
  <div class="app-container w-[1000px]">
    <div class="flex items-center justify-between box-shadow-bottom h-12 px-5">
      <div class="font-bold">
        编辑报告
      </div>
      <Button label="返回" outlined @click="back" />
    </div>
    <ScrollPanel class="flex-1">
      <div class="py-5 px-4">
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="100px"
          label-position="top"
          size="large"
        >
          <el-form-item label="报告名称" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-form-item label="报告类型">
            <el-radio-group v-model="form.type">
              <el-radio
                v-for="item in types"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="报告简述">
            <el-input
              v-model="form.content" type="textarea" :autosize="{
                minRows: 8,
                maxRows: 15,
              }"
            />
          </el-form-item>
          <el-form-item label="上传文档">
            <div class="w-full space-y-2">
              <UploadButton cate="report">
                <Button :id="form.rid" label="点击上传" @uploaded="onUploaded" />
              </UploadButton>
              <FileList :files="files" @deleted="files.splice(files.indexOf($event), 1)" />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </scrollpanel>
    <div class="flex items-center justify-between box-shadow-top h-12 px-5">
      <div />
      <div class=" space-x-4">
        <Button label="取消" icon="icon-[lucide--x]" severity="secondary" outlined @click="back" />
        <Button label="提交报告" icon="icon-[lucide--check]" :loading="loading" @click="submitForm(formRef)" />
      </div>
    </div>
  </div>
</template>
