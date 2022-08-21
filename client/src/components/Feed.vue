<script setup>
import FeedItem from "@/components/FeedItem.vue";
</script>
<template>
  <div class="w-6/12 py-8 px-6">
    <div
      class="bg-white flex justify-between items-center px-4 py-2 rounded-xl"
    >
      <p class="text-gray-400 text-sm">Add new thread</p>
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
      >
        <span class="material-icons text-white text-sm">add</span>
      </button>
    </div>

    <FeedItem />
    <FeedItem />
    <FeedItem />
    <FeedItem />
    <FeedItem />
  </div>
</template>

<script>
export default {
  components: { FeedItem },
};
</script>

<style lang="scss" scoped>
</style>