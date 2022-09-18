<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/RecruitmentSideBar.vue";
import RightBar from "@/components/RecruitmentRightBar.vue";
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
