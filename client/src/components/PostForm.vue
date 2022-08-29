<template>

    <form class="flex-grow-1 w-9/12" @submit.prevent="createPost">

        <div class="flex background-white-grey tab-view">
            <div class="w-full flex">
                <div class="px-8 tabs-content mt-4">

                    <div class="tab-content active">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="title">Title</label>
                                <input id="title" name="title" v-model="title"
                                    class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Title..." />
                            </div>
                        </div>

                        <div class="field mt-5">
                            <div>
                                <label class="block font-semibold mb-2 text-sm" for="body">Body</label>

                                <editor :init="init" v-model="body" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ml-2 mt-8 py-3 sm:px-6 text-center inline-block">
            <button type="submit" @click="createPost()" class="
            inline-flex
            justify-center
            py-2
            px-8
            w-full
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-white
            bg-indigo-600
            hover:bg-indigo-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-indigo-500
          ">
                Save
            </button>
        </div>

    </form>

</template>
  
  <script>
  // TinyMCE
  import 'tinymce/tinymce'
  import 'tinymce/icons/default/icons'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/models/dom/model'
  import 'tinymce/skins/ui/oxide/skin.css'
  import contentUiCss from 'tinymce/skins/ui/oxide/content.css';
  
  // TinyMCE plugins
  // https://www.tiny.cloud/docs/tinymce/6/plugins/
  import 'tinymce/plugins/lists/plugin'
  import 'tinymce/plugins/link/plugin'
  import 'tinymce/plugins/image/plugin'
  import 'tinymce/plugins/table/plugin'
  import 'tinymce/plugins/code/plugin'
  import 'tinymce/plugins/help/plugin'
  import 'tinymce/plugins/wordcount/plugin'
  
  import Editor from '@tinymce/tinymce-vue'
  
  import axios from 'axios'
  import { useAuthStore } from '../stores/auth/auth'

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  export default {
      components: {
          'editor': Editor
      },
      setup() {
          return {
              init: {
                  skin: false,
                  plugins: 'lists link image table code help wordcount',
                  content_css: false,
                  content_style: contentUiCss.toString(),
              },
          }
      },
      data: () => ({ title: "", body: "" }),
      methods: {
          async createPost() {
  
              const authStore = useAuthStore();
  
              this.error = "";
              if (!this.title) {
                  this.error = "Please enter title";
                  return;
              }
              const newModel = {
                  title: this.title,
                  body: this.body,
                  owner: authStore.user._id,
              };
              console.log(newModel);
  
                try {
                    axios
                        .post(`${serverUrl}/users/${authStore.user._id}/posts`, newModel, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authStore.token}`,
                                "x-access-token": authStore.token,
                            },
                        })
                        .then((res) => {
                            console.log(res);
                        });
                } catch (error) {
                    console.error("create post", error);
                }
          },
      },
  };
  </script>