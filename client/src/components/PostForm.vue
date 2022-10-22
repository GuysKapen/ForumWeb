<template>

    <form class="flex-grow-1 w-9/12 flex" @submit.prevent="submit">

        <div class="w-8/12">
            <div class="flex background-white-grey tab-view">
                <div class="w-full flex">
                    <div class="px-8 tabs-content mt-4 w-full">

                        <div class="tab-content active w-full">
                            <div class="field">
                                <div class="control">
                                    <label class="block font-semibold text-sm" for="title">Title</label>
                                    <input id="title" name="title" v-model="newModel.title"
                                        class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                        type="text" autofocus placeholder="Title..." />
                                </div>
                            </div>

                            <div class="field mt-5">
                                <div>
                                    <label class="block font-semibold mb-2 text-sm" for="body">Body</label>

                                    <editor :init="init" v-model="newModel.body" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex-grow-1 w-4/12 pt-12 ml-6 shadow-md px-6 py-4">
            <div class="field">
                <div class="control flex flex-col flex-wrap mt-2 justify-start">
                    <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Categories</label>
                    <div class="mt-2">

                        <div class="relative flex w-full">
                            <select v-model="newModel.category" id="select-category" name="category"
                                placeholder="Select categories..." autocomplete="off"
                                class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                <option v-for="(category, idx) in categories" :key="idx" :value="category._id">
                                    {{ category.name }}</option>
                            </select>
                        </div>

                        <span class="text-xs italic">The categories of the post</span>
                    </div>
                </div>

            </div>

            <div class="mt-8 py-3 text-center ">
                <button type="submit" class="
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

import TomSelect from 'tom-select'

import axios from 'axios'
import { useAuthStore } from '../stores/auth/auth'

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
    props: {
        model: Object,
    },
    emits: {
        updated: null,
        added: null,
        cancel: null
    },
    mounted() {
        axios.get(`${serverUrl}/categories`).then(res => {
            this.categories = res.data;
        })
    },
    components: {
        'editor': Editor
    },
    watch: {
        categories() {
            if (this.categories.length > 1) {
                setTimeout(function () {
                    new TomSelect('#select-category', {});
                }, 0)
            }
        }
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
    data: function () {
        return {
            freshData: {
                title: "",
                body: "",
                parentType: this.parentType,
                parent: this.parentId,
                category: null
            },
            categories: []
        }
    },
    computed: {
        newModel() {
            return this.model ?? this.freshData
        }
    },
    methods: {
        async submit() {
            const newModel = this.newModel
            this.error = "";
            if (!newModel.title) {
                this.error = "Please enter title";
                return;
            }

            if (!newModel.body) {
                this.error = "Please enter body";
                return;
            }

            if (newModel._id) {
                this.update(newModel._id, newModel)
            } else {
                this.add(newModel)
            }

        },

        async add(newModel) {
            const authStore = useAuthStore();
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
                        this.$emit("added", res.data)
                    });
            } catch (error) {
                console.error("create post", error);
            }
        },

        async update(id, newModel) {
            const authStore = useAuthStore();
            try {
                axios
                    .put(`${serverUrl}/users/${authStore.user._id}/posts/${id}`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((res) => {
                        this.$emit("updated", res.data)
                    });
            } catch (error) {
                console.error("create post", error);
            }
        },
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
                category: this.selectedCategoryId,
                owner: authStore.user._id,
            };
        },
    },
};
</script>

<style>
@import 'tom-select/dist/css/tom-select.default.css';
</style>