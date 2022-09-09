<script setup>
import { images } from '../constants';
</script>
<template>
  <div class="flex bg-white w-full p-4 items-center">
    <div class="border-l-2">
      <img :src="images.cat1" alt="category" class="w-24 h-24 object-contain">
    </div>
    <div class="w-4/12 ml-2">
      <p class="text-sm text-gray-600">All</p>
      <p class="text-xs mt-3">Browse all categories and find something that interest you most</p>
    </div>


    <div class="flex-grow border-l pl-6 ml-4">
      <div class="flex space-x-20 border-b pb-3">
        <div>
          <p class="text-xs text-gray-600">Topics</p>
          <p class="text-sm text-gray-800 font-medium mt-2">126</p>
        </div>
        <div class="">
          <p class="text-xs text-gray-600">Users</p>
          <div class="relative">
            <div class="absolute right-0 w-8 h-8">
              <div class="
            bg-white
            p-[0.125rem]
            absolute
            left-0
            w-6
            h-6
            rounded-full
          ">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQopEztCTlDuKPFkQVgFBKsJuxp8Ogd-RI1nA&usqp=CAU"
                  alt="profile" fullfull class="w-full h-full rounded-full flex-shrink-0 object-cover" />
              </div>

              <div class="
            bg-white
            p-[0.125rem]
            absolute
            left-3
            w-6
            h-6
            rounded-full
          ">
                <img
                  src="https://www.worldphoto.org/sites/default/files/139813_158163_0_%20%C2%A9%20Noel%20Guevara%2C%20Philippines%2C%20Commended%2C%20Open%20Competition%2C%20Portraits%2C%202017%20Sony%20World%20Photography%20Awards.jpg"
                  alt="profile" class="w-full h-full rounded-full flex-shrink-0 object-cover" />
              </div>

              <div class="
            bg-white
            p-[0.125rem]
            absolute
            left-6
            w-6
            h-6
            rounded-full
            z-20
          ">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
                  alt="profile" class="w-full h-full rounded-full flex-shrink-0 object-cover" />
              </div>

              <div class="
            bg-white
            p-[0.125rem]
            absolute
            flex
            items-center
            justify-center
            left-9
            w-6
            h-6
            rounded-full
            z-50
          ">
                <span class="text-gray-500 text-[8px]">12+</span>
              </div>
            </div>
          </div>
        </div>
        <div class="">
          <p class="text-xs text-gray-600">Activity</p>
          <p class="text-sm text-gray-800 font-medium mt-2">Today, 12:42</p>
        </div>
      </div>

      <div class="pt-3">
        <p class="text-xs">Last topic</p>
        <div class="mt-2 flex items-center">
          <img src="https://miro.medium.com/max/1080/1*jWx9suY2k3Ifq4B8A_vz9g.jpeg" alt="profile"
            class="rounded-full w-6 h-6 object-cover">
          <p class="text-gray-800 ml-2 text-xs">Are there simple way to protect yourself from
            ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['category'],
};
</script>

<style lang="scss" scoped>
</style>