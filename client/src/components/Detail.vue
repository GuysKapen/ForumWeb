<script setup>
import DetailItem from "@/components/DetailItem.vue";
import AnswerItem from "@/components/AnswerItem.vue";
import CommentForm from "./CommentForm.vue";
import HashLoader from "@/components/HashLoader.vue";
</script>
<template>
  <div class="flex-grow">
    <div class="flex-grow py-8 px-6" v-if="post != null">
      <div class="bg-white flex justify-between mb-8 items-center px-4 py-2 rounded-xl">
        <p class="text-gray-400 text-sm">Add answer</p>
        <button class="
          bg-indigo-600
          flex
          items-center
          w-8
          h-8
          justify-center
          p-1
          rounded-xl
        " @click="toggleAddAnswer()">
          <span class="material-icons text-white text-sm">add</span>
        </button>
      </div>
      <div v-if="addingAnswer" class="mb-8">
        <AnswerForm @addedAnswer="addedAnswer" @cancelAnswer="toggleAddAnswer" :parent-id="post._id" :parent-type="'post'" />
      </div>
      <DetailItem :post="post" />
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
    toggleAddAnswer() {
      this.addingAnswer = !this.addingAnswer
    },
    addedAnswer(answer) {
      this.post.answers.push(answer)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>