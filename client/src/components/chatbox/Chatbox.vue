<script setup>
import { v4 as uuidv4 } from 'uuid';
</script>
<template>
  <div id="chatbox" class="fixed bottom-4 right-4 flex flex-col justify-end items-end" style="z-index: 999">

    <div id="chatbox-container" :class="show ? 'opacity-100 h-112 w-96' : 'opacity-0 h-0 w-0'" class="
        hide-scrollbar
        transition-all
        duration-300
        bg-white
        rounded-sm
        overflow-hidden
        mb-4
      ">
      <ChatBody :sender-id="uuidv4()" />
    </div>

    <button @click="show = !show" class="
        bg-indigo-600
        font-base
        text-center
        w-16
        h-16
        rounded-full
        text-white
        cursor-pointer
        flex
        justify-center
        items-center
      " data-toggle="collapse" data-target="#chatbox-container">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comment-dots"
        class="svg-inline--fa fa-comment-dots fa-w-16 css-1fcbxrh" role="img" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512" style="width: 1em">
        <path fill="currentColor"
          d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z">
        </path>
      </svg>
    </button>
  </div>
</template>

<script>
import $ from "jquery";
import { createVNode, render } from "vue";
import ChatboxUserMessage from "@/components/chatbox/ChatboxUserMessage.vue";
import ChatboxBotResponse from "@/components/chatbox/ChatboxBotResponse.vue";
import axios from "axios";
import ChatBody from './ChatBody.vue';

export default {
  data: () => ({
    events: [],
    show: false,
  }),
  mounted() {
    const self = this;
    // Load messages
    axios
      .get("http://localhost:5005/conversations/12/tracker")
      .then((response) => {
        this.events = response.data["events"];
      });
    // Click outside to hide
    $("html").on("click", function () {
      self.show = false;
    });
    // Prevent click inside element from hide
    $("#chatbox").on("click", function (event) {
      event.stopPropagation();
    });
    // Send message
    $("#chatbox-input").on("keydown", function (e) {
      if (e.keyCode == 13) {
        e.preventDefault();
        const message = $(this).val();
        // Clear input
        $(this).val("");
        // Insert user message
        self.events = [...self.events, { event: "user", text: message }];
        const data = JSON.stringify({
          sender: "12",
          message: message,
        });
        // Post to chatbox and get result
        self.sendChatboxMessage(data);
      }
    });
    // Payload
    $("#chatbox-container").on("click", ".chatbox-payload", function (e) {
      let data = $(this).attr("data-payload");
      sendChatboxMessage(data);
    });
  },
  watch: {
    events() {
      setTimeout(function () {
        $("#chatbox-conversation-container").scrollTop(
          $("#chatbox-conversation-container")[0].scrollHeight
        );
      }, 0);
    },
  },
  methods: {
    renderComponent({ el, component, props, appContext }) {
      let vnode = createVNode(component, props);
      vnode.appContext = { ...appContext };
      render(vnode, el);
      return () => {
        // destroy vnode
        render(null, el);
        vnode = undefined;
      };
    },
    sendChatboxMessage(data) {
      const self = this;
      $.ajax({
        type: "POST",
        url: "http://localhost:5005/webhooks/rest/webhook",
        data: data,
        success: function (response) {
          for (const utter of response) {
            self.events = [
              ...self.events,
              { event: "bot", text: utter["text"] },
            ];
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    },
  },
  components: { ChatboxUserMessage, ChatboxBotResponse, ChatBody },
};
</script>

<style lang="scss" scoped>

</style>