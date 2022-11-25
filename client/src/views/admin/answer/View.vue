<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import moment from 'moment';

import { truncate } from '@/utils/utils';
</script>
    
<template>
    <div class="flex-grow p-4 space-y-4">

        <div class="container-fluid">
            <!-- Exportable Table -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card mt-8 shadow-lg rounded-md p-8">
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
                                    All answers
                                </h2>
                                <span
                                    class="inline-flex ml-4 items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-indigo-600 rounded-full">{{
                                            answers.length
                                    }}</span>
                            </div>
                        </div>

                        <!-- This example requires Tailwind CSS v2.0+ -->
                        <div class="flex flex-col mt-4">
                            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table class="min-w-full divide-y divide-gray-200">
                                            <thead class="bg-gray-50">
                                                <tr>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        No
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Answer
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Question
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap tracking-wider">
                                                        Created At
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">

                                                <tr v-for="(answer, idx) in answers" :key="idx">
                                                    <td class="text-sm font-medium text-gray-900 px-6">{{ idx + 1 }}
                                                    </td>
                                                    <td class="text-sm py-4 font-medium text-gray-900 px-6">
                                                        <div v-html="truncate(answer.answer, 160)"></div>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <span v-if="answer.correct"
                                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Verified
                                                        </span>
                                                        <span v-else
                                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Unverified
                                                        </span>
                                                    </td>
                                                    <td class="text-sm font-medium text-gray-500 px-6 py-4">
                                                        {{ answer.post.title }}
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {{ moment(new Date(parseInt(answer._id.substring(0, 8), 16) *
                                                                1000)).format('DD/MM/YYYYY')
                                                        }}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium my-auto h-full">
                                                        <router-link
                                                            :to="{ name: 'answer-edit', params: { id: answer._id } }">

                                                            <button
                                                                class="p-3 mx-1 rounded-lg hover:bg-indigo-600 hover:text-white text-gray-400"
                                                                type="button">

                                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 24 24" style="width: 1rem;">
                                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                                    <path fill="currentColor"
                                                                        d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z" />
                                                                </svg>

                                                            </button>
                                                        </router-link>
                                                        <button
                                                            class="p-3 mx-1 rounded-lg hover:bg-indigo-600 hover:text-white text-gray-400"
                                                            type="button" @click="approveModel(answer._id)">
                                                            <svg viewBox="0 0 512 512" style="width: 1em;">
                                                                <path fill="currentColor"
                                                                    d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z">
                                                                </path>
                                                            </svg>
                                                        </button>

                                                        <button
                                                            class="p-3 mx-1 rounded-lg hover:bg-indigo-600 hover:text-white text-gray-400"
                                                            type="button" @click="deleteModel(answer._id)">
                                                            <svg viewBox="0 0 448 512" style="width: 1em;">
                                                                <path fill="currentColor"
                                                                    d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                                <!-- More people... -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <!-- #END# Exportable Table -->
        </div>

    </div>

</template>

<script>
import { createToast } from 'mosha-vue-toastify';
import axios from 'axios'
import { useAuthStore } from '@/stores/auth/auth'
import { showConfirmPopup } from '@/utils/utils'
const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
    mounted() {
        const authStore = useAuthStore()
        axios.get(`${serverUrl}/admin/answers`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authStore.token}`,
                "x-access-token": authStore.token,
            },
        }).then(res => {
            this.answers = res.data;
        })
    },
    data: () => ({
        answers: []
    }),
    methods: {
        deleteModel(id) {
            const self = this;
            showConfirmPopup(function () {
                const authStore = useAuthStore()
                axios.delete(`${serverUrl}/admin/answers/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                        "x-access-token": authStore.token,
                    },
                }).then(function () {
                    self.answers = self.answers.filter(item => item._id !== id);
                    createToast('Success delete post', { type: 'success' })
                })
            })
        },
        approveModel(id) {
            const self = this;
            showConfirmPopup(function () {
                const authStore = useAuthStore()
                axios.put(`${serverUrl}/admin/answers/${id}/approve`, { status: true }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                        "x-access-token": authStore.token,
                    },
                }).then(function () {
                    self.answers = self.answers.map(item => item._id === id ? Object.assign(item, { correct: true }) : item);
                    createToast('Success approve answer', { type: 'success' })
                })
            }, "Do you really want to approve?", "Approve")
        }
    }
}
</script>
    