<script setup>
import DetailItem from "@/components/DetailItem.vue";
import CommentForm from "./CommentForm.vue";
import AnswerForm from "./AnswerForm.vue";
import HashLoader from "@/components/HashLoader.vue";
</script>
<template>
  <div class="flex-grow">
    <div class="flex-grow py-8 px-6" v-if="post != null">
      <DetailItem :post="post" />
      <AnswerForm />
      <div class="mt-8">
        <!-- <div class="border-b" v-for="(post, idx) in posts" :key="idx">
          <DetailItem :post="post" />
        </div> -->
      </div>
    </div>
    <div v-else class="w-full flex justify-center h-full pt-32">
      <HashLoader />
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { mapState } from 'pinia'

export default {
  data: () => ({
    post: null
  }),
  async mounted() {
    const postStore = usePostStore();
    postStore.getPostsData();

    this.post = await postStore.getPost(this.$route.params.id)
  },
  components: { DetailItem, HashLoader },
  computed: {
    ...mapState(usePostStore, ["posts"]),
  },
};
</script>

<style lang="scss" scoped>
</style>