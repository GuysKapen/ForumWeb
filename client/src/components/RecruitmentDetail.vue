<script setup>
import DetailItem from "@/components/DetailItem.vue";
import AnswerItem from "@/components/AnswerItem.vue";
import CommentForm from "./CommentForm.vue";
import HashLoader from "@/components/HashLoader.vue";

import { imgUrlFor } from '../utils/utils'

import moment from 'moment';

const serverUrl = import.meta.env.VITE_SERVER_URL;

</script>
<template>
  <div>
    <div class="flex-grow flex px-8 py-12" v-if="recruitment != null">
      <div class="flex-grow pr-8">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold text-gray-800">teamzo</h3>
          <div class="flex">
            <p class="text-sm text-gray-600 mr-4">Job updated: {{moment(new Date( parseInt( recruitment._id.substring(0, 8), 16 ) * 1000 )).fromNow()}}</p>
            <p class="text-sm text-gray-600">Job ID: {{recruitment._id.slice(8, 18)}}</p>
          </div>
        </div>
        <div class="mt-6">
          <h2 class="text-2xl text-gray-800 font-black">{{recruitment.name}}</h2>
        </div>
        <div class="my-4 flex">
          <div
            class="bg-gray-100 text-gray-800 font-bold text-xs inline-flex items-center px-2.5 py-0.5 rounded-lg mr-2">
            <span class="material-icons text-xs">category</span>
            <span class="text-[0.65rem] ml-2">
              Design
            </span>
          </div>
          <div
            class="bg-gray-100 text-gray-800 font-bold text-xs inline-flex items-center px-2.5 py-0.5 rounded-lg mr-2">
            <span class="material-icons text-xs">calendar_today</span>
            <span class="text-[0.65rem] ml-2">
              Fulltime
            </span>
          </div>
          <div
            class="bg-gray-100 text-gray-800 font-bold text-xs inline-flex items-center px-2.5 py-0.5 rounded-lg mr-2">
            <span class="material-icons text-xs">public</span>
            <span class="text-[0.65rem] ml-2">
              Remote
            </span>
          </div>
        </div>
        <div class="text-sm">
          <div v-html="recruitment.content"></div>
        </div>
      </div>

      <div class="w-4/12 flex-shrink-0 px-4">
        <div class="bg-gray-100 rounded-md flex-col justify-center items-center text-center p-6">
          <p class="text-sm">Sounds like a match?</p>
          <div class="bg-indigo-700 text-white font-black text-xs px-4 py-3 text-center rounded-md mt-4">
            Apply Now
          </div>
          <div class="bg-indigo-200 text-gray-800 font-black text-xs px-4 py-3 text-center rounded-md mt-4">
            Subcribe for updates
          </div>
          <p class="text-sm mt-4">Already applied?</p>
        </div>

        <div class="bg-gray-100 rounded-md flex-col justify-center items-center text-center p-6 mt-4">
          <div class="flex items-center">
            <div class="
            bg-gray-100
            rounded-lg
            flex
            items-center
            justify-center
            flex-shrink-0
            border border-gray-100
          ">
              <img :src="imgUrlFor(serverUrl, recruitment.owner.profile.cover)" alt="profile"
                class="w-8 h-8 rounded-lg flex-shrink-0 object-cover" />
            </div>

            <div class="ml-3 text-sm">
              <p class="text-gray-800 font-bold">Elisabeth May</p>
              <span class="text-gray-300 text-sm">Contact Person</span>
            </div>
          </div>
          <div class="bg-white rounded-md p-4 text-left mt-4">
            <p class="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quam dignissimos illum iusto
              praesentium explicabo vitae? Illum in, distinctio, porro quisquam dolores ea quia</p>
          </div>
          <div class="bg-indigo-200 text-gray-800 font-black text-xs px-4 py-3 text-center rounded-md mt-4">
            Drop us a line
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm mt-4">Share this job</p>
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
import { imgUrlFor } from '../utils/utils';

export default {
  data: () => ({
    recruitment: null,
    addingAnswer: false
  }),
  async mounted() {
    const postStore = usePostStore();
    this.recruitment = await postStore.getRecruitment(this.$route.params.id)
  },
  components: { DetailItem, HashLoader, AnswerForm },

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