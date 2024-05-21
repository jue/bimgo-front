<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'input'])
const isChange = ref(true)

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  if (isChange.value)
    value.value = val
})

const textareaRef = ref(null)
function focus() {
  textareaRef.value.focus()
}

function blur() {
  textareaRef.value.blur()
}

function handleInput(e) {
  emit('input', e.target.innerHTML)
}

function handleFocus() {
  isChange.value = true
  emit('focus')
}

defineExpose({ focus, blur })
</script>

<template>
  <div
    ref="textareaRef"
    :placeholder="placeholder"
    contenteditable="true"
    @focus="handleFocus"
    @blur="emit('blur')"
    @input="handleInput"
    v-html="value"
  />
</template>

<style lang="scss" scoped>
div[contenteditable]:empty:not(:focus):before {
  content: attr(placeholder);
  color: #aaa ;
}
</style>
