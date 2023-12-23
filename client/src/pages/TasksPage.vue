<script setup>
import { computed, onMounted, ref } from "vue";

import Tasks from "../components/tasks/Tasks.vue";
import NewTask from "../components/tasks/NewTask.vue";

import { useTaskStore } from "../stores/task";
import { storeToRefs } from "pinia";

const store = useTaskStore();
const { completedTasks, uncompletedTasks } = storeToRefs(store);
const { fetchAllTasks } = store;




onMounted(async () => {
  await fetchAllTasks();
});

const showToggleCompleteBtn = computed(
  () => uncompletedTasks.value.length > 0 && completedTasks.value.length > 0
);

const completedTaskIsVisible = computed(
  () => uncompletedTasks.value.length === 0 || completedTasks.value.length > 0
);

const showCompletedTasks = ref(false || completedTaskIsVisible.value);
</script>
<template>
  <div>
    <NewTask />
    <div class="flex justify-end">
      <div class="text-center my-4" v-if="showToggleCompleteBtn">
        <button
          @click="($event) => (showCompletedTasks = !showCompletedTasks)"
          class="bg-green-500 rounded p-4 text-white"
        >
          <span v-if="!showCompletedTasks">Show completed</span>
          <span v-else>Hide completed</span>
        </button>
      </div>
    </div>

    <div class="flex justify-center">
      <Tasks :tasks="uncompletedTasks" />
      <Tasks
        :tasks="completedTasks"
        :show="completedTaskIsVisible && showCompletedTasks"
      />
    </div>
  </div>
</template>