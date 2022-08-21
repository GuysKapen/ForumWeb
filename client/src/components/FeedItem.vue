<template>
  <div class="bg-white px-8 pt-8 py-16 rounded-xl mt-6 relative">
    <h3 class="text-gray-800 font-black text-xl">Lecture Rescheduling</h3>
    <div class="flex items-center justify-between mt-4">
      <div class="flex items-center">
        <div
          class="
            bg-gray-100
            rounded-lg
            flex
            items-center
            justify-center
            flex-shrink-0
            border border-gray-100
          "
        >
          <img
            src="https://pixabay.com/get/gd630f2da836cb02441186bc5308a94ef5fd4984e3a8754747836267e974f4818643e8d4e2dd3aee300311db203bee4b7be9d90f05764cbb7f9de5aca8c6259f2_1920.jpg"
            alt="profile"
            class="w-8 h-8 rounded-lg flex-shrink-0 object-cover"
          />
        </div>

        <div class="ml-3 text-sm">
          <p class="text-gray-500">Elisabeth May</p>
          <span class="text-gray-300 text-sm">6 days ago</span>
        </div>
      </div>
      <div
        class="
          bg-indigo-100
          rounded-xl
          flex
          items-center
          justify-center
          ml-4
          px-4
          py-1
          flex-shrink-0
          border border-indigo-200
        "
      >
        <span class="text-xs text-indigo-600">Accounting</span>
      </div>
    </div>
    <div class="mt-4">
      <p class="text-gray-700 text-sm">
        Himates, <br />
        so i talked with Dr Hellen and because of her illner we need to
        <b class="font-bold">reschedule upcoming Lecture</b>. You propably
        notice that this lecture is the last before exam so Dr Hellen asked us
        also if we want to attend for
        <b class="font-bold">additional lecture</b> where we can study more
        difficult excercise
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex">
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
            <span class="material-icons text-base relative"> bookmark </span>
          </button>
        </div>

        <div class="bg-gray-50 rounded-xl border border-gray-200 mr-8">
          <button
            type="button"
            class="
              px-4
              flex
              items-center
              text-gray-400
              hover:text-indigo-500
              h-8
              justify-center
              relative
            "
          >
            <span class="material-icons text-base relative mt-1"> chat </span>
            <span class="text-sm ml-4"> Add comment </span>
          </button>
        </div>
      </div>
      <div class="absolute right-0 w-32 h-32">
        <div
          class="
            bg-white
            p-[0.125rem]
            absolute
            top-0
            left-0
            w-10
            h-10
            rounded-lg
          "
        >
          <img
            src="https://pixabay.com/get/gd630f2da836cb02441186bc5308a94ef5fd4984e3a8754747836267e974f4818643e8d4e2dd3aee300311db203bee4b7be9d90f05764cbb7f9de5aca8c6259f2_1920.jpg"
            alt="profile"
            class="w-full h-full rounded-lg flex-shrink-0 object-cover"
          />
        </div>

        <div
          class="
            bg-white
            p-[0.125rem]
            absolute
            top-4
            left-6
            w-10
            h-10
            rounded-lg
          "
        >
          <img
            src="https://pixabay.com/get/g52fb85d9c76b59f799033a4679e43f4614b85959519a49a9e03bc3940dc537ec8a2ef999eb1719b518a331b071b396ad_1920.jpg"
            alt="profile"
            class="w-full h-full rounded-lg flex-shrink-0 object-cover"
          />
        </div>

        <div
          class="
            bg-white
            p-[0.125rem]
            absolute
            -top-2
            left-12
            w-10
            h-10
            rounded-lg
            z-20
          "
        >
          <img
            src="https://pixabay.com/get/g8a10c69967e3cb9ad4c7a3c0e562ea6e89df60cf822d53c5371a320dbb765730ba643db032d9f90f9eeeca9040b9145353ab958dbf0d86fa9e442d08a6e9c487_1920.jpg"
            alt="profile"
            class="w-full h-full rounded-lg flex-shrink-0 object-cover"
          />
        </div>

        <div
          class="
            bg-white
            p-[0.125rem]
            absolute
            flex
            items-center
            justify-center
            top-4
            left-16
            w-10
            h-10
            rounded-lg
            z-10
          "
        >
          <span class="text-gray-300 text-sm">12+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>