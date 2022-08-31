import { defineStore } from "pinia";
import axios from 'axios'

import { useAuthStore } from "@/stores/auth/auth";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export const usePostStore = defineStore({
    id: "post",
    state: () => ({
        posts: null,
    }),
    actions: {
        async getPost(id) {
            const res = await axios.get(`${serverUrl}/users/${this.user._id}/albums/${albumId}`, { params: { token: this.token } })
            return res.data
        },
        async getPostsData() {
            const authStore = useAuthStore()
            const res = await axios.get(`${serverUrl}/users/${authStore.user._id}/posts`, { params: { token: authStore.token } })
            this.posts = res.data
            return res.data
        },
    },
});
