<script setup>
import { RouterLink, RouterView } from "vue-router";
import HomeView from "@/views/HomeView.vue";
// import Chatbox from "@/components/Chatbox.vue";
import 'mosha-vue-toastify/dist/style.css'
import Chatbox from './components/chatbox/Chatbox.vue'
</script>

<template>
  <div>
    <router-view />
    <chatbox />
    <!-- <Chatbox /> -->
  </div>
</template>