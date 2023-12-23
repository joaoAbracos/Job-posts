import { defineStore } from "pinia";
import { ref, watch } from "vue";

import {
  postJob,
  allUserPosts,
  getAllPosts,
  getLocations,
} from "../http/job-api";

export const useJobStore = defineStore("jobStore", () => {
  const errors = ref(null);
  const loading = ref(false);
  const posts = ref([]);
  const allPosts = ref([]);

  const currentPage = ref(1);
  const lastPage = ref(3);

  const locations = ref([]);
  const skills = ref([]);

  const queries = ref({
    sort: "",
    "filter[title]": "",
    "filter[location]": "",
    page: 1,
    perPage: 3,
  });

  const createPostJob = async (post) => {
    try {
      await postJob(post);
      return true;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const fetchAllUserPosts = async () => {
    try {
      loading.value = true;
      const { data } = await allUserPosts();
      posts.value = data.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } finally {
      loading.value = false;
    }
  };
  const getAllLocations = async () => {
    try {

      const { data } = await getLocations();
      locations.value = data.locations;
      skills.value = data.skills;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } finally {
      loading.value = false;
    }
  };
  const getData = async () => {
    try {
      const { data } = await getAllPosts({ queries });
      allPosts.value = data.data;
      lastPage.value = data.last_page;
      currentPage.value = data.current_page;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } finally {
      loading.value = false;
    }
  };

  watch(
    queries,
    async () => {
      await getData();
    },
    {
      // must pass deep option to watch for changes on object properties
      deep: true,
      // can also pass immediate to handle that first request AND when queries change
      immediate: true,
    }
  );

  return {
    errors,
    loading,
    posts,
    allPosts,
    queries,
    currentPage,
    lastPage,
    locations,
    skills,
    createPostJob,
    fetchAllUserPosts,
    getData,
    getAllLocations,
  };
});
