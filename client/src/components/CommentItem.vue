<script setup>
import { imgUrlFor } from '../utils/utils';
const serverUrl = import.meta.env.VITE_SERVER_URL;
</script>
<template>
  <div class="bg-white px-8 mt-6 relative border-b pb-6">
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
          <img :src="imgUrlFor(serverUrl, comment.owner.profile.cover)" alt="profile"
            class="w-6 h-6 rounded-full flex-shrink-0 object-cover" />
        </div>

        <div class="ml-3 text-sm">
          <p class="text-gray-500 capitalize">{{ comment.owner.name }}</p>
        </div>
      </div>
      <div class="
          bg-indigo-100
          rounded-xl
          flex
          items-center
          justify-center
          ml-4
          px-4
          py-1
          flex-shrink-0
          border border-indigo-200
        ">
        <span class="text-xs text-indigo-600">{{ "6 days ago" }}</span>
      </div>
    </div>
    <div class="mt-4">
      <div class="text-gray-700 text-sm">{{ comment.comment }}</div>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex justify-between space-x-6 mt-4">
        <a href="" class="text-xs hover:text-indigo-600">Reply</a>
        <a href="" class="text-xs hover:text-indigo-600">Share</a>
        <a href="" class="text-xs hover:text-indigo-600">Report</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comment'],
};
</script>

<style lang="scss" scoped>
</style>