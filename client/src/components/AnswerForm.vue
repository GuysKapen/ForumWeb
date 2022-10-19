<template>

    <form class="flex-grow-1 w-full bg-white rounded-xl py-4 flex" @submit.prevent="addAnswer">

        <div class="w-full">
            <div class="flex background-white-grey tab-view">
                <div class="w-full flex">
                    <div class="px-8 tabs-content mt-4 w-full">

                        <div class="tab-content active w-full">

                            <div class="field mt-5">
                                <div>
                                    <label class="block font-semibold mb-2 text-sm" for="body">Add an answer</label>
                                    <editor :init="init" v-model="answer" />
                                </div>
                            </div>

                            <div class="mt-8 py-3 text-end flex justify-end space-x-6">
                                <button @click="this.$emit('cancelAnswer')"
                                    class="flex justify-end py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Cancel
                                </button>
                                <button type="submit"
                                    class="flex justify-end py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
    props: ['parentId', 'parentType'],
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
    data: () => ({ answer: "" }),
    methods: {
        async addAnswer() {

            const authStore = useAuthStore();
            try {
                if (this.answer.length === 0) {
                    error = "Please enter answer"
                    return
                }

                const newModel = {
                    answer: this.answer,
                    post: this.parentId,
                    parentType: this.parentType,
                    parent: this.parentId
                }

                try {
                    axios
                        .post(`${serverUrl}/users/${authStore.user._id}/answers`, newModel, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${authStore.token}`,
                                "x-access-token": authStore.token,
                            },
                        })
                        .then((res) => {
                            this.$emit("addedAnswer", res.data)
                        });
                } catch (error) {
                    console.error("Add answer", error);
                }

            } catch (error) {
                this.error = error;
            }

        },
    },
};
</script>

  <style>
  @import 'tom-select/dist/css/tom-select.default.css';
  </style>