<template>
  <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="
      backdrop-blur-sm
      overflow-y-auto overflow-x-hidden
      fixed
      top-0
      right-0
      left-0
      z-50
      w-full
      md:inset-0
      h-modal
      md:h-full
      justify-center
      items-center
    ">
    <div class="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2 -translate-y-1/2
        p-4
        w-full
        max-w-md
        h-full
        md:h-auto
      ">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button type="button" @click="hideLoginForm" class="
            absolute
            top-3
            right-2.5
            text-gray-400
            bg-transparent
            hover:bg-gray-200 hover:text-gray-900
            rounded-lg
            text-sm
            p-1.5
            ml-auto
            inline-flex
            items-center
            dark:hover:bg-gray-800 dark:hover:text-white
          " data-modal-toggle="authentication-modal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill=""
            style="--darkreader-inline-fill: currentColor">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="py-6 px-6 lg:px-8">
          <h3 class="mb-4 text-base font-black text-gray-900 dark:text-white">
            Login
          </h3>
          <form class="space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                ">Email</label>
              <input type="email" name="email" id="email" v-model="email" class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-600
                  dark:border-gray-500
                  dark:placeholder-gray-400
                  dark:text-white
                " placeholder="email@example.com" required="true" />
            </div>

            <div>
              <label for="email" class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-gray-300
                ">Password</label>
              <input type="password" name="password" id="password" v-model="password" class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-600
                  dark:border-gray-500
                  dark:placeholder-gray-400
                  dark:text-white
                " placeholder="password" required="true" />
            </div>

            <button type="submit" class="
                w-full
                text-white
                bg-indigo-700
                hover:bg-indigo-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              ">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth/auth";
import { mapActions, mapState } from "pinia";
import { createToast } from 'mosha-vue-toastify';
export default {
  data: () => ({
    email: null,
    password: null,
  }),
  computed: {
    ...mapState(useAuthStore, ["showLoginForm"]),
    ...mapState(useAuthStore, ["user"]),
  },
  methods: {
    ...mapActions(useAuthStore, { loginVue: "login" }),
    ...mapActions(useAuthStore, ["hideLoginForm"]),
    async login() {
      try {
        await this.loginVue({
          email: this.email,
          password: this.password,
        });

        createToast(`Welcome back ${this.user.name}`, { type: "success" })
        this.hideLoginForm()
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>