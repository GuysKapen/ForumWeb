<template>
  <div class="w-1/5 flex-shrink-0 pr-8">
    <div
      class="
        overflow-hidden
        bg-gray-50
        pt-6
        tabs-panel
        shadow-md
        border-r border-gray-100
        min-h-screen
      "
    >
      <div class="py-5 space-y-6 sm:p-6">
        <div class="mt-4 space-y-6">
          <div class="flex items-start tab-panel active">
            <router-link
              tag="div"
              class-active="active"
              class="tab-panel flex items-start"
              :to="{ name: 'profile' }"
              exact
            >
              <div
                class="
                  bg-white
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  ml-2
                  w-6
                  h-6
                  flex-shrink-0
                  border border-gray-100
                "
              >
                <span class="material-icons text-gray-300 text-sm"
                  >dashboard</span
                >
              </div>

              <div class="ml-3 text-sm">
                <p class="text-gray-500">Dashboard</p>
              </div>
            </router-link>
          </div>

          <div class="flex items-start tab-panel active">
            <router-link
              tag="div"
              class-active="active"
              class="flex item-starts"
              :to="{ name: 'user-post-index' }"
              exact
            >
              <div
                class="
                  bg-white
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  ml-2
                  w-6
                  h-6
                  flex-shrink-0
                  border border-gray-100
                "
              >
                <span class="material-icons text-gray-300 text-sm"
                  >card_membership</span
                >
              </div>

              <div class="ml-3 text-sm">
                <p class="text-gray-500">Questions</p>
              </div>
            </router-link>
          </div>

          <div class="flex items-start tab-panel active">
            <router-link
              tag="div"
              class-active="active"
              class="flex item-starts"
              :to="{ name: 'user-answer-index' }"
              exact
            >
              <div
                class="
                  bg-white
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  ml-2
                  w-6
                  h-6
                  flex-shrink-0
                  border border-gray-100
                "
              >
                <span class="material-icons text-gray-300 text-sm"
                  >card_membership</span
                >
              </div>

              <div class="ml-3 text-sm">
                <p class="text-gray-500">Answers</p>
              </div>
            </router-link>
          </div>

          <div class="flex items-start tab-panel active">
            <router-link
              tag="div"
              class-active="active"
              class="flex item-starts"
              :to="{ name: 'user-comment-index' }"
              exact
            >
              <div
                class="
                  bg-white
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  ml-2
                  w-6
                  h-6
                  flex-shrink-0
                  border border-gray-100
                "
              >
                <span class="material-icons text-gray-300 text-sm"
                  >card_membership</span
                >
              </div>

              <div class="ml-3 text-sm">
                <p class="text-gray-500">Comments</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>