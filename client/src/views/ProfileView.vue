<script setup>
import Nav from "@/components/Nav.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import SideBar from "@/components/SideBar.vue";
import Profile from "@/components/Profile.vue";

</script>
<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />

        <Profile />

      </div>
    </div>
  </main>
</template>

<script>
export default {
};
</script>
