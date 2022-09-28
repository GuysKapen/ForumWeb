<script setup>
import { RouterView } from "vue-router";
import Chatbox from "@/components/chatbox/Chatbox.vue";
import 'mosha-vue-toastify/dist/style.css'
</script>

<template>
  <div class="mb-16">
    <router-view />
    <Chatbox />
  </div>
</template>