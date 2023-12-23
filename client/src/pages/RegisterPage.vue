<template>
  <section class="bg-gray-800 h-screen py-20 lg:py-[120px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap justify-center">
        <div
          class="relative w-[500px] max-w-[500px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <h3 class="mb-2 mt-0 text-3xl font-medium leading-tight text-primary">
            Create Account
          </h3>
          <div class="flex text-red-500 flex-col py-5" v-if="errors">
            <span>{{ errors?.name ? errors.name[0] : "" }}</span>
            <span>{{ errors?.email ? errors.email[0] : "" }}</span>
            <span>{{ errors?.password ? errors.password[0] : "" }}</span>
          </div>
          <div class="full-w mb-3 space-x-2">
            <button
              @click="form.role = 1"
              :class="[form.role === 1 ? 'bg-blue-600 text-white' : '']"
              class="w-24 hover:text-white hover:bg-blue-600 rounded-md p-2 border border-blue-600"
            >
              Person
            </button>
            <button
              @click="form.role = 2"
              :class="[form.role === 2 ? 'bg-blue-600 text-white' : '']"
              class="w-24 hover:text-white hover:bg-blue-600 rounded-md p-2 border border-blue-600"
            >
              Company
            </button>
          </div>
          <form @submit.prevent="handleSubmit">
            <div class="mb-6">
              <input
                type="text"
                placeholder="Name"
                v-model="form.name"
                @input="errors ? errors.name = null : '' "
                required
                :class="[
                  errors && errors?.name
                    ? 'border-red-500 placeholder-red-500 '
                    : '',
                ]"
                class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
             
            </div>
            <div class="mb-6">
              <input
                type="email"
                required
                placeholder="Email"
                v-model="form.email"
                @input="errors ? errors.email = null : '' "
                :class="[
                  errors && errors?.email
                    ? 'border-red-500 placeholder-red-500 '
                    : '',
                ]"
                class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
              
            </div>
            <div class="mb-6">
              <input
              required
                v-model="form.password"
                :class="[
                  errors && errors?.password
                    ? 'border-red-500 placeholder-red-500 '
                    : '',
                ]"
                type="password"
                placeholder="Password"
                class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
             
            </div>

            <div class="mb-6">
              <input
              required
                type="password"
                v-model="form.password_confirmation"
                placeholder="Password Confirmation"
                class="bordder-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-10">
              <button
                :disabled="loading"
                :class="[loading ? 'bg-blue-600' : 'bg-gray-800']"
                type="submit"
                id="submit-button"
                class="w-full px-4 py-3 hover:bg-blue-600 rounded-md text-white"
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
                <div v-else>Register</div>
              </button>
            </div>
          </form>

          <p class="text-base text-[#adadad]">
            <router-link to="/login" class="text-primary hover:underline">
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useAuthStore();

const { hasProfile, errors, role , isLoggedIn } = storeToRefs(store);
const { handleRegister } = store;

const form = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  role: 1,
});
onMounted(() => (errors.value = null));

const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  await handleRegister(form);
  if (isLoggedIn.value) {
    if (role.value === "person") {
      router.push({ name: "profilePerson" });
    } else if (role.value === "company") {
      router.push({ name: "profileCompany" });
    }
  }
  loading.value = false;
};
</script>
