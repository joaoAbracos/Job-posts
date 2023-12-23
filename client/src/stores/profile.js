import { defineStore } from "pinia";
import { ref } from "vue";

import {
  registerCompanyProfile,
  registerPersonProfile,
  retrivePersonProfile,
  retriveCompanyProfile,
  updateCompanyProfile,
  updatePersonProfile
} from "../http/profile-api";


import { useAuthStore } from "./auth";


export const useProfileStore = defineStore("profileStore", () => {
  const errors = ref(null);
  const profile = ref(null);
  const loading = ref(false);

  const createCompanyProfile = async (profile) => {
    try {
      await registerCompanyProfile(profile);
      await useAuthStore().fetchUser();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } 
  };
  const editCompanyProfile = async (profile) => {
    try {
      await updateCompanyProfile(profile);
      await useAuthStore().fetchUser();
      return true;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } 
  };
  const editPersonProfile = async (profile) => {
    try {
      await updatePersonProfile(profile);
      await useAuthStore().fetchUser();
      return true;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } 
  };
  const createPersonProfile = async (profile) => {
    try {
      await registerPersonProfile(profile);
      await useAuthStore().fetchUser();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } 
  };

  const getPersonProfile = async () => {
    try {
      const {data} = await retrivePersonProfile();
      profile.value = data.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const getCompanyProfile = async () => {
    try {
      loading.value = true;
      const {data} = await retriveCompanyProfile();
      profile.value = data.data;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    } finally {
      loading.value = false;
    }
  };

  return {
    errors,
    profile,
    loading,
    createCompanyProfile,
    createPersonProfile,
    getPersonProfile,
    getCompanyProfile,
    editCompanyProfile,
    editPersonProfile
  };
});


      