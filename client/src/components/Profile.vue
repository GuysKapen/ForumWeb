<!-- <script setup>
import { imgUrlFor } from "../utils/utils";
const serverUrl = import.meta.env.VITE_SERVER_URL
</script> -->
<template>
  <div class="md:flex w-9/12">
    <div class="mt-5 md:mt-0 bg-gray-50 w-full">
      <div class="py-16 px-8">
        <div class="mt-10 sm:mt-0">
          <div class="">
            <div class="mt-5 md:mt-0">
              <form method="POST" @submit.prevent="updateDetail">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">
                      <div class="col-span-6 sm:col-span-3">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                        <input type="text" name="first-name" id="first-name" v-model="firstName"
                          autocomplete="given-name" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                        <input type="text" name="last-name" id="last-name" v-model="lastName" autocomplete="family-name"
                          class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-4">
                        <label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
                        <input type="text" name="email-address" id="email-address" :value="email" disabled
                          autocomplete="email" class="
                            bg-gray-200
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                        <select id="country" name="country" autocomplete="country-name" class="
                            mt-1
                            block
                            w-full
                            py-2
                            px-3
                            border border-gray-300
                            bg-white
                            rounded-md
                            shadow-sm
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          ">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div class="col-span-6">
                        <label for="street-address" class="block text-sm font-medium text-gray-700">Street
                          address</label>
                        <input type="text" name="street-address" id="street-address" v-model="address"
                          autocomplete="street-address" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" id="city" v-model="city" autocomplete="address-level2" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                        <input type="text" name="region" id="region" v-model="state" autocomplete="address-level1"
                          class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal
                          code</label>
                        <input type="text" name="postal-code" id="postal-code" v-model="zipcode"
                          autocomplete="postal-code" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" class="
                        inline-flex
                        justify-center
                        py-2
                        px-4
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
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="">
            <div class="mt-5 md:mt-0">
              <form method="POST" @submit.prevent="requestCompany">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">

                      <div class="col-span-6 sm:col-span-4">
                        <label for="email-address" class="block text-sm font-medium text-gray-700">Company name</label>
                        <input type="text" name="email-address" id="email-address" v-model="company.name" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3">
                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                        <select id="country" name="country" autocomplete="country-name" v-model="company.country" class="
                            mt-1
                            block
                            w-full
                            py-2
                            px-3
                            border border-gray-300
                            bg-white
                            rounded-md
                            shadow-sm
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          ">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>

                      <div class="col-span-6">
                        <label for="street-address" class="block text-sm font-medium text-gray-700">Street
                          address</label>
                        <input type="text" name="street-address" id="street-address" v-model="company.address"
                          autocomplete="street-address" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                        <input type="text" name="city" id="city" v-model="company.city" autocomplete="address-level2"
                          class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
                        <input type="text" name="region" id="region" v-model="company.state"
                          autocomplete="address-level1" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>

                      <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal
                          code</label>
                        <input type="text" name="postal-code" id="postal-code" v-model="company.zipcode"
                          autocomplete="postal-code" class="
                            mt-1
                            focus:ring-indigo-500 focus:border-indigo-500
                            block
                            w-full
                            shadow-sm
                            sm:text-sm
                            border-gray-300
                            rounded-md
                          " />
                      </div>
                    </div>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" class="
                        inline-flex
                        justify-center
                        py-2
                        px-4
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
            </div>
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="">
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form method="POST" enctype="multipart/form-data" @submit.prevent="updateProfile()">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <label for="title" class="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                        <span class="
                            inline-flex
                            items-center
                            px-3
                            rounded-l-md
                            border border-r-0 border-gray-300
                            bg-gray-50
                            text-gray-500 text-sm
                          ">
                          Instructor/
                        </span>
                        <input type="text" name="title" id="title" v-model="title" class="
                            focus:ring-indigo-500 focus:border-indigo-500
                            flex-1
                            block
                            w-full
                            rounded-none rounded-r-md
                            sm:text-sm
                            border-gray-300
                          " placeholder="Title" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">
                      About
                    </label>
                    <div class="mt-1">
                      <textarea id="about" name="about" rows="6" v-model="about" class="
                          shadow-sm
                          focus:ring-indigo-500 focus:border-indigo-500
                          mt-1
                          block
                          w-full
                          sm:text-sm
                          border border-gray-300
                          rounded-md
                        "></textarea>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Photo
                    </label>
                    <div class="mt-1 flex items-center">
                      <span class="
                          inline-block
                          h-12
                          w-12
                          rounded-full
                          overflow-hidden
                          bg-gray-100
                        ">
                        <img :src="imgUrlFor(serverUrl, cover)" alt="cover" class="object-cover h-full w-full" />
                      </span>
                      <button id="btn-change-cover" type="button" class="
                          ml-5
                          bg-white
                          py-2
                          px-3
                          border border-gray-300
                          rounded-md
                          shadow-sm
                          text-sm
                          leading-4
                          font-medium
                          text-gray-700
                          hover:bg-gray-50
                          focus:outline-none
                          focus:ring-2
                          focus:ring-offset-2
                          focus:ring-indigo-500
                        ">
                        Change
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div class="
                        mt-1
                        flex
                        justify-center
                        px-6
                        pt-5
                        pb-6
                        border-2 border-gray-300 border-dashed
                        rounded-md
                      ">
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                          viewBox="0 0 48 48" aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="flex text-sm text-gray-600">
                          <label for="cover" class="
                              relative
                              cursor-pointer
                              bg-white
                              rounded-md
                              font-medium
                              text-indigo-600
                              hover:text-indigo-500
                              focus-within:outline-none
                              focus-within:ring-2
                              focus-within:ring-offset-2
                              focus-within:ring-indigo-500
                            ">
                            <span>Upload a file</span>
                            <input id="cover" name="cover" type="file" class="sr-only"
                              v-on:change="onImageSelected($event)" />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button type="submit" class="
                      inline-flex
                      justify-center
                      py-2
                      px-4
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
          </div>
        </div>

        <div class="hidden sm:block" aria-hidden="true">
          <div class="py-5">
            <div class="border-t border-gray-200"></div>
          </div>
        </div>

        <div class="mt-10 sm:mt-0">
          <div class="">
            <div class="mt-5 md:mt-0 md:col-span-2">
              <form method="POST">
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend class="text-base font-medium text-gray-900">
                        By Email
                      </legend>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="comments" name="comments" type="checkbox" class="
                                focus:ring-indigo-500
                                h-4
                                w-4
                                text-indigo-600
                                border-gray-300
                                rounded
                              " />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="comments" class="font-medium text-gray-700">Comments</label>
                            <p class="text-gray-500">
                              Get notified when someones posts a comment on a
                              posting.
                            </p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="candidates" name="candidates" type="checkbox" class="
                                focus:ring-indigo-500
                                h-4
                                w-4
                                text-indigo-600
                                border-gray-300
                                rounded
                              " />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                            <p class="text-gray-500">
                              Get notified when a candidate applies for a job.
                            </p>
                          </div>
                        </div>
                        <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="offers" name="offers" type="checkbox" class="
                                focus:ring-indigo-500
                                h-4
                                w-4
                                text-indigo-600
                                border-gray-300
                                rounded
                              " />
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="offers" class="font-medium text-gray-700">Offers</label>
                            <p class="text-gray-500">
                              Get notified when a candidate accepts or rejects
                              an offer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                    <fieldset>
                      <div>
                        <legend class="text-base font-medium text-gray-900">
                          Push Notifications
                        </legend>
                        <p class="text-sm text-gray-500">
                          These are delivered via SMS to your mobile phone.
                        </p>
                      </div>
                      <div class="mt-4 space-y-4">
                        <div class="flex items-center">
                          <input id="push-everything" name="push-notifications" type="radio" class="
                              focus:ring-indigo-500
                              h-4
                              w-4
                              text-indigo-600
                              border-gray-300
                            " />
                          <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">
                            Everything
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input id="push-email" name="push-notifications" type="radio" class="
                              focus:ring-indigo-500
                              h-4
                              w-4
                              text-indigo-600
                              border-gray-300
                            " />
                          <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">
                            Same as email
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input id="push-nothing" name="push-notifications" type="radio" class="
                              focus:ring-indigo-500
                              h-4
                              w-4
                              text-indigo-600
                              border-gray-300
                            " />
                          <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">
                            No push notifications
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" class="
                        inline-flex
                        justify-center
                        py-2
                        px-4
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import axios from "axios";
import { imgUrlFor } from "../utils/utils";
import { createToast } from "mosha-vue-toastify";

