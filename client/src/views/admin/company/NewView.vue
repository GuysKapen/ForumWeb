<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import MyForm from "@/components/AdminCompanyForm.vue";
</script>
    
<template>
    <div class="my-8 w-1/2 mx-auto py-16 px-8">
        <div class="header">
            <h2 class="text-4xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate text-center">
                Add company
            </h2>
        </div>
        <MyForm />
    </div>
</template>
    