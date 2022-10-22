<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import RightBar from "@/components/RightBar.vue";
import PostForm from "@/components/PostForm.vue";
import { createToast } from 'mosha-vue-toastify';
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <PostForm @added="onAdded" />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  methods: {
    onAdded() {
      createToast("Success add post", { type: 'success' })
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
