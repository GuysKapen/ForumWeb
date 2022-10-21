<template>
    <div class="mt-8">
        <div>
            <form enctype="multipart/form-data" @submit.prevent="submit()">

                <div class="mb-4 px-2 w-full">
                    <div class="field">
                        <div class="control">
                            <label class="block font-semibold text-sm" for="name">Field name</label>
                            <input id="name" name="name" v-model="newModel.name"
                                class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                type="text" autofocus placeholder="Name..." />
                        </div>
                    </div>
                </div>

                <div class="py-3 text-right px-2 flex justify-between">
                    <a href="/"
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
</template>
  
<script>

import axios from 'axios'
import { useAuthStore } from '@/stores/auth/auth'
import { } from '@/utils/utils'
import { createToast } from 'mosha-vue-toastify';

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
    props: {
        model: Object
    },
    data: function () {
        return { freshData: { name: "" } }
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
            if (!newModel.name) {
                this.error = "Please enter name";
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
                    .post(`${serverUrl}/fields`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((_) => {
                        createToast("Success add model", { type: 'success' })
                        this.$router.push({ name: "category-index" })
                    });
            } catch (error) {
                createToast("Error add model", { type: 'danger' })
            }
        },

        async update(id, newModel) {
            const authStore = useAuthStore();
            try {
                axios
                    .put(`${serverUrl}/fields/${id}`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((_) => {
                        createToast("Success update model", { type: 'success' })
                        this.$router.push({ name: "-index" })
                    });
            } catch (error) {
                createToast("Error update model", { type: 'danger' })
            }
        }
    },
};
</script>