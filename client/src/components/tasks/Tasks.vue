<template>
  <div v-if="tasks.length && show" class="p-10 bg-blue-600 rounded">
    <ul>
      <Task
        @updated="handleUpdatedTask"
        @completed="handleCompletedTask"
        @removed="handleRemovedTask"
        v-for="task in tasks"
        :task="task"
        :key="task.id"
      />
    </ul>
  </div>
</template>

<script setup>
import { useTaskStore } from "../../stores/task";
import Task from "./Task.vue";

const store = useTaskStore();
const { handleUpdatedTask, handleCompletedTask, handleRemovedTask } = store

defineProps({
  tasks: Array,
  show: {
    type: Boolean,
    default: true,
  },
});
</script>