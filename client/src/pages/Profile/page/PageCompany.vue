<template>
  <section class="bg-[#F4F7FF] h-screen py-10 lg:py-[40px]">
    <div v-if="!loading && profile" class="container mx-auto">
      <div class="flex flex-wrap">
        <div
          class="relative mx-auto max-w-[725px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <form @submit.prevent="handleProfile">
            <div class="mb-6 relative">
              <input ref="avatarInput" type="file" class="hidden" />
              <img
                class="inline-block h-24 w-24 rounded-full ring-2 ring-white bg-slate-400"
                :src="profile.file"
                alt=""
              />
            </div>
            <div class="mb-6 relative">
              <span
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                {{ profile.company_name }}</span
              >
            </div>

            <div class="relative flex flex-wrap  justify-center ">
              <div class="flex justify-center items-center">
                <div class="mb-6">
                  <span
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span
                      class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                    >
                      {{ getCountryName(profile.country, profile.region) }}
                    </span>
                  </span>
                </div>
                <div class="mb-6">
                  <span
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <a
                      class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                      :href="profile.website"
                      target="_blank"
                    >
                      {{ profile.website }}
                    </a>
                  </span>
                </div>
              </div>
              <div class="flex 
               justify-center  items-center">
                <div class="mb-6">
                  <span
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span
                      class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                    >
                      {{ profile.email }}
                    </span>
                  </span>
                </div>
                <div class="mb-6">
                  <span
                    class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                  >
                    <span
                      class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
                    >
                      {{ profile.social }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="mb-6 border">
              <QuillEditor
                contentType="html"
                v-model:content="profile.explanation"
                readOnly="true"
                toolbar="#my-toolbar"
              >
                <template #toolbar>
                  <div id="my-toolbar" class="!p-0"></div>
                </template>
              </QuillEditor>
            </div>

            <div class="mb-10 space-x-3">
              <router-link
                to="/page/company/edit"
                class="w-2/5 px-4 py-3 bg-green-600 hover:bg-green-400 rounded-md text-white"
              >
                Edit
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div
            class="relative mx-auto max-w-[725px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
          >
            <div class="flex flex-wrap justify-center">
              <div class="px-4">
                <div
                  class="relative mx-auto max-w-[725px] overflow-hidden rounded-lg bg-white py-16 px-10 text-center sm:px-12 md:px-[60px]"
                >
                  <svg
                    class="animate-spin h-5 w-5 mr-3 text-center"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      F
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "../../../stores/profile";
import { useAuthStore } from "../../../stores/auth";
import { storeToRefs } from "pinia";
import { allCountries } from "country-region-data";
const router = useRouter();

const store = useProfileStore();

const authStore = useAuthStore();

const { profile, loading } = storeToRefs(store);
const { getCompanyProfile } = store;

onMounted(async () => {
  await getCompanyProfile();
});

const getCountryName = (countryCode, regionCode) => {
  const data = allCountries;
  const countryData = data.find((item) => item[1] === countryCode);
  let countryName = "";
  let regionName = "";
  if (countryData) {
    countryName = countryData[0];
    const regionData = countryData[2].find(
      (region) => region[1] === regionCode
    );
    if (regionData) {
      regionName = regionData[0];
    }
  }

  return `${countryName}, ${regionName}`;
};
</script>
