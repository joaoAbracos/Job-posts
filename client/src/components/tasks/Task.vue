<template>
  <li class="bg-white my-3 p-5 rounded max-w-[545px]">
    <div class="flex items-center">
      <input
        :checked="task.is_completed"
        id="checked-checkbox"
        type="checkbox"
        @change="markTaskAsCompleted"
        class="mr-5 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <div
        @dblclick="($event) => (isEdit = true)"
        class="flex w-full justify-between"
      >
        <div class="relative align-middle place-self-center" v-if="isEdit">
          <input
            type="text"
            v-focus
            v-model="editingTask"
            @keyup.enter="updateTask"
            @keyup.esc="undo"
            class="p-1 w-full border-b-2 border-blue-600 focus:ring-blue-500"
          />
        </div>

        <span
          v-else
          :class="completeClass"
          class="w-10/12 font-medium text-sm self-center"
          >{{ task.name }}</span
        >
        <TaskActions
          @remove="removeTask"
          @edit="($event) => (isEdit = true)"
          v-show="!isEdit"
        />
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed, ref } from "vue";
import TaskActions from "./TaskActions.vue";

const props = defineProps({
  task: Object,
});

const emit = defineEmits(["updated", "completed", "removed"]);

const isEdit = ref(false);
const editingTask = ref(props.name);

const completeClass = computed(() =>
  props.task.is_completed ? "completed" : ""
);

const vFocus = {
  mounted: (el) => el.focus(),
};

const updateTask = (event) => {
  const updatedTask = { ...props.task, name: event.target.value };
  isEdit.value = false;
  emit("updated", updatedTask);
};
const undo = () => {
  isEdit = false;
  editingTask.value = props.name.value;
};
const markTaskAsCompleted = () => {
  const updatedTask = { ...props.task, is_completed: !props.task.is_completed };
  emit("completed", updatedTask);
};
const removeTask = () => {
  if (confirm("Are you sure")) {
    emit("removed", props.task);
  }
};
</script>