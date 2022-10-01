<template>
  <div class="w-6/12 py-8 px-6">
    <div class="bg-white flex justify-between items-center px-4 py-2 rounded-xl">
      <p class="text-gray-400 text-sm">Add new</p>
      <router-link tag="div" class-active="active" to="/admin/recruitment/new" exact>
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
      <RecruitmentItem v-for="(recruitment, idx) in recruitments" :key="idx" :recruitment="recruitment" />
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { mapState, mapActions } from 'pinia'

import RecruitmentItem from "@/components/RecruitmentItem.vue";
export default {
  async mounted() {
    this.getRecruitmentsData(this.$route.query);
  },
  watch: {
    '$route'() {
      // this will be called any time the route changes
      this.getRecruitmentsData(this.$route.query);
    }
  },
  methods: {
    ...mapActions(usePostStore, ["getRecruitmentsData"]),
  },
  components: { RecruitmentItem },
  computed: {
    ...mapState(usePostStore, ["recruitments"]),
  },
};
</script>

<style lang="scss" scoped>

</style>