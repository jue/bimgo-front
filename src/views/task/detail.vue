<script setup>
function testService() {
  return http.post('/user/info')
}

function getUser() {
  return http.post('/user/info')
}

const { data, loading, error, run, cancel } = useRequest(testService, {
  loadingDelay: 4000,
  loadingKeep: 5000,
  pollingInterval: 1000,
  onSuccess: (data) => {
    setTimeout(() => {
      cancel()
    }, 5000)
  },
})
</script>

<template>
  <pre>
    <div>
      {{ loading }}
    </div>
    <div>
      {{ error }}
    </div>
    <div v-if="data">
      Hey! {{ data }}
    </div>
  </pre>
</template>
