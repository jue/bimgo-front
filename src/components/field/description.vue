<script setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

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

const mode = 'simple'
const editorRef = shallowRef()

const valueHtml = ref('')
watch(() => props.modelValue, () => {
  valueHtml.value = props.modelValue
})
const toolbarConfig = {
  toolbarKeys: [
    // 'headerSelect',
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
    // 'clearStyle',
    'divider',
    'bulletedList',
    'numberedList',
    // 'insertLink',
    // 'unLink',
    // '|',
    // 'fullScreen',
  ],

  // toolbarKeys: [
  //   'undo',
  //   'redo',
  //   '|',
  //   'clearStyle',
  //   'fontSize',
  //   'lineHeight',
  //   'bold',
  //   'italic',
  //   'underline',
  //   'through',
  //   'color',
  //   'bgColor',
  //   'blockquote',
  //   {
  //     key: 'italic', // 必填，要以 group 开头
  //     title: '左对齐', // 必填
  //     iconSvg:
  //       '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>', // 可选
  //     menuKeys: [
  //       'justifyLeft',
  //       'justifyRight',
  //       'justifyCenter',
  //       'justifyJustify',
  //     ],
  //   },
  //   'indent',
  //   'delIndent',
  //   'enter',
  //   'bulletedList',
  //   'numberedList',
  //   'insertTable',
  //   {
  //     key: 'group-image', // 必填，要以 group 开头
  //     title: '图片', // 必填
  //     iconSvg:
  //       '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>', // 可选
  //     menuKeys: ['insertImage', 'uploadImage'],
  //   },
  //   // {
  //   //   key: 'group-video', // 必填，要以 group 开头
  //   //   title: '视频', // 必填
  //   //   iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>', // 可选
  //   //   menuKeys: ['insertVideo', 'uploadVideo']
  //   // },
  //   'divider',
  //   'insertLink',
  // ],
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
          // 'http://localhost:8787/upload_img',
          'https://img.nipao.com/upload_img',
          params,
        )
        insertFn(res.data.data.file_url)
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
  editorRef.value = editor
  valueHtml.value = props.modelValue
  // emit('update:modelValue', editor)
}
function handleChange() {
  // console.log(editorRef.value.getAllMenuKeys())

  const reg = /\<p\>\<br\>\<\/p\>/g
  valueHtml.value = valueHtml.value.replace(reg, '')
  // emit('update:modelValue', valueHtml.value)
}

const isFocus = ref(false)

function setFocus() {
  isFocus.value = true
  editorRef.value.focus()
}

function handleFocus() {
  isFocus.value = true
}

function handleBlur() {
  isFocus.value = false
  saveData()
}

async function saveData() {
  const { data: res } = await http.post(apiUpdateUrl.value, {
    description: valueHtml.value,
    gid: props.data.gid,
  })
  if (res.code === 200)
    emit('update:modelValue', valueHtml.value)
  else
    valueHtml.value = props.modelValue
}

// function handlePaste(editor, event, callback) {
//   console.log('ClipboardEvent 粘贴事件对象', event)
//   // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
//   // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
//   // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

//   // 自定义插入内容
//   editor.insertText('xxx')

//   // 返回 false ，阻止默认粘贴行为
//   event.preventDefault()
//   callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

//   // 返回 true ，继续默认的粘贴行为
//   // callback(true)
// }
</script>

<template>
  <div class="np-editor rounded w-full" @click="setFocus">
    <Toolbar :editor="editorRef" :default-config="toolbarConfig" :mode="mode" class="rounded-t px-0.5 bg-[#f7f7f7] opacity-0" :class="{ 'opacity-100': isFocus }" />
    <Editor
      v-model="valueHtml" class="min-h-40 max-h-[500px] overflow-y-auto cursor-text" :default-config="editorConfig"
      :mode="mode" @on-created="handleCreated" @on-change="handleChange" @on-focus="handleFocus"
      @on-blur="handleBlur"
    />
  </div>
</template>

<style lang="scss" scoped>
.np-editor{
  :deep {
    .w-e-bar {
      @apply bg-[#f7f7f7];
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
