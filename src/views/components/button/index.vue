<script setup>
import Button from 'primevue/button'

const items = ref([
  {
    label: '查看详细信息',
    icon: '',
    command: () => {
      handleOpenPanel(props.data.gid)
    },
  },
  {
    label: '新窗口打开',
    icon: 'icon-[lucide--external-link]',
    command: () => {
      window.open(`/task/detail?gid=${props.data.gid}`)
    },
  },
  {
    label: '复制链接',
    icon: 'icon-[lucide--copy]',
  },
  {
    divider: true,
    label: '收藏',
    icon: 'icon-[lucide--star]',
  },
  {
    label: '添加子任务',
    icon: 'icon-[lucide--circle-plus]',
    command: () => {
      addNew(props.data)
    },
  },
  {
    divider: true,
    label: '重命名',
    icon: 'icon-[lucide--edit]',
    command: () => {
      editInput()
    },
  },
  {
    danger: true,
    label: '删除',
    icon: 'icon-[lucide--trash]',
    command: () => {
      console.log('删除')
    },
  },
])
const menuRef = ref(null)
function toggle(event) {
  menuRef.value.toggle(event)
}
</script>

<template>
  <div class="space-y-4">
    <div class="space-x-2">
      <Button label="Primary" />
      <Button label="Secondary" severity="secondary" />
      <Button label="Success" severity="success" />
      <Button label="Info" severity="info" />
      <Button label="Warning" severity="warning" />
      <Button label="Help" severity="help" />
      <Button label="Danger" severity="danger" />
      <Button label="Contrast" severity="contrast" />
    </div>
  </div>

  <div class="space-x-5 space-y-5 p-5">
    <h1>Button</h1>
    <div class="space-y-5 space-x-5">
      <div>Basic</div>
      <Button label="Basic" size="small" />
      <Button label="Basic" />
      <Button label="large" size="large" />
    </div>

    <div class="space-y-5">
      <div>Severity</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" />
        <Button label="Secondary" severity="secondary" />
        <Button label="success" severity="success" />
        <Button label="danger" severity="danger" />
        <Button label="danger" severity="contrast" />
      </div>
    </div>

    <div class="space-y-5">
      <div>Rounded</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" rounded />
        <Button label="Secondary" severity="secondary" rounded />
        <Button label="success" severity="success" rounded />
        <Button label="danger" severity="danger" rounded />
      </div>
    </div>

    <div class="space-y-5">
      <div>Text</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" text />
        <Button label="Secondary" severity="secondary" text />
        <Button label="success" severity="success" text />
        <Button label="danger" severity="danger" text />
        <Button label="severity" severity="contrast" text />
      </div>
    </div>

    <div class="space-y-5">
      <div>Outlined</div>
      <div class="space-x-5 space-y-5">
        <Button label="Primary" outlined />
        <Button label="Secondary" severity="secondary" outlined />
        <Button label="success" severity="success" outlined />
        <Button label="danger" severity="danger" outlined />
      </div>
    </div>

    <div class="space-y-5">
      <div>
        Icon Only
      </div>
      <div class="space-x-5 space-y-5">
        <Button icon="icon-[lucide--check]" outlined />
        <Button icon="icon-[lucide--check]" severity="secondary" outlined />
        <Button icon="icon-[lucide--check]" severity="success" outlined />
        <Button icon="icon-[lucide--check]" severity="danger" outlined />
      </div>
      <div class="space-x-5 space-y-5">
        <Button icon="icon-[lucide--check]" />
        <Button icon="icon-[lucide--check]" severity="secondary" />
        <Button icon="icon-[lucide--check]" severity="success" />
        <Button icon="icon-[lucide--check]" severity="danger" />
      </div>
      <div class="space-x-5 space-y-5">
        <Button icon="icon-[lucide--check]" rounded />
        <Button icon="icon-[lucide--check]" severity="secondary" rounded />
        <Button icon="icon-[lucide--check]" severity="success" rounded />
        <Button icon="icon-[lucide--check]" severity="danger" rounded />
      </div>
    </div>

    <div class="space-y-5">
      <div>Sizes</div>
      <div class="space-x-5 space-y-5">
        <Button label="small" size="small" icon="icon-[lucide--check]" />
        <Button label="无size" icon="icon-[lucide--check]" />
        <Button label="danger" size="large" icon="icon-[lucide--check]" />
      </div>
    </div>

    <!-- 结束 -->

    <div class="text-right">
      <Button icon="icon-[lucide--ellipsis]" size="small" text plain class="!text-gray-400" @click="toggle" />
      <Menu ref="menuRef" :model="items" popup>
        <template #item="{ item }">
          <np-menu-item :label="item.label" :icon="item.icon" :divider="item.divider" :danger="item.danger" />
        </template>
      </Menu>
    </div>
  </div>
</template>
