<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import CategoryForm from "@/components/AdminCategoryForm.vue";
</script>
    
    <template>
    <main>
        <div>
            <Nav />
            <div class="flex bg-gray-50">
                <SideBar />
                <CategoryForm />
            </div>
        </div>
    </main>
</template>
    