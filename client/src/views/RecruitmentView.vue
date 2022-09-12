<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import RightBar from "@/components/RightBar.vue";
import Trend from "@/components/Recruitments.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <Trend />
        <RightBar />
      </div>
    </div>
  </main>
</template>
