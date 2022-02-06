import axios from "axios";

export const API_URL = process.env.REACT_APP_API_URL;

export const SPACES_URL = process.env.REACT_APP_SPACES_URL;

//changes

export const postUploadImage = (data) =>
  axios.post(`${API_URL}/api/images/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": true,
    },
  });