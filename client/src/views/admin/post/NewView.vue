<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import Form from "@/components/PostForm.vue";
import { createToast } from 'mosha-vue-toastify';
</script>
    
<template>
    <Form @added="onAdded" />
</template>
<script>
export default {
    methods: {
        onAdded() {
            createToast("Success add post", { type: 'success' })
            this.$router.push({ name: 'post-index' })
        }
    }
}
</script>