<template>
  <section class="bg-[#F4F7FF] py-20 lg:py-[40px]">
    <div class="container mx-auto">
      <div class="flex flex-wrap">
        <div
          class="relative mx-auto max-w-[725px] overflow-hidden rounded-lg bg-white pb-10 pt-10 px-10 text-center sm:px-12 md:px-[60px]"
        >
          <h3 class="mb-8 text-4xl font-medium leading-tight text-primary">
            Post a Job
          </h3>
          <form @submit.prevent="handleSubmit">
            <div class="mb-6 relative">
              <input
                type="text"
                placeholder="Title"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                v-model="form.title"
              />
            </div>
            <div class="mb-6 flex">
              <label
                class="relative inline-flex items-center mr-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  :checked="form.remote"
                  @change="form.remote = !form.remote"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Remote</span
                >
              </label>
            </div>
            <div class="mb-6" v-if="!form.remote">
              <country-select
                required
                v-model="form.country"
                :country="form.country"
                topCountry="US"
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6" v-if="!form.remote">
              <region-select
                required
                v-model="form.region"
                :country="form.country"
                :region="form.region"
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
            <div class="mb-6 relative">
              <input
                type="url"
                placeholder="Apply URL"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                v-model="form.apply_url"
              />
            </div>
            <div class="mb-6 flex">
              <label
                class="relative inline-flex items-center mr-5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  :checked="form.comp"
                  @change="form.comp = !form.comp"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"
                ></div>
                <span
                  class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >Compensation</span
                >
              </label>
            </div>
            <div class="mb-6 relative" v-if="form.comp">
              <input
                type="text"
                placeholder="Compensation"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                v-model="form.compensation"
              />
            </div>
            <div class="mb-6 relative">
              <input
                type="text"
                placeholder="HR,php"
                required
                class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                v-model="form.skills"
              />
              <div class="mt-2 px-0.5 py-1 flex">
                <span class="text-white text-xs bg-slate-600 p-1 rounded"
                  >Put the name of the skills separated by comma</span
                >
              </div>
            </div>
            <div class="mb-6 relative">
              <QuillEditor
                theme="snow"
                toolbar="essential"
                @update:content="updateDescription"
                contentType="html"
                v-model="form.description"
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
                <div v-else>Submit</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useJobStore } from "../../stores/job";
import { storeToRefs } from "pinia";
const router = useRouter();
const store = useJobStore();

const { errors, role } = storeToRefs(store);
const { createPostJob } = store;

const form = reactive({
  title: "",
  remote: 0,
  country: "",
  region: "",
  apply_url: "",
  comp: 0,
  compensation: "",
  skills: "",
  description: "",
});
const loading = ref(null);

const handleSubmit = async () => {
  loading.value = true;
  const data = await createPostJob(form);
  loading.value = false;
  if (data) {
    router.push({ name: "myPosts" });
  }
};

const updateDescription = (content) => {
  form.description = content;
};
</script>