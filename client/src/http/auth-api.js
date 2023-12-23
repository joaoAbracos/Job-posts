import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

export const login = (credentials) => api.post("/login", credentials);

export const register = (user) => api.post("/register", user);

export const logout = () => api.post("/logout");

export const getUser = () => api.get("/api/user");

export const forgotPassword = (email) => api.post("/forgot-password", email);

export const resetPassword = (form) => api.post("/reset-password", form);

export const sendEmailNotification = (user) => api.post("/email/verification-notification", user);

export const verifyEmail = (user,token) => api.get(`/verify-email/${user}/${token}`);
