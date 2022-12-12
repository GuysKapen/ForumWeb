<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import RightBar from "@/components/RightBar.vue";
import Feed from "@/components/SavedFeed.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <Feed />
        <RightBar />
      </div>
    </div>
  </main>
</template>
