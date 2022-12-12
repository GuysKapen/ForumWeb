<script setup>
import { imgUrlFor } from "../utils/utils";
import { images } from "../constants";
const serverUrl = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div class="w-3/12 pl-8">
    <div class="
        overflow-hidden
        bg-gray-50
        pt-6
        tabs-panel
        shadow-md
        border-r border-gray-100
      ">
      <div class="px-4 py-5 space-y-6 sm:p-6" v-if="user">
        <h3 class="text-base font-medium text-gray-900">Profile</h3>
        <p class="text-sm text-gray-400" v-if="user.company">
          Company: <span class="text-gray-600">{{ user.company.name }}</span>
        </p>

        <div class="rounded-lg">
          <img :src="imgUrlFor(serverUrl, user.profile?.cover, images.user)" alt="profile"
            class="w-24 h-24 mx-auto rounded-lg flex-shrink-0 object-cover" />
        </div>

        <p class="text-base text-gray-600 text-center">{{ user.name }}</p>
      </div>
      <div class="
          rounded-md
          flex-col
          justify-center
          items-center
          text-center
          p-6
        " v-else>
        <p class="text-sm">Search for a job?</p>
        <div @click="showLoginForm" class="
            bg-indigo-700
            hover:bg-indigo-800
            cursor-pointer
            text-white
            font-black
            text-xs
            px-4
            py-3
            text-center
            rounded-md
            mt-4
          ">
          Login to Apply
        </div>
        <div class="
            bg-indigo-200
            text-gray-800
            font-black
            text-xs
            px-4
            py-3
            text-center
            rounded-md
            mt-4
          ">
          Subcribe for updates
        </div>
        <p class="text-sm mt-4">
          Don't have an account?
          <router-link :to="{ name: 'register' }" class="text-indigo-600 hover:text-indigo-800">Register</router-link>
        </p>
      </div>

      <div class="bg-white rounded-lg m-4 py-6 px-4" v-if="user">
        <div class="flex items-center">
          <div class="
              bg-gray-50
              rounded-xl
              border border-gray-200
              mr-8
              inline-block
            ">
            <button type="button" class="
                flex
                items-center
                text-gray-400
                hover:text-indigo-500
                w-8
                h-8
                justify-center
                relative
              ">
              <span class="material-icons text-base relative"> bookmark </span>
            </button>
          </div>

          <div>
            <p class="text-sm">+384 785 285 289</p>
          </div>
        </div>

        <div class="flex items-center mt-4">
          <div class="
              bg-gray-50
              rounded-xl
              border border-gray-200
              mr-8
              inline-block
            ">
            <button type="button" class="
                flex
                items-center
                text-gray-400
                hover:text-indigo-500
                w-8
                h-8
                justify-center
                relative
              ">
              <span class="material-icons text-base relative"> email </span>
            </button>
          </div>

          <div>
            <p class="text-sm">{{ user.email }}</p>
          </div>
        </div>
      </div>

      <div class="px-4">
        <h3 class="text-sm text-gray-400 mb-4">Top recruitments</h3>
        <div class="flex items-center mb-4" v-for="(recruitment, idx) in recruitments" :key="idx">
          <div class="rounded-lg flex-shrink-0">
            <img :src="imgUrlFor(serverUrl, recruitment.owner?.profile?.cover)" alt="profile"
              class="w-8 h-8 rounded-lg flex-shrink-0 object-cover" />
          </div>
          <div>
            <router-link :to="{ name: 'recruitment-detail', params: { id: recruitment._id } }">
              <p class="text-sm text-gray-800 ml-4 capitalize">{{ recruitment.owner.name }}</p>
            </router-link>
            <p class="text-xs ml-4 capitalize">
              {{ truncate(recruitment.name, 24) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { useAuthStore } from "@/stores/auth/auth";
import { mapState, mapActions } from "pinia";

export default {
  data: () => ({
    recruitments: [],
  }),
  async mounted() {
    this.recruitments = await this.getTopRecruitmentsData();
  },
  methods: {
    ...mapActions(usePostStore, ["getTopRecruitmentsData"]),
    ...mapActions(useAuthStore, ["showLoginForm"]),
    truncate(value, length) {
      if (!value) return "";
      value = value.toString();
      if (value.length > length) {
        return value.substring(0, length) + " ...";
      } else {
        return value;
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>