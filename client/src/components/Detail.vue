<script setup>
import DetailItem from "@/components/DetailItem.vue";
import CommentForm from "./CommentForm.vue";
import AnswerForm from "./AnswerForm.vue";
</script>
<template>
  <div class="w-8/12 py-8 px-6">
    <AnswerForm />
    <div class="mt-8">
      <div class="border-b" v-for="(post, idx) in posts" :key="idx">
        <DetailItem :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { mapState } from 'pinia'

export default {
  async mounted() {
    const postStore = usePostStore();
    postStore.getPostsData();
  },
  components: { DetailItem },
  computed: {
    ...mapState(usePostStore, ["posts"]),
  },
};
</script>

<style lang="scss" scoped>
</style>