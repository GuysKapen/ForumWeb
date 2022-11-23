<script setup>
import { images } from "../constants";
</script>
<template>

    <div
        class="min-h-screen bg-gray-100 text-gray-900 flex md:flex-wrap lg:flex-no-wrap justify-center py-16 lg:p-16 rounded-lg w-full">
        <div class="xl:w-5/12 lg:w-6/12 w-9/12 m-0 bg-white shadow flex flex-col justify-center items-center py-12">
            <div class="lg:w-6/12 sm:w-8/12 w-11/12 flex flex-col items-center max-w-xs">
                <h1 class="text-2xl xl:text-3xl text-center font-extrabold font-josesans">Sign In</h1>
                <div class="w-full flex-1 mt-8 text-indigo-500 flex flex-col items-center">

                    <a class="link-no-style w-full mb-3 max-w-xs font-bold text-sm shadow-sm rounded-lg py-4 link-no-style bg-indigo-100 hover:bg-indigo-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2"
                        href="/users/sign_up">
                        <div class="w-full flex justify-center">
                            <button type="submit"
                                class="flex inline-block f6 font-roboto outline-none-imp font-bold items-center duration-500 text-gray-800">
                                <i class="fa fa-facebook mr-3 duration-500"></i>Sign In With Facebook
                            </button>
                        </div>
                    </a>

                    <a class="link-no-style w-full mb-3 max-w-xs font-bold text-sm shadow-sm rounded-lg py-4 link-no-style bg-indigo-100 hover:bg-indigo-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2"
                        href="/users/sign_up">
                        <div class="w-full flex justify-center">
                            <button type="submit"
                                class="flex outline-none-imp font-bold items-center duration-500 text-gray-800">
                                <i class="fa fa-google mr-3 duration-500"></i>Sign In With Google
                            </button>
                        </div>
                    </a>

                    <a class="link-no-style w-full mb-3 max-w-xs font-bold text-sm shadow-sm rounded-lg py-4 link-no-style bg-indigo-100 hover:bg-indigo-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2"
                        href="/register">
                        <div class="w-full flex justify-center">
                            <button type="submit"
                                class="flex inline-block f6 font-roboto outline-none-imp font-bold items-center duration-500 text-gray-800">
                                <i class="fa fa-user-plus mr-3 duration-500"></i>Sign Up
                            </button>
                        </div>
                    </a>
                </div>
            </div>

            <div class="my-5 border-b text-center flex w-8/12">
                <span class="border-b border-solid flex-grow"></span>
                <div
                    class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign with email
                </div>
                <span class="border-b border-solid flex-grow"></span>
            </div>


            <div class="lg:w-6/12 sm:w-8/12 flex flex-col items-center w-11/12">

                <form method="POST" @submit.prevent="login()">


                    <div class="max-w-xs relative mx-auto">

                        <div class="input email required user_email">
                            <label class="email required hidden" for="user_email"><abbr title="required">*</abbr>
                                Email</label>


                            <input id="email" type="email" v-model="email"
                                class="string email required w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2 @error('email') is-invalid @enderror"
                                name="email" required autocomplete="email" autofocus placeholder="Email">



                        </div>

                        <div class="input password required user_password">

                            <label class="password required hidden" for="user_password"><abbr title="required">*</abbr>
                                Password</label>

                            <input v-model="password" id="password" type="password" class="string email required w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2
                                   @error('password') is-invalid @enderror" name="password" placeholder="Password"
                                required autocomplete="current-password">


                        </div>

                        <div class="flex items-center py-2">
                            <input
                                class="form-checkbox h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                type="checkbox" name="remember" id="remember">

                            <label class="ml-2 block text-sm text-gray-900" for="remember">
                                Remember me
                            </label>
                        </div>

                        <div class="w-full d-flex justify-content-center">

                            <button type="submit"
                                class="d-flex d-inline-block text-sm font-roboto font-black outline-none-imp align-items-center duration-500 mt-2 tracking-wide bg-indigo-500 text-gray-100 w-full p-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <span class="material-icons mr-3 duration-500">
                                    login
                                </span>Login
                            </button>

                        </div>

                        <div class="text-right mt-2">
                            <!-- @if (Route::has('password.request'))
                                <a class="font-medium text-indigo-600 text-sm hover:text-indigo-500"
                                   href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            @endif -->
                        </div>

                    </div>
                </form>
            </div>

        </div>

        <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat background-login flex items-center">
                <img :src="images.auth" alt="Image" class="img-fluid">
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import { createToast } from 'mosha-vue-toastify';
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
                createToast(`Welcome back ${this.user.name}`, { type: "success" })
                this.$router.push("/");
            } catch (error) {
                createToast("Error when trying to login. Please try again", { type: "danger" })
                this.error = error;
            }
        },
    },
};
</script>