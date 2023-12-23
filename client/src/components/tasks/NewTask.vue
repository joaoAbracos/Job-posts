<template>
  <div class="max-w-lg mx-auto mt-12">
    <input
      @keydown.enter="addNewTask"
      placeholder="Write a Task and hit ENTER "
      class="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
    />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useTaskStore } from "../../stores/task";

const store = useTaskStore();
const { handleAddedTask } = store;

const newTask = reactive({
  name: "",
  is_completed: false,
});

const addNewTask = async (event) => {
  if (event.target.value.trim()) {
    newTask.name = event.target.value;
    event.target.value = "";
    await handleAddedTask(newTask);
  }
};
</script>