<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import Feed from "@/components/Feed.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <Feed />
      </div>
    </div>
  </main>
</template>
