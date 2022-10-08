<script setup>
import FeedItem from "@/components/FeedItem.vue";
import RecruitmentItem from "@/components/RecruitmentItem.vue";
</script>
<template>
  <div class="w-6/12 flex-shrink-0">
    <div class="py-8 px-6" v-if="save">
      <div v-if="save.posts.length > 0">
        <p class="text-gray-800 text-xl font-bold">Posts</p>
        <div class="space-y-6 mt-3">
          <FeedItem v-for="(post, idx) in save.posts" :key="idx" :post="post" />
        </div>
      </div>

      <div v-if="save.recruitments.length > 0">
        <p class="text-gray-800 text-xl font-bold">Recruitments</p>
        <div class="space-y-6 mt-3">
          <RecruitmentItem
            v-for="(recruitment, idx) in save.recruitments"
            :key="idx"
            :recruitment="recruitment"
          />
        </div>
      </div>
    </div>
    <div v-else class="py-8 px-6 flex-shrink-0">
      <div class="flex flex-col items-center py-32">
        <div class="px-32">
          <img :src="images.collection" alt="no-saves">
        </div>
        <p class="text-gray-800 text-base font-bold mt-8">There is no saved posts yet</p>
        <p class="text-gray-400 text-sm mt-2">Try save some posts or recruitments from new feed can comeback</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth/auth";
import axios from "axios";
import { images } from "../constants";
const serverUrl = import.meta.env.VITE_SERVER_URL;
export default {
  async mounted() {
    const authStore = useAuthStore();
    const res = await axios.get(
      `${serverUrl}/users/${authStore.user._id}/save`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
          "x-access-token": authStore.token,
        },
      }
    );

    this.save = res.data;
  },
  data: () => ({
    save: null,
    images: images
  }),
  components: { FeedItem },
};
</script>

<style lang="scss" scoped>
</style>