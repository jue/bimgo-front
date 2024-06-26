<script setup>
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  cate: {
    type: String,
    default: 'task',
  },
  status: {
    type: String,
    default: 'active',
  },
})

const emit = defineEmits(['add', 'update', 'uploaded'])

const toast = useToast()

const op = ref(null)
function toggle (event) {
  op.value.toggle(event)
}

const options = ref([
  {
    label: '本机上传',
    value: 'local',
    icon: 'icon-[lucide--upload-cloud]',
  },
  {
    label: '网盘选择',
    value: 'drive',
    icon: 'icon-[lucide--folder-plus]',
  },
])

const value = ref('')

// 选择上传
const uploadInput = ref(null)

function hangleChange () {
  if (value.value === 'local') {
    uploadInput.value.click()
  }
  else {
    // 弹出网盘文件
    console.log('弹出网盘文件', value.value)
  }
}

// 本地上传
const loading = ref(false)
const files = ref([])
async function uploader (event) {
  emit('add', {
    file_name: event.target.files[0].name,
    file_type: 'loading',
    file_size: formatSize(event.target.files[0].size),
  })

  loading.value = true
  // 在files里插入临时数据
  files.value.push({
    file_name: event.target.files[0].name,
    file_type: 'loading',
    file_size: formatSize(event.target.files[0].size),
  })

  const formData = new FormData()
  formData.append('id', props.id)
  formData.append('status', props.status)
  formData.append('cate', props.cate)
  formData.append('file', event.target.files[0])

  const { data: res } = await http.post('/file/upload', formData)
  if (res.code === 200) {
    toast.add({ severity: 'success', summary: '上传成功', life: 3000 })

    uploadInput.value.value = null

    files.value[files.value.length - 1] = res.data

    emit('uploaded', res.data)
    emit('update', res.data)
  }
  else {
    emit('update', {
      file_name: event.target.files[0].name,
      file_type: 'error',
      file_size: formatSize(event.target.files[0].size),
    })
    files.value.pop()
    toast.add({ severity: 'error', summary: '上传失败', life: 3000 })
  }
  loading.value = false
}
</script>

<template>
  <div class="space-x-2 flex items-center">
    <span @click="toggle">
      <slot><Button icon="icon-[lucide--arrow-up-from-line]" size="small" plain text :loading="loading" label="上传附件" />
      </slot>
    </span>

    <OverlayPanel ref="op" @show="value = ''" @hide="hangleChange">
      <Listbox v-model="value" :options="options" option-label="label" option-value="value" @change="toggle">
        <template #option="{ option }">
          <div class="flex items-center">
            <span class="mr-2 text-base" :class="option.icon" />
            <span>{{ option.label }}</span>
          </div>
        </template>
      </Listbox>
    </OverlayPanel>

    <input ref="uploadInput" accept="*/*" type="file" class="hidden" @change="uploader">
  </div>
</template>
