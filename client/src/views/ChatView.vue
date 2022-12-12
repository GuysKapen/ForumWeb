<script setup>
import moment from 'moment';
import { truncate } from '@/utils/utils';
</script>
<template>

    <div class="flex flex-col h-screen">
        <Nav />
        <div class="flex h-full border-t w-full">
            <div class="w-3/12 flex-shrink-0 border-r overflow-scroll">
                <div v-for="(conversation, idx) in conversations" :key="idx"
                    class="px-6 py-4 border-b bg-white hover:bg-gray-50 cursor-pointer" @click="activate(conversation)"
                    :class="{ 'bg-gray-50': (conversation.conversationId == activeConversation?.conversationId) }">
                    <div class="m-0 flex flex-row items-center">
                        <div class="flex flex-shrink-0 m-0">
                            <div
                                class="w-10 h-10 p-[0.875rem] text-center rounded-full leading-4 justify-center items-center text-white flex bg-gray-100">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                                    class="svg-inline--fa fa-user fa-w-14 css-1y53wuf" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 1em;">
                                    <path fill="currentColor"
                                        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                    </path>
                                </svg>
                            </div>
                        </div>

                        <div class="ml-2">
                            <h3 class="text-xs font-bold text-gray-800">{{ moment(new Date(parseInt(
                                    conversation._id.substring(0, 8), 16) *
                                    1000)).format('hh:mm a DD MMM YYYY')
                            }}</h3>
                            <h3 class="text-gray-500 text-xs mt-1 ">{{ truncate(lastMessage(conversation), 48) }}</h3>
                        </div>

                    </div>

                    <!-- {{ $buttons }} -->
                </div>
            </div>
            <div id="chatbox-container" class="
        h-full
        w-full
        hide-scrollbar
        transition-all
        duration-300
        bg-white
        rounded-sm
        overflow-hidden
        mb-4
      ">

                <ChatBody v-if="activeConversation" key="chatbox-view" :sender-id="activeConversation.conversationId"
                    :oldEvents="activeConversation.events" />

            </div>
            <div class="w-3/12 flex-shrink-0 border-l">
                <div class="mt-16">
                    <div class="flex flex-row-reverse mx-auto justify-center">
                        <div
                            class="w-14 h-14 text-center rounded-full leading-4 justify-center items-center text-white flex bg-green-300 -ml-6">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="robot"
                                class="svg-inline--fa fa-robot fa-w-20 css-1y53wuf" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" style="width: 1em;">
                                <path fill="currentColor"
                                    d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z">
                                </path>
                            </svg>
                        </div>
                        <div
                            class="w-14 h-14 text-center rounded-full leading-4 justify-center items-center text-white flex bg-gray-100">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user"
                                class="svg-inline--fa fa-user fa-w-14 css-1y53wuf" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 1em;">
                                <path fill="currentColor"
                                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div class="mt-4">
                        <p class="text-gray-800 text-sm font-semibold text-center">Conversation between</p>
                        <p class="text-gray-800 text-sm font-semibold text-center">Demobot and {{ user.name }} user</p>
                    </div>
                    <div class="mt-8 px-4 w-full border-b">
                        <h4 class="font-normal text-base text-gray-400">Actions</h4>
                        <div class="flex justify-between py-3 mt-3 w-full items-center">
                            <p class="text-sm text-gray-700 font-normal">Start new conversation</p>
                            <button @click="newConversation"
                                class="hover:bg-indigo-600 text-gray-500 hover:text-white p-2 transition-all rounded-md border-none inline-block relative">
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                                    <path fill="currentColor"
                                        d="M9.542 11.25h.916V8.792h2.459v-.917h-2.459V5.417h-.916v2.458H7.083v.917h2.459ZM2.5 16.729V3.938q0-.626.406-1.032T3.938 2.5h12.124q.626 0 1.032.406t.406 1.032v8.791q0 .625-.406 1.031-.406.407-1.032.407h-11Zm.917-2.229 1.25-1.25h11.395q.23 0 .376-.146.145-.146.145-.375V3.938q0-.23-.145-.375-.146-.146-.376-.146H3.938q-.23 0-.376.146-.145.145-.145.375Zm0-10.562v-.521V14.5Z" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between py-3 w-full items-center">
                            <p class="text-sm text-gray-700 font-normal">Mark as reviewed</p>
                            <button
                                class="hover:bg-indigo-600 text-gray-500 hover:text-white p-2 transition-all rounded-md border-none inline-block relative"><svg
                                    aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check-circle"
                                    class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                    style="width: 1em;">
                                    <path fill="currentColor"
                                        d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z">
                                    </path>
                                </svg></button>
                        </div>
                        <div class="flex justify-between py-3 w-full items-center">
                            <p class="text-sm text-gray-700 font-normal">Save for later</p>
                            <button
                                class="hover:bg-indigo-600 text-gray-500 hover:text-white p-2 transition-all rounded-md border-none inline-block relative">
                                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="bookmark"
                                    class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                    style="width: 1em;">
                                    <path fill="currentColor"
                                        d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm16 456.287l-160-93.333-160 93.333V48c0-8.822 7.178-16 16-16h288c8.822 0 16 7.178 16 16v408.287z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                        <div class="flex justify-between py-3 w-full items-center">
                            <p class="text-sm text-gray-700 font-normal">Delete</p>
                            <button
                                class="hover:bg-indigo-600 text-gray-500 hover:text-white p-2 transition-all rounded-md border-none inline-block relative">
                                <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="trash-alt"
                                    class="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                    style="width: 1em;">
                                    <path fill="currentColor"
                                        d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex px-4 justify-between py-3 mt-3 w-full">
                        <p class="text-base text-gray-400 font-normal">Tags</p>
                        <button
                            class="hover:bg-indigo-600 text-gray-500 hover:text-white p-2 transition-all rounded-md border-none inline-block relative">
                            <svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="cog" class="w-4 h-4"
                                role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width: 1em;">
                                <path fill="currentColor"
                                    d="M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ChatBody from '../components/chatbox/ChatBody.vue'
