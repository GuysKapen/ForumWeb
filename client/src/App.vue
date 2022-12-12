<script setup>
import "mosha-vue-toastify/dist/style.css";
</script>

<template>
  <div>
    <router-view />
    <Chatbox />
    <!-- Main modal login -->
    <ModalLogin v-if="isShowLoginForm" />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from './stores/auth/auth';
import Footer from '@/components/Footer.vue';
import ModalLogin from "./components/ModalLogin.vue";
import Chatbox from './components/chatbox/Chatbox.vue';
import { RouterView } from "vue-router";
export default {
  components: { RouterView, Chatbox, ModalLogin, Footer },
  computed: {
    ...mapState(useAuthStore, ["isShowLoginForm"])
  },
};
</script>

<style lang="scss" scoped>

</style>