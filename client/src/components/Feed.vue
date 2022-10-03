<script setup>
import FeedItem from "@/components/FeedItem.vue";
</script>
<template>
  <div class="w-6/12 py-8 px-6">
    <div
      class="bg-white flex justify-between items-center px-4 py-2 rounded-xl"
    >
      <p class="text-gray-400 text-sm">Add new thread</p>
      <router-link tag="div" class-active="active" to="/new" exact>
        <button
          class="
            bg-indigo-600
            flex
            items-center
            w-8
            h-8
            justify-center
            p-1
            rounded-xl
          "
        >
          <span class="material-icons text-white text-sm">add</span>
        </button>
      </router-link>
    </div>
    <div class="space-y-6 mt-6">
      <FeedItem v-for="(post, idx) in posts" :key="idx" :post="post" />
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import axios from "axios";
import { mapState, mapActions } from "pinia";

const serverUrl = import.meta.env.VITE_SERVER_URL

export default {
  data: () => ({
    posts: [],
  }),
  async mounted() {
    if ("q" in this.$route.query || "search" in this.$route.query) {
      const res = await axios.get(`${serverUrl}/search/posts`, {
        params: { name: this.$route.query["q"] || this.$route.query["search"] },
      });
      this.posts = res.data;
    } else {
      this.posts = await this.getPostsData(this.$route.query);
    }
  },
  watch: {
    async $route() {
      // this will be called any time the route changes
      if ("q" in this.$route.query || "search" in this.$route.query) {
        const res = await axios.get(`${serverUrl}/search/posts`, {
          params: {
            name: this.$route.query["q"] || this.$route.query["search"],
          },
        });
        this.posts = res.data;
      } else {
        this.posts = await this.getPostsData(this.$route.query);
      }
    },
  },
  methods: {
    ...mapActions(usePostStore, ["getPostsData"]),
  },
  components: { FeedItem },
};
</script>

<style lang="scss" scoped>
</style>