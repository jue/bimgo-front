<script setup>
const emits = defineEmits(['refresh'])
const { getContractors } = useSettingsStore()
const type = ref('add')
const visible = ref(false)
const formRef = ref(null)
const form = reactive({
  contractor_name: '',
  contractor_desc: '',
})
const rules = reactive({
  contractor_name: [{ required: true, message: '请输入单位名称', trigger: 'blur' }],
})
function open(obj = null) {
  if (obj) {
    type.value = 'edit'
    Object.assign(form, obj)
  }
  else {
    type.value = 'add'
    Object.assign(form, {
      contractor_name: '',
      contractor_desc: '',
    })
  }
  visible.value = true
}

function cancel() {
  visible.value = false
}

async function submit(formEl) {
  if (!formEl)
    return

  await formEl.validate(async (valid) => {
    if (valid) {
      const { data: res } = await http.post(`/contractor/${type.value}`, form)
      if (res.code === 200) {
        emits('refresh')
        getContractors()
        visible.value = false
        ElMessage.success('操作成功')
      }
    }
  })
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog v-model="visible" :title="`${type === 'add' ? '添加' : '编辑'}承包单位`" width="500px">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" class="mt-5" label-position="top">
      <el-form-item prop="contractor_name" label="单位名称">
        <el-input v-model="form.contractor_name" placeholder="承包单位名称" clearable />
      </el-form-item>
      <el-form-item prop="contractor_desc" label="描述">
        <el-input v-model="form.contractor_desc" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="描述" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="cancel">
          取消
        </el-button>
        <el-button type="primary" @click="submit(formRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
