<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  group: {
    type: Object,
    default: () => {},
  },
  cate: {
    type: String,
    default: 'task',
  },
})
</script>

<template>
  <FieldStatusValue v-if="group.lable === 'status'" :value="group.value" :cate="cate" />
  <FieldPriorityValue v-else-if="group.lable === 'priority'" :value="group.value" :cate="cate" />
  <template v-else-if="group.lable === 'uid'">
    <div>
      <User :uid="group.value" />
    </div>
  </template>
  <template v-else-if="['created_at', 'end_time', 'done_time'].includes(group.lable)">
    {{ group.value ? dayjs(group.value).format('YYYY-MM-DD') : '没有日期' }}
  </template>
  <div v-else>
    {{ group.lable }}: {{ group.value }}
  </div>
</template>
