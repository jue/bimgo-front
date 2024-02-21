<script setup>
const props = defineProps({
  user: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emits = defineEmits(['cancel'])

const form = reactive({

})

function cancel() {
  emits('cancel')
}

function submit() {
  emits('cancel')
}

watch(() => props.user, (newValue) => {
  form.realname = newValue.realname
  form.group = newValue.group
  form.contractors = newValue.contractors || []
}, { deep: true, immediate: true })
</script>

<template>
  <pre>
    {{ form }}
  </pre>
  <div>
    <el-form :model="form" label-width="80px" label-position="top">
      <el-form-item label="姓名">
        <el-input v-model="form.realname" clearable />
      </el-form-item>
      <el-form-item label="使用者类型">
        <select-group v-model="form.group" />
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="submit">
        提交
      </el-button>
      <el-button text @click="cancel">
        取消
      </el-button>
    </div>
  </div>
</template>
