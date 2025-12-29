import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchArticles = async () => {
  const res = await API.get("/articles");
  return res.data;
};
