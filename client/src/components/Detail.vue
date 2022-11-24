<script setup>
import DetailItem from "@/components/DetailItem.vue";
import AnswerItem from "@/components/AnswerItem.vue";
import HashLoader from "@/components/HashLoader.vue";
</script>
<template>
  <div class="flex-grow">
    <div class="flex-grow py-8 px-6" v-if="post != null">
      <DetailItem :post="post" />
      <div class="py-4 flex items-center justify-between">
        <p class="text-gray-800 text-base font-bold">
          {{ post.answers.length }} Answers
        </p>
        <div class="flex items-center">
          <p class="text-gray-800 text-base font-bold">Sort by</p>
          <div class="relative flex ml-4">
            <select
              id="select-category"
              name="category"
              placeholder="Sort by..."
              autocomplete="off"
              class="block rounded-lg border-[0.1rem] cursor-pointer focus:outline-none text-sm"
            >
              <option class="text-sm">Newest</option>
              <option class="text-sm">Highest score</option>
              <option class="text-sm">Treding</option>
            </select>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="border-b" v-for="(post, idx) in post.answers" :key="idx">
          <AnswerItem :post="post" />
        </div>
      </div>
      <div
        class="
          bg-white
          flex
          justify-between
          mt-8
          items-center
          px-4
          py-2
          rounded-xl
        "
      >
        <p class="text-gray-400 text-sm">Add answer</p>
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
          @click="toggleAddAnswer()"
        >
          <span class="material-icons text-white text-sm">add</span>
        </button>
      </div>
      <div v-if="addingAnswer" class="mb-8">
        <AnswerForm
          @addedAnswer="addedAnswer"
          @cancelAnswer="toggleAddAnswer"
          :parent-id="post._id"
          :parent-type="'post'"
        />
      </div>
    </div>
    <div v-else class="w-full flex justify-center h-full pt-32">
      <HashLoader />
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { mapState } from "pinia";
import AnswerForm from "@/components/AnswerForm.vue";

export default {
  data: () => ({
    post: null,
    addingAnswer: false,
  }),
  async mounted() {
    const postStore = usePostStore();
    postStore.getPostsData();

    this.post = await postStore.getPost(this.$route.params.id);
  },
  components: { DetailItem, HashLoader, AnswerForm },
  computed: {
    ...mapState(usePostStore, ["posts"]),
  },

  methods: {
    toggleAddAnswer() {
      this.addingAnswer = !this.addingAnswer;
    },
    addedAnswer(answer) {
      this.post.answers.push(answer);
      this.addingAnswer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>