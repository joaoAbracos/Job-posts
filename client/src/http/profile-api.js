import apiFile from "./api";
const apiPath = import.meta.env.VITE_API_PATH;

const resourceCompany = apiPath + "/register-company";
const resourcePerson = apiPath + "/register-person";
const getPerson = apiPath + "/profile/person";
const getCompany = apiPath + "/profile/company";

const editCompany = apiPath + "/profile/edit/company";
const editPerson  = apiPath + "/profile/edit/person";
export const registerCompanyProfile = (profile) =>
  apiFile.post(resourceCompany, profile);

export const registerPersonProfile = (profile) =>
  apiFile.post(resourcePerson, profile);

export const retrivePersonProfile = () => apiFile.get(getPerson);

export const retriveCompanyProfile = () => apiFile.get(getCompany);

export const updateCompanyProfile = (profile) =>
  apiFile.post(editCompany, profile);

  export const updatePersonProfile = (profile) =>
  apiFile.post(editPerson, profile);
