<template>
  <section class="bg-gray-800 h-screen py-20 lg:py-[120px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div
          class="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <div>
            <h3
              class="text-4xl font-medium leading-tight text-primary text-left"
            >
              Forgot Password
            </h3>
            <h5 class="mb-6 text-left">
              Send a password reset link to your email
            </h5>
            <div v-if="errors">
              <ul class="text-red-500 text-sm text-left my-5">
                <li>{{ errors }}</li>
              </ul>
            </div>
            <div v-if="successMessage">
              <ul class="text-green-500 text-sm text-left my-5">
                <li>{{ successMessage }}</li>
              </ul>
            </div>

            <input
              autocomplete="on"
              v-model="email"
              required
              type="email"
              placeholder="Enter your email"
              class="border-[#E9EDF4] w-full mb-10 rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              :disabled="loading"
            />
            <button
              @click="resetPassword(email)"
              class="w-full px-4 py-3 hover:bg-blue-600 rounded-md text-white "             
               :disabled="loading"
              :class="[
                   loading
                      ? 'bg-blue-600'
                      : 'bg-gray-800',
                  ]"
            >
            <div v-if="loading" class="flex justify-center">
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
                  <div v-else>Reset password</div>
            </button>
            <router-link
              to="/login"
              class=" pt-7 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
            >
              Back to Login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {  ref , onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useAuthStore();

const { errors, successMessage } = storeToRefs(store);
const { handleForgotPassword } = store;

onMounted(() => {errors.value = null; successMessage.value = null });

const email = ref("");

const loading = ref(false);
const resetPassword = async (email) => {
  loading.value = true;
  await handleForgotPassword(email);
  loading.value = false;
};
</script>


