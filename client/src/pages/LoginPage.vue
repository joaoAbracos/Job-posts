<template>
  <section class="bg-gray-800 h-screen py-20 lg:py-[40px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
          <div
            class="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
          >
            <h3
              class="text-4xl font-medium leading-tight text-primary"
              :class="[errors ? '' : 'mb-16']"
            >
              Welcome Back
            </h3>
            <div class="flex text-red-500 flex-col py-5" v-if="errors">
              <span>{{ errors?.email ? errors.email[0] : '' }}</span>
              <span>{{  errors?.password ? errors.password[0] : '' }}</span>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="mb-6">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="Email"
                  :class="[
                    errors && errors?.email
                      ? 'border-red-500 placeholder-red-500'
                      : '',
                  ]"
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  @keydown.enter.prevent="handleSubmit"
                  />
              </div>
              <div class="mb-6">
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="Password"
                  :class="[
                    errors && errors?.password
                      ? 'border-red-500 placeholder-red-500 '
                      : '',
                  ]"
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                  @keydown.enter.prevent="handleSubmit"
                />
              </div>

              <div class="mb-10">
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
                  <div v-else>Login</div>
                </button>
              </div>
            </form>
            <router-link
              to="/forgot-password"
              class="mb-2 inline-block text-base text-[#adadad] hover:text-primary hover:underline"
            >
              Forgot Password?
            </router-link>
            <p class="text-base text-[#adadad]">
              Not a member yet?
              <router-link to="/register" class="text-primary hover:underline">
                Sign Up
              </router-link>
            </p>
          </div>
        </div>
      </div>
  </section>
</template>

<script setup>
import { reactive, ref ,onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useAuthStore();

const { isLoggedIn, errors } = storeToRefs(store);
const { handleLogin } = store;

const form = reactive({
  email: "",
  password: "",
});

onMounted(() => (errors.value = null));

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  await handleLogin(form);
  loading.value = false;
  if (isLoggedIn.value) {
    router.push({ name: "home" });
  }
};
</script>