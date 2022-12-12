<script setup>
import moment from "moment";
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
                <h2 class="
                    text-xl
                    font-bold
                    leading-7
                    text-gray-900
                    sm:text-2xl sm:truncate
                  ">
                  All applicants
                </h2>
                <span class="
                    inline-flex
                    ml-4
                    items-center
                    justify-center
                    px-2
                    py-1
                    mr-2
                    text-xs
                    font-bold
                    leading-none
                    text-red-100
                    bg-indigo-600
                    rounded-full
                  ">{{ applies.length }}</span>
              </div>
            </div>

            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="flex flex-col mt-4">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="
                    py-2
                    align-middle
                    inline-block
                    min-w-full
                    sm:px-6
                    lg:px-8
                  ">
                  <div class="
                      shadow
                      overflow-hidden
                      border-b border-gray-200
                      sm:rounded-lg
                    ">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            ">
                            No
                          </th>
                          <th scope="col" class="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            ">
                            Applicant
                          </th>
                          <th scope="col" class="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            ">
                            Status
                          </th>
                          <th scope="col" class="
                              px-6
                              py-3
                              text-center text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            ">
                            Phone
                          </th>
                          <th scope="col" class="
                              px-6
                              py-3
                              text-left text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            ">
                            Created At
                          </th>
                          <th scope="col" class="
                              px-6
                              py-3
                              text-right text-xs
                              font-medium
                              text-gray-500
                              uppercase
                              tracking-wider
                              whitespace-nowrap
                            ">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(apply, idx) in applies" :key="idx">
                          <td class="text-sm font-medium text-gray-900 px-6">
                            {{ idx + 1 }}
                          </td>
                          <td class="text-sm font-medium text-gray-900 px-6 capitalize">
                            {{ apply.owner.name }}
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span v-if="apply.status"
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                            <span v-else
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Pending
                            </span>
                          </td>
                          <td class="
                              text-sm text-center
                              font-medium
                              px-6
                            ">
                            {{ apply.phone }}
                          </td>
                          <td class="
                              px-6
                              py-4
                              whitespace-nowrap
                              text-sm text-gray-500
                            ">
                            {{
                                moment(
                                  new Date(
                                    parseInt(
                                      apply._id.substring(0, 8),
                                      16
                                    ) * 1000
                                  )
                                ).format("DD/MM/YYYYY")
                            }}
                          </td>
                          <td class="
                              px-6
                              py-4
                              whitespace-nowrap
                              text-right text-sm
                              font-medium
                            ">
                            <button class="p-3 mx-1 rounded-lg hover:bg-indigo-600 hover:text-white text-gray-400"
                              type="button" @click="approveModel(apply._id)">
                              <svg viewBox="0 0 512 512" style="width: 1em;">
                                <path fill="currentColor"
                                  d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z">
                                </path>
                              </svg>
                            </button>

                            <button class="p-3 mx-1 rounded-lg hover:bg-indigo-600 hover:text-white text-gray-400"
                              type="button" @click="downloadModel(apply._id)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5" />
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
import { createToast } from "mosha-vue-toastify";
import axios from "axios";
import { useAuthStore } from "@/stores/auth/auth";
import { showConfirmPopup } from "@/utils/utils";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export default {
  mounted() {
    const authStore = useAuthStore();
    axios
      .get(`${serverUrl}/users/${authStore.user._id}/applies`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authStore.token}`,
          "x-access-token": authStore.token,
        },
      })
      .then((res) => {
        this.applies = res.data;
      });
  },
  data: () => ({
    applies: [],
  }),
  methods: {
    deleteModel(id) {
      const self = this;
      showConfirmPopup(function () {
        const authStore = useAuthStore();
        axios
          .delete(`${serverUrl}/recruitments/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authStore.token}`,
              "x-access-token": authStore.token,
            },
          })
          .then(function () {
            self.applies = self.applies.filter(
              (item) => item._id !== id
            );
            createToast("Success delete recruitment", { type: "success" });
          });
      });
    },
    approveModel(id) {
      const self = this;
      showConfirmPopup(function () {
        const authStore = useAuthStore()
        axios.put(`${serverUrl}/recruiter/applies/${id}/approve`, { status: true }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authStore.token}`,
            "x-access-token": authStore.token,
          },
        }).then(function () {
          self.applies = self.applies.map(item => item._id === id ? Object.assign(item, { status: true }) : item);
          createToast('Success approve apply', { type: 'success' })
        })
      }, "Do you really want to approve?", "Approve")
    },
    downloadModel(id) {
      const authStore = useAuthStore();
      window.open(`${serverUrl}/recruiter/applies/${id}/download?token=${authStore.token}`)
    }
  },
};
</script>
    