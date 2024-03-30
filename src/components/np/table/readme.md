以下是 README.md 文件的 Markdown 源码:

# NpTable 组件

NpTable 是一个基于 Vue 3 的表格组件，提供了灵活的自定义功能和良好的性能。

## 特性

- 支持自定义表头和单元格内容
- 支持边框样式
- 支持序号列
- 支持树形数据展示 (开发中)

## 安装

```bash
npm install np-table
```

## 使用

在 Vue 组件中引入 NpTable 组件:

```vue
<script>
import NpTable from 'np-table'

export default {
  components: {
    NpTable,
  },
  data() {
    return {
      columns: [
        { label: '姓名', value: 'name' },
        { label: '年龄', value: 'age' },
        // ...
      ],
      rows: [
        { name: '小明', age: 20 },
        { name: '小红', age: 18 },
        // ...
      ],
    }
  },
}
</script>

<template>
  <NpTable :columns="columns" :rows="rows" />
</template>
```

### 属性

| 属性名   | 类型    | 默认值 | 说明                           |
|----------|---------|--------|--------------------------------|
| columns  | Array   | []     | 列配置数组                     |
| rows     | Array   | []     | 行数据                         |
| size     | Number  | 40     | 表格行高                       |
| border   | Boolean | false  | 是否显示边框                   |
| id       | Boolean | false  | 是否显示序号列                 |
| tree     | Boolean | false  | 是否为树形数据 (开发中)        |
| options  | Object  | { label: 'label', value: 'value' }    | 数据配置项  |

### 插槽

#### 全局插槽

| 插槽名称  | 说明                 | 参数                        |
|-----------|----------------------|-----------------------------|
| id-th     | 自定义序号列表头     | -                           |
| empty     | 自定义空数据提示     | -                           |
| id-td     | 自定义序号列单元格   | column, row, index          |

#### 作用域插槽

| 插槽名称  | 说明                 | 参数                        |
|-----------|----------------------|-----------------------------|
| {value}-header | 自定义列表头    | -                           |
| {value}-data   | 自定义单元格    | column, row, index          |

## 开发计划

- [ ] 支持树形数据展示
- [ ] 支持固定列和固定表头
- [ ] 支持排序、过滤等高级功能

欢迎提出更多建议和需求!