const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  setup() {
    const authStore = useAuthStore();
    return {
      title: authStore.user?.profile?.title,
      about: authStore.user?.profile?.about,
      cover: authStore.user?.profile?.cover,
      email: authStore.user?.email,
      firstName: authStore.user?.detail?.firstName,
      lastName: authStore.user?.detail?.lastName,
      country: authStore.user?.detail?.country,
      address: authStore.user?.detail?.address,
      city: authStore.user?.detail?.city,
      state: authStore.user?.detail?.state,
      zipcode: authStore.user?.detail?.zipcode,
      image: null,
      imgUrlFor: imgUrlFor,
      serverUrl: serverUrl,
      company: authStore.user?.company ?? {}
    };
  },
  computed: {
    // gives access to this.count inside the component
    // same as reading from store.count
    ...mapState(useAuthStore, ["user"]),
    ...mapState(useAuthStore, ["token"]),
    // same as above but registers it as this.myOwnName
  },
  methods: {
    onImageSelected(e) {
      const selectedFile = e.target.files[0];
      // uploading asset to sanity
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/svg" ||
        selectedFile.type === "image/jpeg" ||
        selectedFile.type === "image/gif" ||
        selectedFile.type === "image/tiff"
      ) {
        this.image = selectedFile;
      } else {
        console.log("Wrong file type");
      }
    },

    async updateDetail() {
      const token = this.token;
      const authStore = useAuthStore();
      try {
        let res;
        res = await axios.post(
          `${serverUrl}/users/${this.user._id}/details`,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            country: this.country,
            city: this.city,
            address: this.address,
            state: this.state,
            zipcode: this.zipcode,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-access-token": token,
            },
          }
        );

        if (res) {
          authStore.user.detail = res.data;
          createToast("Succeed update detail infomation", { type: "success" });
        }
      } catch (error) {
        console.log("err", error);
      }
    },

    async updateProfile() {
      const token = this.token;
      const authStore = useAuthStore()
      try {
        let res;
        if (this.image != null) {
          const form = new FormData();
          form.append("image", this.image);
          res = await axios.post(
            `${serverUrl}/users/${this.user._id}/uploads/image`,
            form,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "x-access-token": token,
              },
            }
          );
          this.cover = res.data.data.name;
        }

        res = await axios.post(
          `${serverUrl}/users/${this.user._id}/profiles`,
          { title: this.title, about: this.about, cover: this.cover },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              "x-access-token": token,
            },
          }
        );

        if (res) {
          authStore.user.profile = res.data;
          createToast("Succeed update profile", { type: "success" });
        }
      } catch (error) {
        console.log("err", error);
      }
    },

    async requestCompany() {
      const authStore = useAuthStore();
      try {
        axios
          .post(`${serverUrl}/users/${authStore.user._id}/companies/request`, this.company, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authStore.token}`,
              "x-access-token": authStore.token,
            },
          })
          .then((_) => {
            createToast("Success request company", { type: 'success' })
          });
      } catch (error) {
        console.log(error);
        createToast("Error request company", { type: 'danger' })
      }
    }
  },
};
</script>