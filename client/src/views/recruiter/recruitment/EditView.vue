<script setup>
import MyForm from "@/components/RecruitmentForm.vue";
</script>

<template>
    <MyForm v-if="model" :model="model" @updated="onUpdated" />
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
        axios.get(`${serverUrl}/users/${authStore.user._id}/recruitments/${this.$route.params.id}`, {
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
            createToast("Success update recruitment", { type: 'success' })
            this.$router.push({ name: 'recruiter-recruitment-index' })
        }
    }

}
</script>