<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import MyForm from "@/components/PostForm.vue";
</script>

<template>
    <MyForm :model="model" @updated="onUpdated" />
</template>

<script>
import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;
import { useAuthStore } from '@/stores/auth/auth'
import { createToast } from 'mosha-vue-toastify';
export default {
    data: () => ({ model: null }),
    mounted() {
        const authStore = useAuthStore()
        axios.get(`${serverUrl}/users/${authStore.user._id}/posts/${this.$route.params.id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authStore.token}`,
                "x-access-token": authStore.token,
            },
        }).then(res => {
            this.model = res.data;
        })
    },
    methods: {
        onUpdated() {
            createToast("Success update post", { type: 'success' })
            this.$router.push({ name: 'user-post-index' })
        }
    }

}
</script>