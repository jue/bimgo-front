<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})
const key = ref('')

const { issue_columns } = storeToRefs(useUserStore())

const issueStatus = issue_columns.value.status.options
const filteredData = computed(() => filterData(key.value, 'label', issueStatus))

const value = ref(props.data.status)
const itemValue = ref(issueStatus.find(item => item.value === value.value))

async function changeValue(val) {
  const { data: res } = await http.post('/issue/update/status', {
    iid: props.data.iid,
    status: val,
  })
  if (res.code === 200) {
    itemValue.value = issueStatus.find(item => item.value === val)
    props.data.status = val
  }
  else {
    value.value = props.data.title
  }
}

watch(() => props.data.status, (val) => {
  value.value = val
  itemValue.value = issueStatus.find(item => item.value === val)
})
</script>

<template>
  <el-dropdown trigger="click" class="w-full px-[6px]">
    <div class="flex items-center justify-between w-full ">
      <div
        class="text-xs border h-6 flex items-center px-2 rounded-full"
        :style="{ borderColor: `${itemValue?.color}`, backgroundColor: `${itemValue?.color}10`, color: `${itemValue?.color}` }"
      >
        {{ itemValue.label }}
      </div>
      <span class="icon-[lucide--chevron-down] text-gray-400 hover:bg-gray-800" />
    </div>
    <template #dropdown>
      <!-- <pre>
        {{ issueStatus }}
      </pre> -->

      <el-dropdown-menu class="w-56">
        <div class="py-1">
          <div class="text-xs font-semibold mb-1 px-1">
            选择选项
          </div>
          <div>
            <el-input v-model="key" class="w-full" placeholder="搜索并创建状态" clearable>
              <template #prefix>
                <span class="icon-[lucide--search]" />
              </template>
            </el-input>
          </div>
        </div>
        <div class="max-h-64 overflow-y-auto">
          <template v-if="filteredData.length > 0">
            <el-dropdown-item v-for="item in filteredData" :key="item.value" @click="changeValue(item.value)">
              <div class="flex space-x-2 w-full">
                <div class="w-4 h-4 flex items-center justify-center">
                  <span v-if="value === item.value" class="icon-[lucide--check]" />
                </div>
                <div
                  class="w-3.5 h-3.5 rounded-full border border-2"
                  :style="{ borderColor: `${item?.color}`, backgroundColor: `${item?.color}10` }"
                />
                <div class="leading-none space-y-1 flex-1">
                  <div>{{ item.label }}</div>
                  <div class="text-xs text-gray-400">
                    {{ item.desc }}
                  </div>
                </div>
              </div>
            </el-dropdown-item>
          </template>
          <el-dropdown-item v-else>
            <div class="flex items-center text-gray-400 space-x-1">
              <div class="icon-[lucide--circle-off]" />
              <div>没有匹配项</div>
            </div>
            <!-- <div class="flex space-x-2 w-full">
              <div class="w-4 h-4 flex items-center justify-center">
                <span class="icon-[lucide--plus]" />
              </div>
              <div class="leading-none space-y-1 flex-1">
                <div class="text-blue-600 font-semibold">
                  {{ key }}
                </div>
                <div class="text-xs text-gray-400">
                  创建一个新选项
                </div>
              </div>
            </div> -->
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
