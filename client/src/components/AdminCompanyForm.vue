<template>

    <div class="my-8 w-1/2 mx-auto py-16 px-8">
        <div class="header">
            <h2 class="text-4xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate text-center">
                Add company
            </h2>
        </div>

        <div class="mt-8">

            <div>
                <form enctype="multipart/form-data" @submit.prevent="add()">

                    <div class="mb-4 px-2 w-full">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="name">Company name</label>
                                <input id="name" name="name" v-model="name"
                                    class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Name..." />
                            </div>
                        </div>
                    </div>

                    <div class="mb-4 px-2 w-full">
                        <div class="field">
                            <div class="control">
                                <label class="block font-semibold text-sm" for="name">Company address</label>
                                <input id="name" name="name" v-model="address"
                                    class="string w-full px-4 py-3 rounded-lg font-medium bg-gray-100 border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-2"
                                    type="text" autofocus placeholder="Address..." />
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

    </div>


</template>
  
  <script>
  
  import axios from 'axios'
  import { useAuthStore } from '../stores/auth/auth'
  
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  
  export default {
      data: () => ({ name: "", address: "" }),
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
                  address: this.address,
              };
  
              try {
                  axios
                      .post(`${serverUrl}/companies`, newModel, {
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
                  console.error("Add model", error);
              }
          },
      },
  };
  </script>