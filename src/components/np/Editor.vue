<script setup>
import '@wangeditor/editor/dist/css/style.css'

// 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emits = defineEmits(['update:modelValue'])

const mode = 'default'
const editorRef = shallowRef()
const valueHtml = ref('')
const toolbarConfig = {
  toolbarKeys: [
    'undo',
    'redo',
    '|',
    'clearStyle',
    'fontSize',
    'lineHeight',
    'bold',
    'italic',
    'underline',
    'through',
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
    'indent',
    'delIndent',
    'enter',
    'bulletedList',
    'numberedList',
    'insertTable',
    {
      key: 'group-image', // 必填，要以 group 开头
      title: '图片', // 必填
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M959.877 128l0.123 0.123v767.775l-0.123 0.122H64.102l-0.122-0.122V128.123l0.122-0.123h895.775zM960 64H64C28.795 64 0 92.795 0 128v768c0 35.205 28.795 64 64 64h896c35.205 0 64-28.795 64-64V128c0-35.205-28.795-64-64-64zM832 288.01c0 53.023-42.988 96.01-96.01 96.01s-96.01-42.987-96.01-96.01S682.967 192 735.99 192 832 234.988 832 288.01zM896 832H128V704l224.01-384 256 320h64l224.01-192z"></path></svg>', // 可选
      menuKeys: ['insertImage', 'uploadImage'],
    },
    // {
    //   key: 'group-video', // 必填，要以 group 开头
    //   title: '视频', // 必填
    //   iconSvg: '<svg viewBox="0 0 1024 1024"><path d="M981.184 160.096C837.568 139.456 678.848 128 512 128S186.432 139.456 42.816 160.096C15.296 267.808 0 386.848 0 512s15.264 244.16 42.816 351.904C186.464 884.544 345.152 896 512 896s325.568-11.456 469.184-32.096C1008.704 756.192 1024 637.152 1024 512s-15.264-244.16-42.816-351.904zM384 704V320l320 192-320 192z"></path></svg>', // 可选
    //   menuKeys: ['insertVideo', 'uploadVideo']
    // },
    'divider',
    'insertLink',
  ],
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      // maxFileSize: 5 * 1024 * 1024,
      // allowedFileTypes: ['image/*']
      async customUpload(file, insertFn) {
        const params = new FormData()
        params.append('file', file)
        const res = await http.post(
          'https://api.nipao.com/api/upload/telegra',
          params,
        )
        insertFn(res.data.url)
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

watchEffect(() => {
  if (props.modelValue)
    valueHtml.value = props.modelValue
})

function handleCreated(editor) {
  editorRef.value = editor
  valueHtml.value = props.modelValue
  // emits('update:modelValue', editor)
}
function handleChange() {
  const reg = /\<p\>\<br\>\<\/p\>/g
  valueHtml.value = valueHtml.value.replace(reg, '')
  emits('update:modelValue', valueHtml.value)
}
</script>

<template>
  <div class="editor-container border rounded-lg w-full py-1">
    <Toolbar class="border-b" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="valueHtml" style="height: 500px; overflow-y: hidden" :default-config="editorConfig" :mode="mode"
      @on-created="handleCreated" @on-change="handleChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.editor-container {

  :deep {
    .w-e-bar-show {
      @apply items-center;
    }
    .w-e-bar-divider {
      @apply h-5;
    }
    .w-e-bar-item {
      @apply h-8;
      button {
        @apply min-w-8;
      }

    }
    .w-e-text-container [data-slate-editor] {
      border: none;

      p {
        padding: 5px 0;
        margin: 0;
      }
    }

    .w-e-text-placeholder {
      top: 1px;
      left: 10px;
    }
  }
}
</style>
