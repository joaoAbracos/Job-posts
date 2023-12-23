<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "../../../stores/profile";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../../../stores/auth";

const store = useProfileStore();

const router = useRouter();
const authStore = useAuthStore();

const { hasProfile } = storeToRefs(authStore);

const { errors, profile } = storeToRefs(store);

const { editCompanyProfile, getCompanyProfile } = store;

const form = reactive({
  company_name: "",
  website: "",
  country: "",
  region: "",
  email: "",
  social: "",
  explanation: "",
  image_path: "",
  file: null,
});

onMounted(async () => {
  await getCompanyProfile();
  form.company_name = profile.value.company_name;
  form.website = profile.value.website;
  form.country = profile.value.country;
  form.region = profile.value.region;
  form.email = profile.value.email;
  form.social = profile.value.social;
  form.explanation = profile.value.explanation;
  form.image_path = profile.value.file;

  const quillEditor = document.querySelector(".ql-editor");
  quillEditor.innerHTML = form.explanation;
});

const loading = ref(null)
const handleProfile = async () => {
  loading.value = true;
  const data = await editCompanyProfile(form);
  loading.value = false;
  if (data) {
    router.push({ name: "pageCompany" });
  }
};

const updateExplanation = (content) => {
  form.explanation = content;
};

//File input
const fileInput = ref(null);

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  form.image_path = URL.createObjectURL(file);
  form.file = file;
};
</script>
<template>
  <section class="bg-[#F4F7FF]  lg:py-[20px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div
          class="relative mx-auto max-w-[725px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <h3 class="mb-4 mt-0 text-3xl font-medium leading-tight text-primary">
            Company Details
          </h3>

          <form @submit.prevent="handleProfile">
            <div class="mb-6 relative">
              <input
                @change="handleFileChange"
                ref="fileInput"
                type="file"
                class="hidden"
              />
              <img
                @click="openFileInput"
                class="inline-block h-16 w-16 rounded-full ring-2 ring-white bg-slate-400"
                :src="form.image_path ? form.image_path : ''"
                alt=""
              />
            </div>
            <div class="mb-6 relative">
              <input
                type="text"
                v-model="form.company_name"
                placeholder="Company name"
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
              type="url"
                v-model="form.website"
                placeholder="Website"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <input
                type="email"
                required
                v-model="form.email"
                placeholder="Email"
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6">
              <input
                type="text"
                v-model="form.social"
                placeholder="Social"
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
                v-model="form.explanation"
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
                <div v-else>Save</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
