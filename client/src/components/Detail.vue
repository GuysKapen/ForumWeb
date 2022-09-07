<script setup>
import DetailItem from "@/components/DetailItem.vue";
import AnswerItem from "@/components/AnswerItem.vue";
import CommentForm from "./CommentForm.vue";
import HashLoader from "@/components/HashLoader.vue";
</script>
<template>
  <div class="flex-grow">
    <div class="flex-grow py-8 px-6" v-if="post != null">
      <DetailItem :post="post" />
      <div v-if="addingAnswer">
        <AnswerForm @addedAnswer="addedAnswer" :parent-id="post._id" :parent-type="'post'" />
      </div>
      <div class="mt-8">
        <div class="border-b" v-for="(post, idx) in post.answers" :key="idx">
          <AnswerItem :post="post" />
        </div>
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
import AnswerForm from "@/components/AnswerForm.vue";

export default {
  data: () => ({
    post: null,
    addingAnswer: false
  }),
  async mounted() {
    const postStore = usePostStore();
    postStore.getPostsData();

    this.post = await postStore.getPost(this.$route.params.id)
  },
  components: { DetailItem, HashLoader, AnswerForm },
  computed: {
    ...mapState(usePostStore, ["posts"]),
  },

  methods: {
    addedAnswer(answer) {
      this.post.answers.push(answer)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>