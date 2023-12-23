<template>
  <div class="flex flex-col items-center w-full">
    <!-- Search Bar -->

    <div class="">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search Posts by Title"
          v-model.lazy="queries['filter[title]']"
          @change="currentPage.value = 1"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border rounded-lg bg-white focus:ring-blue-500 dark:focus:ring-blue-500"
        />
      </div>
    </div>
    <!-- Filter Buttons -->
    <div class="flex my-4">
      <div class="space-x-2 flex flex-wrap">
        <button
          v-for="location in locations"
          :key="location"
          class="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          @click="
            queries['filter[location]'] =
              queries['filter[location]'] === location ? '' : location
          "
        >
          <span
            :class="{
              'bg-opacity-0 text-white':
                queries['filter[location]'] === location,
            }"
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            {{ location }}
          </span>
        </button>
      </div>
    </div>
    <div class="flex my-4">
      <div class="space-x-2 flex flex-wrap">
        <button
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
          v-for="skill in skills"
          :key="skill"
        >
          <span
            :class="{
              'bg-opacity-0 text-white': queries['filter[location]'] === skill,
            }"
            class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
          >
            {{ skill }}
          </span>
        </button>
      </div>
    </div>

    <!-- Display Data -->

    <div v-if="allPosts" class="flex flex-col w-full items-center">
      <div
        v-for="item in allPosts"
        :key="item.id"
        class="w-full sm:w-1/2 md:w-4/5 lg:w-7/12"
      >
        <div
          class="flex justify-between p-6 bg-gray-900 border border-gray-200 rounded-lg shadow mb-4"
        >
          <div>
            <div class="flex items-center">
              <img
                :src="`${base_URL}/${item.profile.image_path}`"
                class="w-20 h-20 rounded-full mr-2"
              />
              <div>
                <h1 class="font-bold tracking-tight text-white ">
                  {{ item.title }}
                </h1>

                <div class="flex  items-center mt-2">
                  <h4 class="text-white">
                    {{ item.profile.company_name }}
                  </h4>
                  <svg
                    class="w-6 h-6 text-blue-600 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 21 21"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m6.072 10.072 2 2 6-4m3.586 4.314.9-.9a2 2 0 0 0 0-2.828l-.9-.9a2 2 0 0 1-.586-1.414V5.072a2 2 0 0 0-2-2H13.8a2 2 0 0 1-1.414-.586l-.9-.9a2 2 0 0 0-2.828 0l-.9.9a2 2 0 0 1-1.414.586H5.072a2 2 0 0 0-2 2v1.272a2 2 0 0 1-.586 1.414l-.9.9a2 2 0 0 0 0 2.828l.9.9a2 2 0 0 1 .586 1.414v1.272a2 2 0 0 0 2 2h1.272a2 2 0 0 1 1.414.586l.9.9a2 2 0 0 0 2.828 0l.9-.9a2 2 0 0 1 1.414-.586h1.272a2 2 0 0 0 2-2V13.8a2 2 0 0 1 .586-1.414Z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <div class="flex items-center mt-5">
                <svg
                  class="w-3 h-3 text-white mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path
                    d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
                  />
                </svg>
                <p class="text-white">{{ item.location }}</p>
              </div>

              <!-- <p class="text-gray-500 dark:text-gray-400">
                <a
                  href="#"
                  class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  {{ item.apply_url }}
                  <svg
                    class="w-4 h-4 ml-2"
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
                </a>
              </p> -->
              <div class="flex items-center mt-2">
                <svg
                  class="w-3 h-3 text-white mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11.905 1.316 15.633 6M18 10h-5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h5m0-5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1m0-5V7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h15a1 1 0 0 0 1-1v-3m-6.367-9L7.905 1.316 2.352 6h9.281Z"
                  />
                </svg>
                <p class="text-white">{{ item.compensation }}</p>
              </div>
              <Skills :skills="item.skills" />
            </div>
          </div>
          <div>
            <button
              type="button"
              class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              See Post
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="allPosts.length > 0" class="flex justify-center my-4">
      <button
        v-if="currentPage > 1"
        @click="queries.page = Math.max(1, queries.page - 1)"
      >
        Previous
      </button>
      <div>Page: {{ currentPage }}</div>
      <button v-if="currentPage !== lastPage" @click="queries.page++">
        Next
      </button>
    </div>
  </div>
</template>
  
<script setup>
import Skills from "../../components/posts/Skills.vue";
import { onMounted, ref } from "vue";
import { useJobStore } from "../../stores/job";
import { storeToRefs } from "pinia";

const store = useJobStore();
const base_URL = ref(import.meta.env.VITE_BASE_URL);
const {
  loading,
  errors,
  allPosts,
  queries,
  lastPage,
  currentPage,
  locations,
  skills,
} = storeToRefs(store);
const { getData, getAllLocations } = store;

onMounted(async () => {
  await getAllLocations();
  await getData();
});
</script>

