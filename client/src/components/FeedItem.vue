<script setup>
import { imgUrlFor } from "../utils/utils";
import { images } from '../constants';
</script>
<template>
  <div class="bg-white px-8 pt-8 py-16 rounded-xl relative">
    <router-link
      tag="div"
      class="hover:text-indigo-600"
      class-active="active"
      :to="`/posts/${post._id}`"
      exact
    >
      <h3 class="text-gray-800 hover:text-indigo-600 font-black text-xl">
        {{ post.title }}
      </h3>
    </router-link>
    <div class="flex items-center justify-between mt-4">
      <div class="flex items-center">
        <div
          class="
            bg-gray-100
            rounded-lg
            flex
            items-center
            justify-center
            flex-shrink-0
            border border-gray-100
          "
        >
          <img
            :src="imgUrlFor(serverUrl, post.owner?.profile?.cover)"
            alt="profile"
            class="w-8 h-8 rounded-lg flex-shrink-0 object-cover"
          />
        </div>

        <div class="ml-3 text-sm">
          <p class="text-gray-500">Elisabeth May</p>
          <span class="text-gray-300 text-sm">6 days ago</span>
        </div>
      </div>
      <div
        class="
          bg-indigo-100
          rounded-xl
          flex
          items-center
          justify-center
          ml-4
          px-4
          py-1
          flex-shrink-0
          border border-indigo-200
        "
      >
        <span class="text-xs text-indigo-600">{{
          post.category ? post.category.name : "Uncategoried"
        }}</span>
      </div>
    </div>
    <div class="mt-4 prose lg:prose-xl">
      <div class="text-gray-700 text-sm" v-html="post.body"></div>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex">
        <div class="bg-gray-50 rounded-xl border border-gray-200 mr-8">
          <button
            @click="addToSave"
            type="button"
            class="
              flex
              items-center
              text-gray-400
              hover:text-indigo-500
              w-8
              h-8
              justify-center
              relative
            "
          >
            <span
              class="
                w-[6px]
                h-[6px]
                rounded-full
                bg-indigo-600
                absolute
                top-[-0.125rem]
                right-[-0.125rem]
              "
            ></span>
            <span class="material-icons text-base relative"> bookmark </span>
          </button>
        </div>

        <div class="bg-gray-50 rounded-xl border border-gray-200 mr-8">
          <button
            type="button"
            class="
              px-4
              flex
              items-center
              text-gray-400
              hover:text-indigo-500
              h-8
              justify-center
              relative
            "
          >
            <span class="material-icons text-base relative mt-1"> chat </span>
            <span class="text-sm ml-4"> Comment </span>
          </button>
        </div>
      </div>
      <div class="absolute right-0 w-32">

        <div v-for="(comment, idx) in post.comments" :key="idx"
          class="
            bg-white
            p-[0.125rem]
            absolute
            top-0
            left-0
            w-10
            h-10
            rounded-lg
          "
        >
          <img
            :src="imgUrlFor(serverUrl, comment.owner?.profile?.cover, images.avatar)"
            alt="profile"
            class="w-full h-full rounded-lg flex-shrink-0 object-cover"
          />
        </div>
   
        <div v-if="post.comments.length > 3"
          class="
            bg-white
            p-[0.125rem]
            absolute
            flex
            items-center
            justify-center
            top-4
            left-16
            w-10
            h-10
            rounded-lg
            z-10
          "
        >
          <span class="text-gray-300 text-sm">12+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth/auth";
import axios from "axios";
import { createToast } from 'mosha-vue-toastify';
const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  props: ["post"],
  methods: {
    addToSave() {
      const authStore = useAuthStore();
      if (authStore.user == null) {
        // Use arrow for callback to reference to this
        authStore.showLoginForm((err, _) => {
          if (err) return
          authStore.hideLoginForm()
          this.addToSave()
        });
        return;
      }

      try {
        axios
          .post(
            `${serverUrl}/users/${authStore.user._id}/save`,
            { post: this.post._id },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authStore.token}`,
                "x-access-token": authStore.token,
              },
            }
          )
          .then(() => {
            createToast("Save recruitment succeed!", { type: "success" });
          });
      } catch (error) {
        console.error("Add to save", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>