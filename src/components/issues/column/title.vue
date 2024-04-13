<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['show'])

const value = ref(props.data.title)
const input = ref(null)
const loading = ref(false)

const isEdit = ref(false)
function editInput() {
  isEdit.value = true
  nextTick(() => {
    input.value?.input?.focus()
  })
}

function handleEnter() {
  nextTick(() => {
    input.value?.input?.blur()
  })
}

async function saveEdit() {
  console.log('-----------')
  isEdit.value = false
  if (value.value === '') {
    value.value = props.data.title
    return
  }

  if (value.value === props.data.title)
    return false

  const { data: res } = await http.post('/issue/update/title', {
    iid: props.data.iid,
    title: value.value,
  })
  if (res.code === 200)
    props.data.title = value.value

  else
    value.value = props.data.title
}

function cancelEdit() {
  value.value = props.data.title
  isEdit.value = false
}

watch(() => props.data, (val) => {
  value.value = val.title
}, { deep: true })
</script>

<template>
  <div class="h-full p-0.5 -mx-2">
    <div class="flex items-center space-x-1.5 h-full px-2" :class="{ 'bg-white': isEdit }">
      <IssuesColumnTask :tid="data.tid" />
      <div v-if="isEdit" class="flex items-center justify-between w-full">
        <el-input
          ref="input" v-model="value" placeholder="请输入" class="h-full w-full" @keyup.enter="handleEnter"
          @blur="saveEdit"
        />
        <!-- <div class="flex items-center space-x-0">
        <el-button size="small" class="w-6 h-6" text @click="saveEdit">
          <span class="icon-[lucide--check] text-blue-600" />
        </el-button>
        <el-button size="small" class="w-6 h-6" text @click="cancelEdit">
          <span class="icon-[lucide--x] text-red-400" />
        </el-button>
      </div> -->
      </div>
      <div v-else class="flex items-center justify-between w-full h-full">
        <span
          class="truncate hover:text-blue-600 hover:underline cursor-pointer underline-offset-4"
          @click="emit('show', data)"
        >{{ value }}</span>
        <el-button size="small" class="w-6 h-6 hidden edit" text @click="editInput">
          <span class="icon-[lucide--pencil]" />
        </el-button>
      </div>
      <!-- {{ data }} -->
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep() {
  .el-input__wrapper {
    @apply rounded-none shadow-none px-0;
  }
}

.focus .edit {
  @apply flex;
}

.focus .wrap {
  @apply bg-white;
}
</style>
