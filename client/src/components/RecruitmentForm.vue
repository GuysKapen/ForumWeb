<template>

    <div class="my-8 flex-grow mx-auto pl-8 pr-16">
        <div class="header">
            <h2 class="text-2xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Add new recruitment
            </h2>
        </div>

        <div class="mt-8">

            <div>
                <form enctype="multipart/form-data" @submit.prevent="submit">

                    <div class="mb-4 px-2 w-full">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="name">Recruitment name</label>
                                <input id="name" name="name" v-model="newModel.name"
                                    class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Recruitment name..." />
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 px-2 w-full">
                        <div class="flex justify-between">
                            <div class="field">
                                <div class="control">
                                    <label class="block font-semibold text-sm" for="name">Start date</label>
                                    <datepicker v-model="newModel.startDate" name="start-date" class="my-2">
                                    </datepicker>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="block font-semibold text-sm" for="name">End date</label>
                                    <datepicker v-model="newModel.endDate" name="end-date" class="my-2"></datepicker>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-2">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Company</label>
                                <div class="my-2">

                                    <input v-if="user.role === 'recruiter'" id="name" name="name" disabled v-model="user.company.name"
                                        class="string w-full px-4 py-2 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                        type="text" autofocus placeholder="Company" />
                          
                                    <div v-else class="relative flex w-full">
                                        <select v-model="newModel.company" id="select-company" name="company"
                                            placeholder="Select company..." autocomplete="off"
                                            class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                            <option v-for="(model, idx) in companies" :key="idx" :value="model._id">
                                                {{ model.name }}</option>
                                        </select>
                                    </div>

                                    <span class="text-xs italic">The company that post the recruitment</span>
                                </div>
                            </div>

                        </div>

                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Fields</label>
                                <div class="my-2">

                                    <div class="relative flex w-full">
                                        <select v-model="newModel.fields" id="select-field" name="field" multiple
                                            placeholder="Select fields..." autocomplete="off"
                                            class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                            <option v-for="(model, idx) in fields" :key="idx" :value="model._id">
                                                {{ model.name }}</option>
                                        </select>
                                    </div>

                                    <span class="text-xs italic">The fields of the post</span>
                                </div>
                            </div>

                        </div>

                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Skills</label>
                                <div class="my-2">

                                    <div class="relative flex w-full">
                                        <select v-model="newModel.skills" id="select-skills" name="skill"
                                            placeholder="Select skills..." autocomplete="off" multiple
                                            class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                            <option v-for="(model, idx) in skills" :key="idx" :value="model._id">
                                                {{ model.name }}</option>
                                        </select>
                                    </div>

                                    <span class="text-xs italic">The skills of the recruitment</span>
                                </div>
                            </div>

                        </div>

                        <div class="field mt-5">
                            <div>
                                <label class="block font-semibold mb-2 text-sm" for="body">Content</label>

                                <editor :init="init" v-model="newModel.content" />
                            </div>
                        </div>

                        <div class="mt-8">
                            <label class="block text-sm font-semibold"> File </label>
                            <div
                                class="mt-1 flex-col justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div class="space-y-1 text-center">
                                    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                                        viewBox="0 0 48 48" aria-hidden="true">
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
                                    <p class="text-xs text-gray-500 ml-3">{{ this.selectedFile.name }}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="py-3 text-right px-2 flex justify-between">
                        <a href="{{ route('admin.category.index') }}"
                            class="inline-flex justify-center py-2 px-8 rounded-full border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Back
                        </a>
                        <button type="submit"
                            class="inline-flex justify-center py-2 px-8 rounded-full border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                    </div>
                </form>


            </div>



        </div>

    </div>


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

import Datepicker from 'vuejs3-datepicker';
import TomSelect from 'tom-select'

import axios from 'axios'
import { useAuthStore } from '../stores/auth/auth'
import { createToast } from 'mosha-vue-toastify'
import { mapState } from "pinia";


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
        axios.get(`${serverUrl}/companies`).then(res => {
            this.companies = res.data;
        })
        axios.get(`${serverUrl}/skills`).then(res => {
            this.skills = res.data;
        })
        axios.get(`${serverUrl}/fields`).then(res => {
            this.fields = res.data;
        })
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
        const authStore = useAuthStore()
        return {
            freshData: {
                name: "",
                content: "",
                startDate: new Date(),
                endDate: new Date(),
                company: authStore.user?.company?._id,
                fields: [],
                skills: [],
                file: null
            },
            companies: [],
            fields: [],
            skills: [],
            selectedFile: null,
        }
    },
    computed: {
        ...mapState(useAuthStore, ["user"]),
        newModel() {
            return this.model ?? this.freshData
        },
    },
    components: {
        Datepicker, Editor
    },
    watch: {
        companies() {
            if (this.companies.length > 1) {
                setTimeout(function () {
                    new TomSelect('#select-company', {});
                }, 0)
            }
        },
        fields() {
            if (this.fields.length > 1) {
                setTimeout(function () {
                    new TomSelect('#select-field', {});
                }, 0)
            }
        },
        skills() {
            if (this.skills.length > 1) {
                setTimeout(function () {
                    new TomSelect('#select-skills', {});
                }, 0)
            }
        }
    },
    methods: {
        async submit() {
            const newModel = this.newModel
            if (newModel._id) {
                this.update(newModel._id, newModel)
            } else {
                this.add(newModel)
            }

        },

        async add(newModel) {
            const authStore = useAuthStore();
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
                    newModel.file = res.data.data.name
                }

                axios
                    .post(`${serverUrl}/users/${authStore.user._id}/recruitments`, newModel, {
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
                console.error("Add recruitment", error);
            }
        },

        async update(id, newModel) {
            const authStore = useAuthStore();
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
                    newModel.file = res.data.data.name
                }

                axios
                    .put(`${serverUrl}/users/${authStore.user._id}/recruitments/${id}`, newModel, {
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
                console.error("Add recruitment", error);
            }
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
    },
};
</script>