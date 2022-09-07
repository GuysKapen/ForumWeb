<template>

    <div class="border rounded-md p-8 my-8">
        <form class="simple_form w-full" id="new-comment-form" novalidate="novalidate" accept-charset="UTF-8"
            data-remote="true" method="post" @submit.prevent="addComment()">

            <div class="my-4">
                <h2 class="text-black fw-900 font-bold text-base font-mul">Comment</h2>
                <label class="text optional label text-left w-full hidden" for="comment_message">Description</label>
                <textarea
                    class="string w-full required block px-4 py-2 rounded-lg font-medium border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:shadow-md focus:border-gray-400 focus:bg-white my-4"
                    :placeholder="'Comment publicly as ' + user.name" name="comment" id="comment_message"
                    v-model="comment" rows="6"></textarea>
            </div>

            <button type="submit"
                class="flex justify-end py-2 px-8 ml-auto border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Submit
            </button>
        </form>
    </div>


</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "@/stores/auth/auth";
import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL;
export default {
    props: ['parentId', 'parentType'],
    data: () => ({
        comment: "",
        error: null,
    }),
    computed: {
        // gives access to this.count inside the component
        // same as reading from store.count
        ...mapState(useAuthStore, ["user"]),
        // same as above but registers it as this.myOwnName
    },
    methods: {
        async addComment() {

            const authStore = useAuthStore();
            try {
                if (this.comment.length === 0) {
                    error = "Please enter comment"
                    return
                }

                const newModel = {
                    comment: this.comment,
                    parentType: this.parentType,
                    parent: this.parentId
                }

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

            } catch (error) {
                this.error = error;
            }
        },
    },
};
</script>