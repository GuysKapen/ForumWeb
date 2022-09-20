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
  <div class="flex-grow">
    <div class="flex-grow flex px-8 py-12" v-if="recruitment != null">
      <div class="flex-grow pr-8">
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-bold text-gray-800">teamzo</h3>
          <div class="flex">
            <p class="text-sm text-gray-600 mr-4">Job updated: {{moment(new Date( parseInt( recruitment._id.substring(0,
            8), 16 ) * 1000 )).fromNow()}}</p>
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
          <div @click="toggleApplyForm(true)"
            class="bg-indigo-700 hover:bg-indigo-800 cursor-pointer text-white font-black text-xs px-4 py-3 text-center rounded-md mt-4">
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

      <!-- Main modal -->
      <div id="authentication-modal" tabindex="-1" aria-hidden="true" v-if="showApplyForm"
        class="backdrop-blur-sm overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 w-full max-w-md h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" @click="toggleApplyForm(false)"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg" data-darkreader-inline-fill=""
                style="--darkreader-inline-fill:currentColor;">
                <path fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"></path>
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="py-6 px-6 lg:px-8">
              <h3 class="mb-4 text-base font-black text-gray-900 dark:text-white">Apply to {{recruitment.name}}</h3>
              <form class="space-y-6" @submit.prevent="add()">
                <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
                    phone</label>
                  <input type="phone" name="phone" id="phone" v-model="phone"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="+09 ..." required="">
                </div>
                <div class="mt-8">
                  <label class="block text-sm font-semibold"> File </label>
                  <div
                    class="mt-1 flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div class="space-y-1 text-center">
                      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                        aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <div class="flex text-sm text-gray-600 justify-center">
                        <label for="cover"
                          class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Upload a file</span>
                          <input id="cover" name="cover" type="file" class="sr-only"
                            v-on:change="onFileSelected($event)">
                        </label>
                        <p class="pl-1">or drag and drop</p>
                      </div>
                      <p class="text-xs text-gray-500">DOC, PDF up to 10MB</p>
                    </div>
                    <div class="flex items-center mt-4" v-if="selectedFile != null">
                      <span class="material-icons text-sm">description</span>
                      <p class="text-xs text-gray-500 ml-3">{{this.selectedFile.name}}</p>
                    </div>
                  </div>
                </div>

                <button type="submit"
                  class="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Apply</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full flex justify-center pt-32">
      <HashLoader />
    </div>
  </div>
</template>

<script>
import { createToast } from 'mosha-vue-toastify';

import { usePostStore } from "@/stores/posts/posts";
import { mapState } from 'pinia'
import AnswerForm from "@/components/AnswerForm.vue";
import { imgUrlFor } from '../utils/utils';

import { useAuthStore } from "../stores/auth/auth";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  data: () => ({
    recruitment: null,
    addingAnswer: false,
    showApplyForm: false,
    selectedFile: null,
    phone: null,
    cv: null
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
    },
    toggleApplyForm(show) {
      this.showApplyForm = show;
    },
    onFileSelected(e) {
      const selectedFile = e.target.files[0];
      // uploading asset to sanity
      if (selectedFile.type === 'application/pdf' || selectedFile.type === 'application/msword' || selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        this.selectedFile = selectedFile;
      } else {
        console.log("Wrong file type");
      }
    },

    async add() {
      const authStore = useAuthStore();

      this.error = "";
      if (!this.phone) {
        this.error = "Please enter name";
        return;
      }
      const newModel = {
        phone: this.phone,
        cv: this.cv,
        recruitment: this.recruitment._id
      };

      try {

        let res;
        if (this.selectedFile != null) {
          const form = new FormData();
          form.append('file', this.selectedFile);
          res = await axios.post(`${serverUrl}/users/${authStore.user._id}/uploads/file`, form, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authStore.token}`,
              'x-access-token': authStore.token,
            }
          })
          this.cv = res.data.data.name
        }

        newModel.cv = this.cv;
        axios
          .post(`${serverUrl}/users/${authStore.user._id}/applies`, newModel, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authStore.token}`,
              "x-access-token": authStore.token,
            },
          })
          .then((res) => {
            createToast('Success apply for the recruitment', { type: 'success' })
            this.showApplyForm = false;
          });
      } catch (error) {
        console.error("Add apply", error);
        createToast('Failed to apply!', { type: 'error' })
      }
    },
  }
};
</script>

<style lang="scss" scoped>

</style>