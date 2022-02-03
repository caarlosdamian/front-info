import axios from "axios";
export const baseUrl = process.env.REACT_APP_BACKEND_URL;
const urlParams = new URLSearchParams(window.location.search);
// const dep_id = urlParams.get(5679);
// const session_id = urlParams.get("789d4292ae0f2117d36001223ee92b1f9d4d91a1fae0068b2710cc4158ecc5cf");
const headers = {
  "X-Dep-ID": 5679,
  "X-Session-ID": "789d4292ae0f2117d36001223ee92b1f9d4d91a1fae0068b2710cc4158ecc5cf",
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