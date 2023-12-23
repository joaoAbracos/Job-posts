<template>
  <div class="flex items-center justify-center h-12">
    <input 
      v-model="searchText"
      class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
      name="search" 
      placeholder="Search Jobs"
    >
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const searchText = ref('');

    return {
      searchText
    };
  }
};
</script>