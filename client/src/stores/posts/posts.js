import { defineStore } from "pinia";
import axios from 'axios'

import { useAuthStore } from "@/stores/auth/auth";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const usePostStore = defineStore({
    id: "post",
    state: () => ({
        posts: null,
        recruitments: []
    }),
    actions: {
        async getPost(id) {
            const authStore = useAuthStore()
            const res = await axios.get(`${serverUrl}/posts/${id}`, { params: { token: this.token } })
            return res.data
        },
        async getPostsData() {
            const res = await axios.get(`${serverUrl}/posts`)
            this.posts = res.data
            return res.data
        },
        async getRecruitmentsData(params) {
            const res = await axios.get(`${serverUrl}/recruitments`, { params: params })
            this.recruitments = res.data
            return res.data
        },
    },
});
