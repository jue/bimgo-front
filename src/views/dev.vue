<script setup>
const value = ref(null)
async function getContractorDetail() {
  const { data: res } = await http.post('/contractor/list', {
    contractor_id: '13d02a90-b85c-471f-b3c1-9f58d5f9c089',
  })

  value.value = res.data
}
onMounted(() => {
  getContractorDetail()
})
</script>

<template>
  <pre>
    {{ value }}
  </pre>
</template>
