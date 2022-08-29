<template>
    <div>
        <form class="flex flex-col items-center" @submit.prevent="login">


            <div class="flex background-white-grey tab-view">
                <div class="w-full flex">
                    <div class="px-8 tabs-content mt-4">

                        <div class="tab-content active">
                            <div class="field">
                                <div class="control">
                                    <label class="block font-semibold text-sm" for="email">Email</label>
                                    <input id="name" name="name" v-model="email"
                                        class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                        type="text" autofocus placeholder="Email" />
                                </div>
                            </div>

                            <div class="field mt-5">
                                <div>
                                    <label class="block font-semibold mb-2 text-sm" for="input1">Password</label>

                                    <input id="name" name="name" v-model="password"
                                        class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                        type="text" autofocus placeholder="Password" />
                                </div>
                            </div>
                        </div>

                        <div class="mt-8 py-3 text-center flex justify-end">
                            <button type="submit" @click="login()" class="
            inline-flex
            justify-center
            py-2
            px-8
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
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <!-- eslint-disable -->
        </form>
        <div class="text-red-600">{{ error.message }}</div>
    </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
export default {
    data: () => ({
        email: "",
        password: "",
        email: "",
        error: "",
    }),
    computed: {
        // gives access to this.count inside the component
        // same as reading from store.count
        ...mapState(useAuthStore, ["user"]),
        // same as above but registers it as this.myOwnName
    },
    methods: {
        ...mapActions(useAuthStore, { loginVue: "login" }),
        async login() {
            try {
                await this.loginVue({
                    email: this.email,
                    password: this.password,
                });
                this.$router.push("/new");
            } catch (error) {
                this.error = error;
            }
        },
    },
};
</script>