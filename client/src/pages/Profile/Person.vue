<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "../../stores/profile";
import { useAuthStore } from "../../stores/auth";
import { storeToRefs } from "pinia";
import Datepicker from "vuejs3-datepicker";

const store = useProfileStore();
const router = useRouter();
const authStore = useAuthStore();

const { isLoggedIn, errors, hasProfile } = storeToRefs(authStore);
const { createPersonProfile } = store;

const form = reactive({
  name: "",
  lastname: "",
  birtday: new Date(),
  gender: "",
  country: "",
  region: "",
  ocupation: "",
  introduction: "",
  avatar: null,
  img_path: null,
});
const loading = ref(false);
const avatarInput = ref(null);

const handleProfile = async () => {
  loading.value = true;
  form.birtday = new Intl.DateTimeFormat("pt-PT").format(
    new Date(form.birtday.toISOString().split("T")[0])
  );
  const formData = new FormData();
  Object.keys(form).forEach((key) => {
    formData.append(key, form[key]);
  });
  await createPersonProfile(formData);
  loading.value = false;
  if (hasProfile.value) {
    router.push({ name: "home" });
  }
};

const updateExplanation = (content) => {
  form.introduction = content;
};

const openAvatarInput = () => {
  avatarInput.value.click();
};

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  form.avatar = file;
  form.img_path = URL.createObjectURL(file);
};
</script>
<template>
  <section class="bg-[#F4F7FF] py-20 lg:py-[120px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div
          class="relative mx-auto max-w-[725px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <h3 class="mb-4 mt-0 text-3xl font-medium leading-tight text-primary">
            Your Details
          </h3>

          <form @submit.prevent="handleProfile">
            <div class="mb-6 relative">
              <input
                @change="handleAvatarChange"
                ref="avatarInput"
                type="file"
                class="hidden"
              />
              <img
                @click="openAvatarInput"
                class="inline-block h-16 w-16 rounded-full ring-2 ring-white bg-slate-400"
                :src="form.img_path ? form.img_path : ''"
                alt=""
              />
            </div>
            <div class="mb-6 relative">
              <input
                type="text"
                v-model="form.name"
                placeholder="Name"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6 relative">
              <input
                type="text"
                v-model="form.lastname"
                placeholder="Last Name"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <div
                class="border-[#E9EDF4] text-[#ACB6BE] w-full rounded-md flex justify-between items-center border bg-[#FCFDFE] py-3 px-5 text-base text-body-color"
              >
                BirthDay
                <datepicker
                  v-model="form.birtday"
                  :full-month-name="true"
                  input-class="customClass"
                  placeholder="YYYY-MM-DD"
                  :typeable="true"
                  :hideInput="false"
                ></datepicker>
              </div>
            </div>
            <div class="mb-6">
              <input
                type="text"
                v-model="form.gender"
                placeholder="Gender"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <country-select
                required
                v-model="form.country"
                :country="form.country"
                topCountry="US"
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <region-select
                required
                v-model="form.region"
                :country="form.country"
                :region="form.region"
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <input
                type="text"
                v-model="form.ocupation"
                placeholder="Ocupation"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <QuillEditor
                theme="snow"
                toolbar="essential"
                @update:content="updateExplanation"
                contentType="html"
                :placeholder="'Introduce Yourself !!!'"
                v-model="form.introduction"
                
              />
            </div>
            <div class="mb-10">
              <button
                :disabled="loading"
                :class="[loading ? 'bg-blue-600' : 'bg-gray-800']"
                type="submit"
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
        </div>
      </div>
    </div>
  </section>
</template>
