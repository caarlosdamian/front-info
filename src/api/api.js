import axios from "axios";
export const baseUrl = process.env.REACT_APP_BACKEND_URL;
const urlParams = new URLSearchParams(window.location.search);
// const dep_id = urlParams.get("dep_id");
// const session_id = urlParams.get("session_id");
const headers = {
  "X-Dep-ID": 5679,
  "X-Session-ID": "827bce60fcd4329f9bcd55f2e4c8aa2c74abe0e1660a6742dd2949bfa8066901",
};
const get = async (path) => {
  const response = await axios.get(`${baseUrl}${path}/`, { headers });
  const { data } = await response;
  return data;
};
export const api = {
  getLocationTags: () => get("locations_tags"),
  getLocations: () => get("locations"),
  getDataTable: () => get("table"),
};