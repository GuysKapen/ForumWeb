<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import RightBar from "@/components/RightBar.vue";
import PostForm from "@/components/PostForm.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <PostForm />
      </div>
    </div>
  </main>
</template>
