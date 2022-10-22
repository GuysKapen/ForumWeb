<template>

    <div class="border rounded-md p-8 my-8">
        <form class="simple_form w-full" id="new-comment-form" novalidate="novalidate" accept-charset="UTF-8"
            data-remote="true" method="post" @submit.prevent="submit()">

            <div class="my-4">
                <h2 class="text-black fw-900 font-bold text-base font-mul">Comment</h2>
                <label class="text optional label text-left w-full hidden" for="comment_message">Description</label>
                <textarea
                    class="string w-full required block px-4 py-2 rounded-lg font-medium border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-4"
                    :placeholder="'Comment publicly as ' + user.name" name="comment" id="comment_message"
                    v-model="newModel.comment" rows="6"></textarea>
            </div>

            <div class="flex justify-end space-x-6">
                <button @click="this.$emit('cancelComment')"
                    class="flex justify-end py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Cancel
                </button>
                <button type="submit"
                    class="flex justify-end py-2 px-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </div>
        </form>
    </div>


</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
export default {
    emits: {
        updatedComment: null,
        addedComment: null,
        cancelComment: null
    },
    props: {
        model: Object,
        parentId: String,
        parentType: String
    },
    data: function () {
        return {
            freshData: {
                comment: "",
                post: this.parentId,
                parentType: this.parentType,
                parent: this.parentId
            },
            error: null
        }
    },
    computed: {
        // gives access to this.count inside the component
        // same as reading from store.count
        ...mapState(useAuthStore, ["user"]),
        // same as above but registers it as this.myOwnName
        newModel() {
            return this.model ?? this.freshData
        }
    },
    methods: {
        async submit() {
            const newModel = this.newModel
            this.error = "";
            if (!newModel.comment) {
                this.error = "Please enter comment";
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
                    .post(`${serverUrl}/users/${authStore.user._id}/comments`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((res) => {
                        this.$emit("addedComment", res.data)
                    });
            } catch (error) {
                console.error("Add comment", error);
            }
        },

        async update(id, newModel) {
            const authStore = useAuthStore();
            try {
                axios
                    .put(`${serverUrl}/users/${authStore.user._id}/comments/${id}`, newModel, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${authStore.token}`,
                            "x-access-token": authStore.token,
                        },
                    })
                    .then((res) => {
                        this.$emit("updatedComment", res.data)
                    });
            } catch (error) {
                console.error("Update comment", error);
            }
        },
    },
};
</script>