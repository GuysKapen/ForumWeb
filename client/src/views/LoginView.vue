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
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    email: "",
    error: "",
  }),
  computed: {
    // gives access to this.count inside the component
    // same as reading from store.count
    ...mapState(useAuthStore, ["user"]),
    // same as above but registers it as this.myOwnName
  },
  methods: {
    ...mapActions(useAuthStore, { loginVue: "login" }),
    async login() {
      try {
        await this.loginVue({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/albums");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
