<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  form: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:form'])
const { issue_columns } = storeToRefs(useUserStore())
const show = ref(false)

function handleSort(sort) {
  if (props.form.field === props.data.value && props.form.sort === sort) {
    props.form.field = ''
    props.form.sort = ''
  }
  else {
    props.form.field = props.data.value
    props.form.sort = sort
  }

  emit('update:form')
}

function handleFilter() {
  props.form.key = `${props.data.label}:`
  props.form.key_value = props.data.value

  emit('update:form')
}

async function columnShow(val) {
  issue_columns.value[val].show = !issue_columns.value[val].show
  await http.post('/issue/column/update', {
    data: {
      [val]: {
        show: issue_columns.value[val].show,
      },
    },
  })
}
</script>

<template>
  <el-dropdown trigger="click" @visible-change="(v) => (show = v)">
    <div class="flex items-center space-x-[1px]">
      <span
        v-if="form.field === data.value && form.sort === 'asc'"
        class="icon-[lucide--arrow-up-narrow-wide] text-zinc-600"
      />
      <span
        v-if="form.field === data.value && form.sort === 'desc'"
        class="icon-[lucide--arrow-down-wide-narrow] mr-2 text-zinc-600"
      />
      <np-button size="24" shape="square" icon="ellipsis" text :class="{ 'bg-gray-100': show }" />
    </div>

    <template #dropdown>
      <pre>
         {{ data }}
         {{ form }}
      </pre>
      <el-dropdown-menu class="w-48">
        <el-dropdown-item>
          <div class="flex items-center w-full">
            <span class="icon-[lucide--list] mr-2 text-zinc-600" />
            <span class="flex-1">选择列</span>
          </div>
        </el-dropdown-item>
        <el-dropdown-item divided @click="handleSort('asc')">
          <div class="flex items-center w-full">
            <span class="icon-[lucide--arrow-up-narrow-wide] mr-2 text-zinc-600" />
            <span class="flex-1">升序排列</span>
            <span v-if="form.sort === 'asc' && form.field === data.value" class="icon-[lucide--x]" />
          </div>
        </el-dropdown-item>
        <el-dropdown-item @click="handleSort('desc')">
          <div class="flex items-center w-full">
            <span class="icon-[lucide--arrow-down-wide-narrow] mr-2 text-zinc-600" />
            <span class="flex-1">降序排列</span>
            <span v-if="form.sort === 'desc' && form.field === data.value" class="icon-[lucide--x]" />
          </div>
        </el-dropdown-item>
        <el-dropdown-item divided @click="handleFilter">
          <div class="flex items-center w-full">
            <span class="icon-[lucide--list-filter] mr-2 text-zinc-600" />
            <span class="flex-1">按值过滤…</span>
            <span v-if="form.key_value === data.value" class="icon-[lucide--x]" />
          </div>
        </el-dropdown-item>
        <el-dropdown-item divided @click="columnShow(data.value)">
          <div class="flex items-center w-full">
            <span class="icon-[lucide--eye-off] mr-2 text-zinc-600" />
            <span class="flex-1">隐藏字段</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
