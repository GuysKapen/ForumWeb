<template>

    <div class="mt-8">

        <div>
            <form enctype="multipart/form-data" @submit.prevent="submit()">

                <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 w-full">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="name">Company name</label>
                                <input id="name" name="name" v-model="newModel.name"
                                    class="string w-full rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Name..." />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6 w-full">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="name">Company address</label>
                                <input id="name" name="name" v-model="newModel.address"
                                    class="string w-full rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Address..." />
                            </div>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                        <select id="country" name="country" autocomplete="country-name" v-model="newModel.country"
                            class="
                            mt-1
                            block
                            w-full
                            py-2
                            px-3
                            border border-gray-300
                            rounded-md
                            shadow-sm
                            focus:outline-none
                            bg-gray-100 focus:bg-white
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          ">
                            <option>United States</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                        </select>
                    </div>

                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" id="city" v-model="newModel.city" autocomplete="address-level2"
                            class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            bg-gray-100 focus:bg-white
                            border-gray-300
                            rounded-md
                          " />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                        <input type="text" name="region" id="region" v-model="newModel.state"
                            autocomplete="address-level1" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            bg-gray-100 focus:bg-white
                            border-gray-300
                            rounded-md
                          " />
                    </div>

                    <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal
                            code</label>
                        <input type="text" name="postal-code" id="postal-code" v-model="newModel.zipcode"
                            autocomplete="postal-code" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            bg-gray-100 focus:bg-white
                            border-gray-300
                            rounded-md
                          " />
                    </div>

                </div>
                <div class="py-3 text-right px-2 flex justify-between">
                    <router-link :to="{ name: 'company-index' }"
                        class="inline-flex justify-center py-2 px-8 rounded-full border border-transparent shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Back
                    </router-link>
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
        return { freshData: { name: "", address: "" } }
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

            if (!newModel.address) {
                this.error = "Please enter address";
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
                    .post(`${serverUrl}/companies`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((_) => {
                        createToast("Success add model", { type: 'success' })
                        this.$router.push({ name: "company-index" })
                    });
            } catch (error) {
                createToast("Error add model", { type: 'danger' })
            }
        },

        async update(id, newModel) {
            const authStore = useAuthStore();
            try {
                axios
                    .put(`${serverUrl}/companies/${id}`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((_) => {
                        createToast("Success update model", { type: 'success' })
                        this.$router.push({ name: "company-index" })
                    });
            } catch (error) {
                createToast("Error update model", { type: 'danger' })
            }
        }
    },
};
</script>