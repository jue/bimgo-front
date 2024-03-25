<script>
import * as icons from 'lucide-vue-next'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      const name = this.name.split('-').map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }).join('')
      return icons[name]
    },
  },
}
</script>

<template>
  <component :is="icon" />
</template>
