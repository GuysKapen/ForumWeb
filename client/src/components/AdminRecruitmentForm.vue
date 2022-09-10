<template>

    <div class="my-8 w-1/2 mx-auto py-16 px-8">
        <div class="header">
            <h2 class="text-2xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Add new recruitment
            </h2>
        </div>

        <div class="mt-8">

            <div>
                <form enctype="multipart/form-data" @submit.prevent="add()">

                    <div class="mb-4 px-2 w-full">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="name">Category name</label>
                                <input id="name" name="name" v-model="name"
                                    class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Category name..." />
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 px-2 w-full">
                        <div class="flex justify-between">
                            <div class="field">
                                <div class="control">
                                    <label class="block font-semibold text-sm" for="name">Start date</label>
                                    <datepicker v-model="startDate" name="start-date" class="my-2"></datepicker>
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <label class="block font-semibold text-sm" for="name">End date</label>
                                    <datepicker v-model="endDate" name="end-date" class="my-2"></datepicker>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-2">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Company</label>
                                <div class="my-2">

                                    <div class="relative flex w-full">
                                        <select v-model="selectedCompanyId" id="select-company" name="company"
                                            placeholder="Select company..." autocomplete="off"
                                            class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                            <option v-for="(model, idx) in companies" :key="idx"
                                                :value="model._id">
                                                {{ model.name }}</option>
                                        </select>
                                    </div>

                                    <span class="text-xs italic">The company that post the recruitment</span>
                                </div>
                            </div>

                        </div>

                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Field</label>
                                <div class="my-2">

                                    <div class="relative flex w-full">
                                        <select v-model="selectedFieldId" id="select-field" name="field"
                                            placeholder="Select categories..." autocomplete="off"
                                            class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                            <option v-for="(model, idx) in fields" :key="idx"
                                                :value="model._id">
                                                {{ model.name }}</option>
                                        </select>
                                    </div>

                                    <span class="text-xs italic">The field of the post</span>
                                </div>
                            </div>

                        </div>

                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm mt-2 w-4/12" for="input1">Skills</label>
                                <div class="my-2">

                                    <div class="relative flex w-full">
                                        <select v-model="selectedSkillIds" id="select-skills" name="skill"
                                            placeholder="Select skills..." autocomplete="off"
                                            multiple
                                            class="block w-full rounded-sm cursor-pointer focus:outline-none">
                                            <option v-for="(model, idx) in skills" :key="idx"
                                                :value="model._id">
                                                {{ model.name }}</option>
                                        </select>
                                    </div>

                                    <span class="text-xs italic">The skills of the recruitment</span>
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
import Datepicker from 'vuejs3-datepicker';
import TomSelect from 'tom-select'

import axios from 'axios'
import { useAuthStore } from '../stores/auth/auth'


const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
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
    data: () => ({ name: "", startDate: new Date(), endDate: new Date(), companies: [], selectedCompanyId: null, fields: [], selectedFieldId: null, skills: [], selectedSkillIds: [] }),
    components: {
        Datepicker
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
        async add() {

            const authStore = useAuthStore();

            this.error = "";
            if (!this.name) {
                this.error = "Please enter name";
                return;
            }
            const newModel = {
                name: this.name,
            };

            try {
                axios
                    .post(`${serverUrl}/categories`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((res) => {
                        this.$router.push("/")
                    });
            } catch (error) {
                console.error("Add category", error);
            }
        },
    },
};
</script>