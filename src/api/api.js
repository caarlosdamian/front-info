import axios from "axios";
export const baseUrl = process.env.REACT_APP_BACKEND_URL;
const urlParams = new URLSearchParams(window.location.search);
const headers = {
  "X-Dep-ID": 5679,

  "X-Session-ID": "aa1044c97a1ea2b9fe4de0aac3d572c77392f9d8e123a31878bea37705713555",

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