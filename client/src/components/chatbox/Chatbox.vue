<template>
  <div
    class="fixed bottom-4 right-4 flex flex-col justify-end items-end"
    style="z-index: 999"
  >
    <div
      id="chatbox-container"
      :class="show ? 'opacity-100 h-112' : 'opacity-0 h-0'"
      class="
        w-96
        hide-scrollbar
        transition-all
        duration-1000
        bg-white
        rounded-sm
        overflow-hidden
        mb-4
      "
    >
      <div class="h-full overflow-auto flex flex-col m-0 font-noto">
        <div class="m-0 overflow-auto flex basis-4/5 flex-shrink flex-grow">
          <div class="h-full m-0 flex flex-col w-full">
            <div
              id="chatbox-conversation-container"
              data-e2e="Conversation__Container"
              class="
                overflow-auto
                hide-scrollbar
                flex-grow flex-shrink
                basis-auto
                w-full
              "
            >
              <template v-for="(event, idx) in events">
                <ChatboxUserMessage
                  v-if="event['event'] === 'user'"
                  :message="event['text']"
                  :key="idx"
                />

                <ChatboxBotResponse
                  v-if="event['event'] === 'bot'"
                  :message="event['text']"
                  :key="idx"
                />
              </template>
            </div>
          </div>
        </div>
        <div class="initial w-full flex-shink-1">
          <div class="pl-2 pr-0 h-20 items-center flex border-t">
            <div class="flex-grow m-0">
              <textarea
                id="chatbox-input"
                class="
                  border-none
                  text-base
                  overflow-y-auto
                  py-2
                  flex
                  overflow-hidden
                  text-ellipsis
                  items-center
                  justify-between
                  px-4
                  w-full
                  font-base
                  rounded-lg
                  resize-none
                  focus:shadow-none
                  placeholder:text-base
                "
                data-qa="chat-input_textarea"
                placeholder="Start typing a message..."
                rows="1"
                spellcheck="false"
              ></textarea>
            </div>
            <div class="m-0">
              <button
                class="
                  shadow-none
                  m-0
                  p-6
                  leading-0
                  inline-block
                  text-center
                  border-none
                  font-md
                  cursor-not-allowed
                  relative
                "
                disabled=""
                aria-describedby="tooltip-1"
                data-dashlane-label="true"
                data-dashlane-rid="e8b306a88f1850cb"
                data-form-type=""
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fal"
                  data-icon="paper-plane"
                  class="svg-inline--fa fa-paper-plane text-base"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  style="width: 1em"
                >
                  <path
                    fill="currentColor"
                    d="M464 4.3L16 262.7C-7 276-4.7 309.9 19.8 320L160 378v102c0 30.2 37.8 43.3 56.7 20.3l60.7-73.8 126.4 52.2c19.1 7.9 40.7-4.2 43.8-24.7l64-417.1C515.7 10.2 487-9 464 4.3zM192 480v-88.8l54.5 22.5L192 480zm224-30.9l-206.2-85.2 199.5-235.8c4.8-5.6-2.9-13.2-8.5-8.4L145.5 337.3 32 290.5 480 32l-64 417.1z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="show = !show"
      class="
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
      "
      data-toggle="collapse"
      data-target="#chatbox-container"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="comment-dots"
        class="svg-inline--fa fa-comment-dots fa-w-16 css-1fcbxrh"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        style="width: 1em"
      >
        <path
          fill="currentColor"
          d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32zM128 272c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
        ></path>
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
      $("#chatbox-container").removeClass("show");
    });
    // Prevent click inside element from hide
    $("#chatbox-container").click(function (event) {
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
            self.events = [...self.events, { event: "bot", text: utter["text"] }];
          }
        },
        error: function (error) {
          console.log(error);
        },
      });
    },
  },
  components: { ChatboxUserMessage, ChatboxBotResponse },
};
</script>

<style lang="scss" scoped>
</style>