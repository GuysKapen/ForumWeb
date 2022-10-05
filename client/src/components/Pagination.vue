<template>
  <div class="flex text-gray-700 text-base">
    <div
      class="
        h-12
        w-12
        mr-1
        flex
        justify-center
        items-center
        {current
        >
        1
        ?
        'cursor-pointer'
        :
        'text-gray-400'}
      "
      @click="() => current > 1 && setCurrent(current - 1)"
    >
      <svg
        class="w-4 h-4 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M15 18l-6-6l6-6" />
        </g>
      </svg>
    </div>
    <div class="flex h-12 font-medium">
      <div
        v-for="(i, idx) in arr_pages"
        :key="idx"
        class="
          w-12
          sm:flex
          justify-center
          items-center
          hidden
          select-none
          cursor-pointer
          leading-5
          transition
          duration-150
          ease-in
        "
        v-bind:class="
          i == this.current ? 'border-t-[0.1rem] border-indigo-600' : ''
        "
        @click="() => setCurrent(i)"
      >
        {{ i }}
      </div>
      <div
        class="
          w-12
          h-12
          sm:hidden
          flex
          justify-center
          select-none
          items-center
          cursor-pointer
          leading-5
          transition
          duration-150
          ease-in
        "
      >
        {{ current }}
      </div>
    </div>
    <div
      class="
        h-12
        w-12
        ml-1
        flex
        justify-center
        items-center
        {current
        <
        num_pages
        ?
        'cursor-pointer'
        :
        'text-gray-400'}
      "
      @click="() => current < num_pages && setCurrent(current + 1)"
    >
      <svg
        class="w-4 h-4 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style="
          -ms-transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          transform: rotate(360deg);
        "
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18l6-6l-6-6" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ["options"],
  setup() {
    function buildArr(c, n) {
      if (n <= 7) {
        return [...Array(n)].map((_, i) => i + 1);
      } else {
        if (c < 3 || c > n - 2) {
          return [1, 2, 3, "...", n - 2, n - 1, n];
        } else {
          return [1, "...", c - 1, c, c + 1, "...", n];
        }
      }
    }
    return {
      buildArr: buildArr,
    };
  },
  data: function () {
    const current = this.options["page"] || 1
    const num_items = this.options["totalPages"] || 12
    const arr_pages = this.buildArr(current, num_items)
    return { current: current, num_items: num_items, per_page: 5, arr_pages: arr_pages };
  },
  methods: {
    setCurrent(i) {
      if (isNaN(i)) return;
      this.current = i;
      this.arr_pages = this.buildArr(this.current, this.num_items);
      this.$emit("onPageChanged", i)
    },
  },
};
</script>