<template>
  <div class="w-6/12 py-8 px-6">
    <div class="bg-white flex justify-between items-center px-4 py-2 rounded-xl">
      <p class="text-gray-400 text-sm">Add new thread</p>
      <router-link tag="div" class-active="active" to="/new" exact>
        <button class="
          bg-indigo-600
          flex
          items-center
          w-8
          h-8
          justify-center
          p-1
          rounded-xl
        ">
          <span class="material-icons text-white text-sm">add</span>
        </button>
      </router-link>
    </div>
    <div class="space-y-6 mt-6">
      <RecruitmentItem v-for="(post, idx) in recruitments" :key="idx" :post="post" />
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { mapState } from 'pinia'

import RecruitmentItem from "@/components/RecruitmentItem.vue";
export default {
  async mounted() {
    const postStore = usePostStore();
    postStore.getRecruitmentsData();
  },
  components: { RecruitmentItem },
  computed: {
    ...mapState(usePostStore, ["recruitments"]),
  },
};
</script>

<style lang="scss" scoped>
</style>