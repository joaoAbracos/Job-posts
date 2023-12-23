<template>
  <div class="flex flex-col justify-around">
    <button @click="$event => emit('edit')" class="font-medium text-sm text-white p-1 bg-yellow-400 rounded">
      <IconPencil />
    </button>
    <button @click="$event => emit('remove')" class="font-medium text-sm text-white p-1 bg-red-400 rounded">
      <IconTrash />
    </button>
  </div>
</template>

<script setup>
import IconPencil from '../icons/iconPencil.vue'
import IconTrash from '../icons/iconTrash.vue'

const emit = defineEmits(['edit','remove'])
</script>