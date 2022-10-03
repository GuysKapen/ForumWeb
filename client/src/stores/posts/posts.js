import { defineStore } from "pinia";
import axios from "axios";

import { useAuthStore } from "@/stores/auth/auth";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const usePostStore = defineStore({
  id: "post",
  state: () => ({
    posts: null,
    recruitments: [],
  }),
  actions: {
    async getPost(id) {
      const res = await axios.get(`${serverUrl}/posts/${id}`);
      return res.data;
    },
    async getPostsData(params) {
      const res = await axios.get(`${serverUrl}/posts`, { params: params });
      this.posts = res.data;
      return res.data;
    },
    async getRecruitmentsData(params) {
      const res = await axios.get(`${serverUrl}/recruitments`, {
        params: params,
      });
      this.recruitments = res.data;
      return res.data;
    },
    async getRecruitment(id) {
      const res = await axios.get(`${serverUrl}/recruitments/${id}`);
      return res.data;
    },
    async getTopRecruitmentsData(params) {
      const res = await axios.get(`${serverUrl}/top-recruitments`, {
        params: params,
      });
      return res.data;
    },
    async getTopPostsData(params) {
      const res = await axios.get(`${serverUrl}/top-posts`, {
        params: params,
      });
      return res.data;
    },
  },
});
