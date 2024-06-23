<script setup>
import { ref } from 'vue'

const selectedCities = ref([])
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
</script>

<template>
  <div class="flex justify-center p-5 rounded-lg mt-10">
    <MultiSelect
      v-model="selectedCities"
      display="chip"
      :options="cities"
      option-label="name"
      filter
      placeholder="Select CitiesSelect CitiesSelect CitiesSelect CitiesSelect CitiesSelect Cities"
      :max-selected-labels="3"
      class="w-full md:w-80 "
      :pt="{
        root: ({ props, state }) => ({
          class: ['inline-flex bg-white border rounded-md items-center justify-between px-2 py-2 leading-none cursor-pointer'],
        }),
        labelcontainer: {
          class: ['overflow-hidden'],
        },
        label: ({ props }) => ({
          class: ['truncate flex items-center space-x-1'],
        }),
        dropdownicon: {
          class: ['text-gray-400'],
        },
      }"
    />
  </div>
</template>
