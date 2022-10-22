<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import MyForm from "@/components/CommentForm.vue";
</script>

<template>
    <div class="my-8 w-1/2 mx-auto py-16 px-8">
        <div class="header my-4">
            <h2 class="text-2xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Edit comment
            </h2>
        </div>
        <MyForm :model="model" @updatedComment="onCommentUpdated" />
    </div>
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
        axios.get(`${serverUrl}/users/${authStore.user._id}/comments/${this.$route.params.id}`, {
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
        onCommentUpdated() {
            createToast("Success update comment", { type: 'success' })
            this.$router.push({ name: 'user-comment-index' })
        }
    }

}
</script>