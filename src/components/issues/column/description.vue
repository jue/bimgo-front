<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
})

const value = ref(props.data.description)

const isEdit = ref(false)

watch(() => props.data, () => {
  value.value = props.data.description
}, { deep: true })

async function updateDescription() {
  const { data: res } = await http.post('/issue/update/description', {
    iid: props.data.iid,
    description: value.value,
  })
  if (res.code === 200) {
    isEdit.value = false
    props.data.description = value.value
  }
  else { value.value = props.data.description }
}

function cancel() {
  isEdit.value = false
  value.value = props.data.description
}
</script>

<template>
  <div>
    <div v-if="!isEdit" class="cursor-pointer" @click="isEdit = true">
      <span v-if="data.description" v-html="data.description" />
      <span v-else class="text-gray-400">该问题还没有描述，点击添加</span>
    </div>
    <div v-else>
      <np-editor v-model="value" />
      <div class="flex items-center justify-end py-3">
        <el-button type="info" text @click="cancel">
          取消
        </el-button>
        <el-button type="primary" @click="updateDescription">
          保存
        </el-button>
      </div>
    </div>
  </div>
</template>
