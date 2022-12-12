<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import Form from "@/components/RecruitmentForm.vue";
import { createToast } from 'mosha-vue-toastify';
</script>
    
<template>
    <Form @added="onAdded" />
</template>
<script>
export default {
    methods: {
        onAdded() {
            createToast("Success add recruitment", { type: 'success' })
            this.$router.push({ name: 'recruitment-index' })
        }
    }
}
</script>