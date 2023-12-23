<template>
  <section class="bg-gray-800 h-full py-20 lg:py-[120px]">
    <div class="">
      <div class="flex flex-wrap justify-center">
        <div
          class="relative w-[500px] max-w-[500px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <h3 class="mb-2 mt-0 text-3xl font-medium leading-tight text-primary">
            Please verify your email, please !
          </h3>
          <h5 class="mb-8">Safety first</h5>

          <button
          :disabled="loading"
            @click="submitBtn"
            class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send Verification Email

            <div v-if="loading">
              <svg
                class="animate-spin h-5 w-5 mr-3 text-center"
                viewBox="0 0 24 24"
              >
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
            <div v-else>
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
            </div>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useAuthStore();

const { errors, successMessage } = storeToRefs(store);
const { handleEmailNotification } = store;

const loading = ref(false);

const submitBtn = async () => {
  loading.value = true;
  await handleEmailNotification();
  loading.value = false;
};
</script>