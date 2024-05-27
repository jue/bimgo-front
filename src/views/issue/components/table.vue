<script setup>
import TableHeader from './tableHeader.vue'
import TableRow from './tableRow.vue'

const { issue_columns_v2 } = storeToRefs(useUserStore())
const { payload, issues } = storeToRefs(useIssueStore())
</script>

<template>
  <div class="w-fit flex flex-col relative min-w-full">
    <TableHeader />

    <TableRow :tasks="issues" />

    <!-- <ScrollPanel class="flex-1 bg-red-400">
      <div>dddddd</div>
      <pre>{{ issue_columns_v2 }}</pre>
    </ScrollPanel> -->
    <!-- <pre>{{ issues }}</pre> -->
  </div>
</template>
