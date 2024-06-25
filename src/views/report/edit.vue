<script setup>
const form = ref({
  name: '',
  type: 'daily',
  content: '',
})

const types = reactive([
  { label: '日报', value: 'daily' },
  { label: '周报', value: 'weekly' },
  { label: '月报', value: 'monthly' },
])

const rules = reactive({
  name: [{ required: true, message: '请输入报告名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择报告类型', trigger: 'change' }],
})

const formRef = ref(null)
</script>

<template>
  <div class="h-full flex flex-col max-w-[750px]">
    <div class="flex items-center justify-between box-shadow-bottom h-12 px-5">
      <div class="font-bold">
        编辑报告
      </div>
      <Button label="返回" outlined />
    </div>
    <ScrollPanel class="flex-1">
      <div class="py-5">
        <el-form ref="formRef" :model="form" label-width="100px" :rules="rules">
          <el-form-item label="报告名称" props="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="报告类型">
            <el-radio-group v-model="form.type" props="type">
              <el-radio
                v-for="item in types"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="报告简述">
            <el-input
              v-model="form.content" type="textarea" :autosize="{
                minRows: 8,
                maxRows: 15,
              }"
            />
          </el-form-item>
        </el-form>
      </div>
    </scrollpanel>
    <div class="flex items-center justify-between box-shadow-top h-12 px-5">
      <div />
      <div class="">
        <el-button>
          返回
        </el-button>
        <el-button type="primary">
          提交
        </el-button>
      </div>
    </div>
  </div>
</template>
