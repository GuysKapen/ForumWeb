<script setup>
import { imgUrlFor } from '../utils/utils';
import CommentItem from "@/components/CommentItem.vue";
import CommentForm from '@/components/CommentForm.vue';

const serverUrl = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div class="bg-white px-8 pt-8 py-16 relative">
    <div class="flex items-center justify-between mt-4">
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
          <img :src="imgUrlFor(serverUrl, post.owner?.profile?.cover)" alt="profile"
            class="w-8 h-8 rounded-lg flex-shrink-0 object-cover" />
        </div>

        <div class="ml-3 text-sm">
          <p class="text-gray-500 capitalize">{{ post.owner.name }}</p>
          <span class="text-gray-300 text-sm">6 days ago</span>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <div class="text-gray-700 text-sm" v-html="post.comment"></div>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex">
        <div class="bg-gray-50 rounded-xl border border-gray-200 mr-8">
          <button type="button" class="
              flex
              items-center
              text-gray-400
              hover:text-indigo-500
              w-8
              h-8
              justify-center
              relative
            ">
            <span class="
                w-[6px]
                h-[6px]
                rounded-full
                bg-indigo-600
                absolute
                top-[-0.125rem]
                right-[-0.125rem]
              "></span>
            <span class="material-icons text-base relative"> bookmark </span>
          </button>
        </div>

        <div class="bg-gray-50 rounded-xl border border-gray-200 mr-8">
          <button type="button" @click="toggleAddComment()" class="
              px-4
              flex
              items-center
              text-gray-400
              hover:text-indigo-500
              h-8
              justify-center
              relative
            " :class="addingComment ? 'text-indigo-500' : ''">
            <span class="material-icons text-base relative mt-1"> chat </span>
            <span class="text-sm ml-4"> Comment </span>
          </button>
        </div>
      </div>
      <div class="absolute right-0 w-32 h-32">
        <div class="
            bg-white
            p-[0.125rem]
            absolute
            top-0
            left-0
            w-10
            h-10
            rounded-lg
          ">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopEztCTlDuKPFkQVgFBKsJuxp8Ogd-RI1nA&usqp=CAU"
            alt="profile" class="w-full h-full rounded-lg flex-shrink-0 object-cover" />
        </div>

        <div class="
            bg-white
            p-[0.125rem]
            absolute
            top-4
            left-6
            w-10
            h-10
            rounded-lg
          ">
          <img
            src="https://www.worldphoto.org/sites/default/files/139813_158163_0_%20%C2%A9%20Noel%20Guevara%2C%20Philippines%2C%20Commended%2C%20Open%20Competition%2C%20Portraits%2C%202017%20Sony%20World%20Photography%20Awards.jpg"
            alt="profile" class="w-full h-full rounded-lg flex-shrink-0 object-cover" />
        </div>

        <div class="
            bg-white
            p-[0.125rem]
            absolute
            -top-2
            left-12
            w-10
            h-10
            rounded-lg
            z-20
          ">
          <img
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            alt="profile" class="w-full h-full rounded-lg flex-shrink-0 object-cover" />
        </div>

        <div class="
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
          ">
          <span class="text-gray-300 text-sm">12+</span>
        </div>
      </div>


    </div>
    <div class="mt-12">
      <CommentForm v-if="addingComment" @addedComment="addedComment" :parent-id="post._id" :parent-type="'post'" />
      <CommentItem v-for="(comment, idx) in post.comments" :key="idx" :comment="comment" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['post'],
  data: () => ({
    addingComment: false,
  }),
  methods: {
    toggleAddComment() {
      this.addingComment = !this.addingComment
    },

    addedComment(comment) {
      this.post.comments.push(comment)
      this.addingComment = false;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>