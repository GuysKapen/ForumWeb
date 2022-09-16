<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/RecruitmentSideBar.vue";
import RightBar from "@/components/RightBar.vue";
import Detail from "@/components/RecruitmentDetail.vue";
</script>

<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <Detail />
      </div>
    </div>
  </main>
</template>
