<script setup>
import { RouterView } from "vue-router";
import Chatbox from "@/components/chatbox/Chatbox.vue";
import "mosha-vue-toastify/dist/style.css";
import ModalLogin from "./components/ModalLogin.vue";
</script>

<template>
  <div class="mb-16">
    <router-view />
    <Chatbox />
    <!-- Main modal login -->
    <ModalLogin v-if="isShowLoginForm" />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from './stores/auth/auth';
export default {
  computed: {
    ...mapState(useAuthStore, ["isShowLoginForm"])
  },
};
</script>

<style lang="scss" scoped>
</style>