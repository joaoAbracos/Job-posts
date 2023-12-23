import { defineStore } from "pinia";

import { computed, ref } from "vue";

import {
  csrfCookie,
  login,
  register,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  sendEmailNotification,
  verifyEmail,
} from "../http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const errors = ref(null);

  const isLoggedIn = computed(() => !!user.value);
  const role = ref(null);
  const hasProfile = ref(null);
  const successMessage = ref(null);
  const loading = ref(false);
  const fetchUser = async () => {
    try {
      loading.value = true;
      const { data } = await getUser();
      user.value = data.data;
      if (data.data?.roles) {
        role.value = data.data.roles[0];
      }
      if (data.data?.profile) {
        hasProfile.value = data.data.profile;
      }
    } catch (error) {
      user.value = null;
    } finally {
      loading.value = false;
    }
  };
  const handleLogin = async (credentials) => {
    try {
      errors.value = null;
      await csrfCookie();
      await login(credentials);
      await fetchUser();
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleRegister = async (newUser) => {
    try {
      errors.value = null;
      await register(newUser);
      await handleLogin({
        email: newUser.email,
        password: newUser.password,
      });
    } catch (error) {
      debugger
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    }
  };

  const handleLogout = async () => {
    loading.value = true;
    await logout();
    user.value = null;
    loading.value = false;
  };

  const handleForgotPassword = async (email) => {
    try {
      loading.value = true;
      const status = await forgotPassword({ email: email });
      successMessage.value = status.data.status;
      errors.value = null;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };
  const handleResetPassword = async (form) => {
    try {
      loading.value = true;
      const status = await resetPassword(form);
      successMessage.value = status.data.status;
      errors.value = null;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const handleEmailNotification = async () => {
    try {
      loading.value = true;
      const status = await sendEmailNotification(user);
      successMessage.value = status.data.status;
      errors.value = null;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const handleEmailVerification = async (user, token) => {
    try {
      loading.value = true;
      const status = await verifyEmail(user, token);
      successMessage.value = status.data.status;
      errors.value = null;
    } catch (error) {
      if (error.response && error.response.status === 422) {
        errors.value = error.response.data.message;
      }
    } finally {
      loading.value = false;
    }
  };
  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleEmailNotification,
    handleEmailVerification,
    errors,
    role,
    hasProfile,
    successMessage,
    loading,
  };
});
