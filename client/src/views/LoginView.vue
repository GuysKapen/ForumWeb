<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/SideBar.vue";
import LoginForm from "@/components/LoginForm.vue";
</script>
<template>
  <main>
    <div>
      <Nav />
      <div class="flex bg-gray-50">
        <SideBar />
        <LoginForm />
      </div>
    </div>
  </main>
</template>

<script>
export default {
};
</script>
