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
  if (props.form.sort_field === props.data.value && props.form.sort === sort) {
    props.form.sort_field = ''
    props.form.sort = ''
  }
  else {
    props.form.sort_field = props.data.value
    props.form.sort = sort
  }

  emit('update:form')
}

function handleGroupBy() {
  if (props.form.groupby_field === props.data.value)
    props.form.groupby_field = ''
  else
    props.form.groupby_field = props.data.value

  // emit('update:form')
}

function handleFilter() {
  if (props.form.key === `${props.data.label}:` && props.form.key_field === props.data.value) {
    props.form.key = ''
    props.form.key_field = ''
  }
  else {
    props.form.key = `${props.data.label}:`
    props.form.key_field = props.data.value
  }

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
  <div class="flex items-center space-x-0.5">
    <np-button
      v-if="form.sort_field === data.value && form.sort === 'asc'" size="24" shape="square"
      icon="arrow-up-narrow-wide" text @click="handleSort('desc')"
    />
    <np-button
      v-if="form.sort_field === data.value && form.sort === 'desc'" size="24" shape="square"
      icon="arrow-down-wide-narrow" text @click="handleSort('asc')"
    />
    <el-dropdown trigger="click" @visible-change="(v) => (show = v)">
      <np-button shape="square" icon="ellipsis" text :class="{ 'bg-gray-100': show }" class="hover:bg-gray-100" />

      <template #dropdown>
        <!-- <pre>
         {{ data }}
         {{ form }}
      </pre> -->
        <el-dropdown-menu class="w-48">
          <!-- <el-dropdown-item>
            <div class="flex items-center w-full">
              <span class="icon-[lucide--list] mr-2 text-zinc-600" />
              <span class="flex-1">选择列</span>
            </div>
          </el-dropdown-item> -->
          <el-dropdown-item @click="handleGroupBy">
            <div class="flex items-center w-full">
              <span class="icon-[lucide--gallery-vertical-end] mr-2 text-zinc-600" />
              <span class="flex-1">按此字段分组</span>
              <span v-if="form.key_field === data.value" class="icon-[lucide--x]" />
            </div>
          </el-dropdown-item>
          <el-dropdown-item divided @click="handleSort('asc')">
            <div class="flex items-center w-full">
              <span class="icon-[lucide--arrow-up-narrow-wide] mr-2 text-zinc-600" />
              <span class="flex-1">升序排列</span>
              <span v-if="form.sort === 'asc' && form.sort_field === data.value" class="icon-[lucide--x]" />
            </div>
          </el-dropdown-item>
          <el-dropdown-item @click="handleSort('desc')">
            <div class="flex items-center w-full">
              <span class="icon-[lucide--arrow-down-wide-narrow] mr-2 text-zinc-600" />
              <span class="flex-1">降序排列</span>
              <span v-if="form.sort === 'desc' && form.sort_field === data.value" class="icon-[lucide--x]" />
            </div>
          </el-dropdown-item>
          <!-- <el-dropdown-item divided @click="handleFilter">
            <div class="flex items-center w-full">
              <span class="icon-[lucide--list-filter] mr-2 text-zinc-600" />
              <span class="flex-1">按值过滤…</span>
              <span v-if="form.key_field === data.value" class="icon-[lucide--x]" />
            </div>
          </el-dropdown-item> -->
          <el-dropdown-item divided @click="columnShow(data.value)">
            <div class="flex items-center w-full">
              <span class="icon-[lucide--eye-off] mr-2 text-zinc-600" />
              <span class="flex-1">隐藏字段</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
