<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import RightBar from "@/components/RightBar.vue";
import Detail from "@/components/Detail.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50 w-screen">
        <SideBar />
        <Detail />
      </div>
    </div>
  </main>
</template>
