<script setup>
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

const { issueStatus } = storeToRefs(useSettingsStore())
const value = ref(props.data.status)
const itemValue = ref(issueStatus.value.find(item => item.value === value.value))

async function changeValue(val) {
  const { data: res } = await http.post('/issue/update/status', {
    iid: props.data.iid,
    status: val,
  })
  if (res.code === 200) {
    itemValue.value = issueStatus.value.find(item => item.value === val)
    props.data.status = val
  }
  else {
    value.value = props.data.title
  }
}

watch(() => props.data.status, (val) => {
  value.value = val
  itemValue.value = issueStatus.value.find(item => item.value === val)
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
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in issueStatus" :key="item.value" @click="changeValue(item.value)">
          <div class="flex space-x-2">
            <div class="w-4 h-4 flex items-center justify-center">
              <span v-if="value === item.value" class="icon-[lucide--check]" />
            </div>
            <div
              class="w-3.5 h-3.5 rounded-full border border-2"
              :style="{ borderColor: `${item?.color}`, backgroundColor: `${item?.color}10` }"
            />
            <div class="leading-none space-y-1">
              <div>{{ item.label }}</div>
              <div class="text-xs text-gray-400">
                {{ item.desc }}
              </div>
            </div>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
