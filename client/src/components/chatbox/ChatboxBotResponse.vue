<template>
  <div class="mt-4 px-6 py-2 border-transparent border-2">
    <div class="m-0 flex flex-row items-end">
      <div class="flex flex-shrink-0 m-0 max-w-[75%]">
        <div class="
            w-8
            h-8
            text-center
            rounded-full
            flex
            justify-center
            items-center
            text-white
            bg-blue-400
          ">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="meh-blank"
            class="svg-inline--fa fa-meh-blank fa-w-16 css-1y53wuf" role="img" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512" style="width: 1em">
            <path fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm-80 232c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm160 0c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z">
            </path>
          </svg>
        </div>
      </div>

      <div>
        <div class="mx-2 flex justify-end">
          <div class="m-0 flex flex-col">
            <div class="
                m-0
                text-gray-800
                px-4
                py-2
                bg-slate-100
                align-self-end
                text-sm
                rounded-tl-md rounded-bl-2xl rounded-br-2xl rounded-tr-2xl
                relative
              " style="min-height: 2rem; min-width: 3rem">
              <div class="text-xs" :class="elClass" style="font-family: Noto Sans; top: 50%">
                <template v-if="custom && custom['table']">
                  <p class="text-sm my-3" v-if="custom['text']">{{ custom['text'] }}</p>
                  <table class="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th scope="col" v-for="(header, idx) in custom['table']['headers']" :key="idx"
                          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {{ header['data'] }}
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="(cells, idx) in custom['table']['rows']" :key="idx">
                        <td class="text-sm text-gray-900 px-6 py-4" v-for="(data, idx) in cells" :key="idx">{{
                            data.value
                        }}</td>
                      </tr>
                    </tbody>
                  </table>

                </template>
                <template v-else-if="custom && custom['html']">
                  <div class="prose text-xs" v-html="custom['html']">
                  </div>
                </template>
                <template v-else>
                  {{ message }}
                </template>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- {{ $buttons }} -->
  </div>
</template>

<script>
export default {
  props: ["message", "custom", "elClass"],
};
</script>

<style scoped>
ul {
  list-style: circle;
}
</style>