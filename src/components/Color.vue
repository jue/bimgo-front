<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

const colors = reactive([
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#9e9e9e',
  '#607d8b',
])

function setColor(val) {
  value.value = val
  emit('update:modelValue', val)
}
</script>

<template>
  <div class="grid gap-2 grid-cols-9 grid-rows-2">
    <div
      v-for="color in colors" :key="color" class="p-[1px] rounded-full w-8 h-8 cursor-pointer"
      :class="{ 'ring ring-2 ring-blue-500': value === color }" @click="setColor(color)"
    >
      <div
        :style="{ 'background-color': color }"
        class="h-full w-full rounded-full text-xs flex items-center justify-center text-white"
      >
        {{ text.slice(0, 2) }}
      </div>
    </div>
  </div>
</template>
