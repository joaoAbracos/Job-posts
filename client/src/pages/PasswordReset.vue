<template>
  <section class="bg-gray-800 h-screen py-20 lg:py-[120px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
          <div
            class="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
          >
            <h3
              class="text-4xl font-medium leading-tight text-primary text-left"
            >
              Reset Password
            </h3>
            <h5 class="mb-4 text-left">Set your new password</h5>
            <div class="flex text-red-500 flex-col py-5" v-if="errors">
              <span>{{ errors ? errors : '' }}</span>
            </div>
            <div v-if="successMessage">
              <ul class="text-green-500 text-sm text-left my-5">
                <li>
                  {{ successMessage }}
                </li>
              </ul>
              <router-link
                to="/login"
                class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Go to Login
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
            <div v-else>
              <form @submit.prevent="submitForm">
                <input
                  type="email"
                  name="email"
                  v-model="email"
                  disabled
                  class="border-[#E9EDF4] mb-6 w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <input
                  type="password"
                  name="password"
                  v-model="form.password"
                  placeholder="Password"
                  class="border-[#E9EDF4]  mb-6 w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  :class="[
                    errors 
                      ? 'border-red-500 placeholder-red-500 '
                      : '',
                  ]"
                  />
                <input
                  type="password"
                  v-model="form.password_confirmation"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  class="border-[#E9EDF4] mb-6 w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  :class="[
                    errors
                      ? 'border-red-500 placeholder-red-500 '
                      : '',
                  ]"
                  />
                <button
                  :disabled="loading"
                  :class="[
                   loading
                      ? 'bg-blue-600'
                      : 'bg-gray-800',
                  ]"
                  type="submit"
                  class="w-full px-4 py-3 hover:bg-blue-600 rounded-md text-white "
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
                  <div v-else>Submit</div>
                </button>
              </form>
            </div>
          </div>
        </div>
    </div>
  </section>
</template>
<script setup>
import { reactive, ref ,onMounted} from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const route = useRoute();
const store = useAuthStore();

const { errors, successMessage } = storeToRefs(store);
const { handleResetPassword } = store;

const email = ref(route.query.email);

onMounted(() => (errors.value = null));

const loading = ref(false);

const form = reactive({
  email: route.query.email,
  token: route.params.id,
  password: "",
  password_confirmation: "",
});
const submitForm = async () => {
  loading.value = true;
  await handleResetPassword(form);
  loading.value = false;
};
</script>