import Nav from '../components/Nav.vue'
import { useAuthStore } from '@/stores/auth/auth'
import { v4 as uuidv4 } from 'uuid';
import { createToast } from 'mosha-vue-toastify';
import { mapState } from "pinia";
import axios from 'axios';
const serverUrl = import.meta.env.VITE_SERVER_URL;
export default {
    components: { ChatBody, Nav },
    data: () => ({ activeConversation: null, conversations: [] }),
    async mounted() {
        const authStore = useAuthStore();
        try {
            axios
                .get(`${serverUrl}/users/${authStore.user._id}/conversations`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authStore.token}`,
                        "x-access-token": authStore.token,
                    },
                })
                .then(async (res) => {
                    let conversations = res.data
                    for (let index = 0; index < conversations.length; index++) {
                        const conversation = conversations[index];
                        const response = await axios
                            .get(`http://localhost:5005/conversations/${conversation.conversationId}/tracker`)
                        conversation["events"] = response.data["events"];
                    }

                    this.conversations = conversations.reverse();

                    this.activeConversation = this.conversations[0]
                });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        newConversation() {
            const senderId = uuidv4()
            this.activeConversation = { conversationId: senderId };
            const newModel = {
                conversationId: senderId,
            };
            const authStore = useAuthStore();
            try {
                axios
                    .post(`${serverUrl}/users/${authStore.user._id}/conversations`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((res) => {
                        createToast("Success add conversation", { type: 'success' })
                        this.conversations = [res.data, ...this.conversations]
                    });
            } catch (error) {
                console.log(error);
                createToast("Error add model", { type: 'danger' })
            }
        },
        activate(conversation) {
            this.activeConversation = conversation;
        },
        lastMessage(conversation) {
            let messages = conversation["events"]
            if (!messages) return ""
            for (let index = messages.length - 1; index >= 0; index--) {
                const message = messages[index];
                if (message['event'] === 'user'
                    || message['event'] === 'bot') {
                    return message['text']
                }
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ['user']),
    }
}


</script>