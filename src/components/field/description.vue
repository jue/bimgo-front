<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: () => {},
  },
  cate: {
    type: String,
    default: 'task',
  },
})

const emit = defineEmits(['update:modelValue'])

const apiUpdateUrl = computed(() => {
  if (props.cate === 'task')
    return '/task/update/description'
  if (props.cate === 'issue')
    return '/issue/update/description'
})
// const editorConfig = {
//   placeholder: '添加描述',
//   scroll: true,
//   autoFocus: false,
//   MENU_CONF: {
//     uploadImage: {
//       // maxFileSize: 5 * 1024 * 1024,
//       // allowedFileTypes: ['image/*']
//       async customUpload(file, insertFn) {
//         const params = new FormData()
//         params.append('file', file)
//         const res = await http.post(
//           // 'http://localhost:8787/upload_img',
//           'https://img.nipao.com/upload_img',
//           params,
//         )
//         insertFn(res.data.data.file_url)
//       },
//     },
//   },
// }

const value = ref(props.modelValue)
watch(() => props.modelValue, (val) => {
  value.value = val
})

// 保存数据
async function saveData() {
  const { data: res } = await http.post(apiUpdateUrl.value, {
    description: value.value,
    gid: props.data.gid,
  })
  if (res.code === 200)
    emit('update:modelValue', value.value)
  else
    value.value = props.modelValue
}

// 编辑器
const editorRef = shallowRef()

const toolbarConfig = {
  toolbarKeys: [
    'fontSize',
    'bold',
    'italic',
    'underline',
    'through',
    'color',
    'bgColor',

    'uploadImage',
    'color',
    'bgColor',
    'blockquote',

    {
      key: 'italic', // 必填，要以 group 开头
      title: '左对齐', // 必填
      iconSvg:
          '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>', // 可选
      menuKeys: [
        'justifyLeft',
        'justifyRight',
        'justifyCenter',
        'justifyJustify',
      ],
    },
    'insertTable',
    'divider',
    'bulletedList',
    'numberedList',
  ],
}

const editorConfig = {
  placeholder: '添加描述',
  scroll: true,

  MENU_CONF: {
    uploadImage: {
      // maxFileSize: 5 * 1024 * 1024,
      // allowedFileTypes: ['image/*']
      async customUpload(file, insertFn) {
        const params = new FormData()
        params.append('file', file)
        const res = await http.post(
          'https://img.nipao.com/upload',
          params,
        )
        insertFn(`https://img.nipao.com${res.data[0]?.src}`)
      },
    },
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null)
    return
  editor.destroy()
})

function handleCreated(editor) {
  editorRef.value = editor // 记录 editor 实例，重要！
}

onMounted(() => {
  if (value.value)
    editorRef.value?.setHtml(value.value)
})

function handleBlur() {
  saveData()
}
</script>

<template>
  <div class="np-editor">
    <Toolbar
      :editor="editorRef"
      :default-config="toolbarConfig"
      mode="simple"
    />
    <Editor
      v-model="value"
      :default-config="editorConfig"
      :mode="mode"
      @on-created="handleCreated"
      @on-blur="handleBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.np-editor{
  :deep {
    .w-e-bar {
      @apply bg-[#f7f7f7] rounded-lg;
    }
    .w-e-bar-item{
      @apply h-9 px-0.5;

      button {
        @apply h-7 px-0.5 min-w-7;
        &:hover {
          @apply bg-gray-200;
        }
      }
    }

    .w-e-panel-content-color .clear{
      @apply flex items-center;
    }

    .w-e-bar-item-menus-container{
      @apply mt-9;
      .w-e-bar-item {
        @apply justify-start px-2
      }
    }

    .w-e-select-list{
      @apply mt-9;
    }

    .w-e-text-placeholder {
      @apply not-italic;
    }
  }
}
</style>
