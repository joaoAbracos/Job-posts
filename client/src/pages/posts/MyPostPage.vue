<template>
  <div class="grid place-items-center h-screen w-full">
    <div v-if="!loading" class="grid grid-cols-3 gap-4 mt-8 mb-24">
      <div v-for="post in posts" :key="post.id" class="w-[300px] max-w-[300px]">
        <div
          class="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ post.title }}
            </h5>
          </a>
          <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <label for="location">Location:</label>
            <p class="text-white" id="location">{{ post.location }}</p>
          </div>
          <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <label for="apply_url">Apply URL:</label>
            <p class="text-white" id="apply_url">{{ post.apply_url }}</p>
          </div>
          <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <label for="compensation">Compensation:</label>
            <p class="text-white" id="compensation">
              {{ post.compensation }}
            </p>
          </div>
          <div class="flex gap-4" style="width: fit-content;">
            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <label for="created_at">Created:</label>
              <p class="text-white" id="created_at">{{ new Date(post.created_at).toLocaleDateString('en-US') }}</p>
            </div>
            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <label for="updated_at">Updated:</label>
              <p class="text-white" id="updated_at">{{ new Date(post.updated_at).toLocaleDateString('en-US') }}</p>
            </div>
          </div>
          <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <Skills :skills="post.skills" />
          </div>
          <div class="flex gap-4">
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
              <svg
                class="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center mt-24">
      <svg class="animate-spin h-5 w-5 mr-3 text-center" viewBox="0 0 24 24">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  </div>
</template>
<script setup>
import Skills from "../../components/posts/Skills.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useJobStore } from "../../stores/job";

const router = useRouter();

const store = useJobStore();

const { profile, loading, posts } = storeToRefs(store);
const { fetchAllUserPosts } = store;

onMounted(async () => {
  await fetchAllUserPosts();
});
</script>