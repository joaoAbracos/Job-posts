<template>
  <section class="bg-gray-800 h-full py-20 lg:py-[120px]">
    <div class="">
      <div class="flex flex-wrap justify-center">
        <div v-if="!errors.value"
          class="relative w-[500px] max-w-[500px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <h3 class="mb-2 mt-0 text-3xl font-medium leading-tight text-primary">
            Email is confirmed, Thank you !
          </h3>
          <h5 class="mb-8">Enjoy</h5>
          <router-link
            to="/post"
            class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Post
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
          </router-link>
        </div>
        <div v-else
          class="relative w-[500px] max-w-[500px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
    </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useAuthStore();
const route = useRoute();
const { profile, loading, posts } = storeToRefs(store);
const { handleEmailVerification } = store;

onMounted(async () => {
  await handleEmailVerification(route.params.id, route.params.token);
});
</script>