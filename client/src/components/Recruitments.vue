<template>
  <div class="w-6/12 py-8 px-6">
    <div class="bg-white flex justify-between items-center px-4 py-2 rounded-xl">
      <p class="text-gray-400 text-sm">Add new</p>
      <router-link tag="div" class-active="active" :to="{ name: 'recruiter-recruitment-new' }" exact>
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
    <div v-if="pagesInfo" class="flex justify-end">
      <Pagination :options="pagesInfo" @onPageChanged="update" />
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/posts/posts";
import { mapState, mapActions } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import RecruitmentItem from "@/components/RecruitmentItem.vue";
import axios from "axios";
import Pagination from "./Pagination.vue";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  data: () => ({
    recruitments: [],
    pagesInfo: null,
    perpage: 6,
  }),
  async mounted() {
    if ("q" in this.$route.query || "search" in this.$route.query) {
      const res = await axios.get(`${serverUrl}/search/recruitments`, {
        params: {
          name: this.$route.query["q"] || this.$route.query["search"],
          limit: this.perpage,
        },
      });
      const { docs, ...pagesInfo } = res.data;
      this.recruitments = docs;
      this.pagesInfo = pagesInfo;
    } else {
      const { docs, ...pagesInfo } = await this.getRecruitmentsData(
        this.$route.query,
        this.perpage
      );

      this.recruitments = docs;
      this.pagesInfo = pagesInfo;
    }
  },
  watch: {
    async $route() {
      // this will be called any time the route changes
      this.update();
    },
  },
  methods: {
    ...mapActions(usePostStore, ["getRecruitmentsData"]),
    async update(page = 0) {
      if ("q" in this.$route.query || "search" in this.$route.query) {
        const res = await axios.get(`${serverUrl}/search/recruitments`, {
          params: {
            name: this.$route.query["q"] || this.$route.query["search"],
            page: page,
            limit: this.perpage,
          },
        });
        const { docs, ...pagesInfo } = res.data;
        this.recruitments = docs;
        this.pagesInfo = pagesInfo;
      } else {
        const { docs, ...pagesInfo } = await this.getRecruitmentsData(
          Object.assign({}, this.$route.query, { page: page }),
          this.perpage
        );
        this.recruitments = docs;
        this.pagesInfo = pagesInfo;
      }
    },
  },
  computed: {
    isRecruiter() {
      const authStore = useAuthStore();
      if (
        authStore.token == null ||
        authStore.user == null ||
        (authStore.user.role !== "recruiter" && authStore.user.role !== "admin")
      ) {
        return false;
      }
      return true;
    },
  },
  components: { RecruitmentItem, Pagination },
};
</script>

<style lang="scss" scoped>

</style>