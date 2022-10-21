<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import CategoryForm from "@/components/AdminCategoryForm.vue";
</script>
    
<template>
    <div class="my-8 w-1/2 mx-auto py-16 px-8">
        <div class="header">
            <h2 class="text-2xl font-black leading-7 text-gray-900 sm:text-3xl sm:truncate">
                Add new category
            </h2>
        </div>
        <CategoryForm />
    </div>
</template>
    