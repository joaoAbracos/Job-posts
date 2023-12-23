import apiFile from "./api";
const apiPath = import.meta.env.VITE_API_PATH;

const resourcePost = apiPath + "/jobs";
const resourceAllPost = apiPath + "/all-jobs";
const resourceLocations = apiPath + "/all-location-filters";
export const postJob = (job) => apiFile.post(resourcePost, job);
export const allUserPosts = () => apiFile.get(resourcePost);
export const getAllPosts = ({ queries }) =>
  apiFile.get(
    `${resourceAllPost}?${new URLSearchParams(queries.value).toString()}`
  );
export const getLocations = () => apiFile.get(resourceLocations);
