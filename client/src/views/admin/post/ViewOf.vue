<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import moment from 'moment';
</script>
    
<template>
    <div class="flex-grow w-8/12 p-4 space-y-4">

        <div class="container-fluid">
            <!-- Exportable Table -->
            <div class="row clearfix">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="card m-8 shadow-lg rounded-md px-8 pb-8">
                        <div class="flex justify-between">
                            <div class="flex items-center">
                                <h2 class="text-xl font-bold leading-7 text-gray-900 sm:text-2xl sm:truncate">
                                    Answers of {{post?.title || ''}}
                                </h2>
                                <span
                                    class="inline-flex ml-4 items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-indigo-600 rounded-full">{{
                                    applies.length }}</span>
                            </div>

                            <router-link :to="{name: 'post-new'}"
                                class="inline-flex justify-center py-2 px-8 rounded-full border border-transparent shadow-sm text-sm font-black text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                New
                            </router-link>
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
                                                       Applyer 
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap tracking-wider">
                                                        Created At
                                                    </th>
                                                    <th scope="col"
                                                        class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody class="bg-white divide-y divide-gray-200">

                                                <tr v-for="(apply, idx) in applies" :key="idx">
                                                    <td class="text-sm font-medium text-gray-900 px-6">{{ idx + 1 }}
                                                    </td>
                                                    <td class="text-sm font-medium capitalize text-gray-900 px-6">{{ apply.owner.name
                                                    }}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {{moment(new Date( parseInt( apply._id.substring(0, 8), 16 ) *
                                                        1000 )).format('DD/MM/YYYYY')}}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a href="{{ route('admin.language.edit', company._id) }}"
                                                            class="text-indigo-600 hover:text-indigo-900 mx-2">Edit</a>

                                                        <button class="text-red-600 hover:text-red-900" type="button"
                                                            @click="deleteModel(apply._id)">
                                                            Delete
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
        axios.get(`${serverUrl}/recruitments/${this.$route.params.refId}`).then(res => {
            this.recruitment = res.data
            this.applies = res.data.applies;
        })
    },
    data: () => ({
        post: null,
        applies: []
    }),
    methods: {
        deleteModel(id) {
            const self = this;
            showConfirmPopup(function () {
                const authStore = useAuthStore()
                axios.delete(`${serverUrl}/posts/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                        "x-access-token": authStore.token,
                    },
                }).then(function () {
                    self.applies = self.applies.filter(item => item._id !== id);
                    createToast('Success delete post', { type: 'success' })
                })
            })
        }
    }
}
</script>
    