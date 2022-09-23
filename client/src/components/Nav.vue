<template>
  <div>
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              type="button"
              class="
                inline-flex
                items-center
                justify-center
                p-2
                rounded-md
                text-gray-400
                hover:text-white hover:bg-gray-700
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-white
              "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <!--
                      Icon when menu is closed.

                      Heroicon name: outline/menu

                      Menu open: "hidden", Menu closed: "block"
                    -->
              <svg
                class="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <!--
                      Icon when menu is open.

                      Heroicon name: outline/x

                      Menu open: "block", Menu closed: "hidden"
                    -->
              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            class="
              flex-1 flex
              items-center
              justify-center
              sm:items-center sm:justify-start
            "
          >
            <div class="flex-shrink-0 flex items-center w-1/6">
              <div class="relative font-black text-xl w-1/4 mr-auto">
                <a href="" class="text-gray-800">Forum</a>
              </div>
            </div>
            <div
              class="
                flex
                pl-2
                pr-4
                items-center
                bg-gray-50
                border-gray-200 border
                rounded-xl
              "
            >
              <input
                id="name"
                name="name"
                class="
                  string
                  w-full
                  text-gray-600
                  rounded-lg
                  font-medium
                  bg-gray-50
                  border-none
                  focus:outline-none
                  focus:border-none
                  shadow-none
                  focus:shadow-none
                  placeholder-gray-400
                  text-sm
                  outline-none
                "
                style="box-shadow: none !important"
                type="text"
                autofocus
                placeholder="Type to search"
              />
              <div
                class="
                  bg-white
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  ml-4
                  w-6
                  h-6
                  flex-shrink-0
                  border border-gray-100
                "
              >
                <span class="material-icons text-gray-500 text-sm">search</span>
              </div>
            </div>
            <div class="hidden sm:block sm:ml-6 mx-auto flex-grow">
              <div class="block space-x-4 w-max mx-auto">
                <a
                  href="/"
                  class="
                    inline-block
                    py-4
                    px-4
                    text-sm
                    font-medium
                    text-center
                    rounded-t-lg
                    border-b-2
                  "
                  aria-current="page"
                  >Home</a
                >

                <a
                  href=""
                  class="
                    inline-block
                    py-4
                    px-4
                    text-sm
                    font-medium
                    text-center
                    rounded-t-lg
                    border-b-2
                    text-gray-500
                    border-transparent
                    hover:text-gray-600 hover:border-gray-300
                    dark:text-gray-400 dark:hover:text-gray-300
                  "
                  >Recruitments</a
                >

                <a
                  href=""
                  class="
                    inline-block
                    py-4
                    px-4
                    text-sm
                    font-medium
                    text-center
                    rounded-t-lg
                    border-b-2
                    text-gray-500
                    border-transparent
                    hover:text-gray-600 hover:border-gray-300
                    dark:text-gray-400 dark:hover:text-gray-300
                  "
                  >Recruiter</a
                >

                <a
                  href="/admin/dashboard"
                  class="
                    inline-block
                    py-4
                    px-4
                    text-sm
                    font-medium
                    text-center
                    rounded-t-lg
                    border-b-2
                    text-gray-500
                    border-transparent
                    hover:text-gray-600 hover:border-gray-300
                    dark:text-gray-400 dark:hover:text-gray-300
                  "
                  >Admin</a
                >
              </div>
            </div>
          </div>
          <div
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              sm:static sm:inset-auto sm:ml-6 sm:pr-0
            "
          >
            <div class="bg-gray-50 rounded-xl border border-gray-200 mr-8">
              <button
                type="button"
                class="
                  flex
                  items-center
                  text-gray-400
                  hover:text-indigo-500
                  w-8
                  h-8
                  justify-center
                  relative
                "
              >
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: outline/bell -->
                <span
                  class="
                    w-[6px]
                    h-[6px]
                    rounded-full
                    bg-indigo-600
                    absolute
                    top-[-0.125rem]
                    right-[-0.125rem]
                  "
                ></span>
                <span class="material-icons text-base relative">
                  notifications
                </span>
              </button>
            </div>
            <div class="">
              <button
                type="button"
                class="
                  flex
                  items-center
                  text-gray-400
                  hover:text-indigo-500
                  w-6
                  h-6
                  justify-center
                  relative
                "
              >
                <span class="material-icons text-base relative">
                  person
                </span>
              </button>
            </div>
            <!-- Profile dropdown -->
            <div class="ml-3 relative">
              <!--
                          Dropdown menu, show/hide based on menu state.

                          Entering: "transition ease-out duration-100"
                            From: "transform opacity-0 scale-95"
                            To: "transform opacity-100 scale-100"
                          Leaving: "transition ease-in duration-75"
                            From: "transform opacity-100 scale-100"
                            To: "transform opacity-0 scale-95"
                        -->

              <div
                id="dropdown"
                class="
                  origin-top-right
                  opacity-0
                  scale-0
                  transition-all
                  duration-200
                  absolute
                  right-0
                  mt-2
                  w-56
                  rounded-md
                  shadow-lg
                  bg-white
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
              >
                <div class="py-1" role="none">
                  <a
                    href=""
                    class="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                    >Account settings</a
                  >
                  <a
                    href=""
                    class="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-1"
                    >Dashboard</a
                  >
                  <form method="POST" action="" role="none">
                    @csrf
                    <button
                      type="submit"
                      class="
                        text-gray-700
                        block
                        w-full
                        text-left
                        px-4
                        py-2
                        text-sm
                      "
                      role="menuitem"
                      tabindex="-1"
                      id="menu-item-3"
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" id="mobile-menu">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a
            href="#"
            class="
              text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
              border-b-2 border-blue-600
              active
              dark:text-blue-500 dark:border-blue-500
            "
            aria-current="page"
            >Dashboard</a
          >

          <a
            href="#"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >Team</a
          >

          <a
            href="#"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >Projects</a
          >

          <a
            href="#"
            class="
              text-gray-300
              hover:bg-gray-700 hover:text-white
              block
              px-3
              py-2
              rounded-md
              text-base
              font-medium
            "
            >Calendar</a
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>