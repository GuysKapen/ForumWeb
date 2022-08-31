<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import CategoryItem from "@/components/CategoryItem.vue";
</script>
    
    <template>
    <main>
        <div>
            <Nav />
            <div class="flex bg-gray-50">
                <SideBar />

                <div class="flex-grow-1 w-8/12 p-4 space-y-4">

                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />
                    <CategoryItem />

                </div>
            </div>
        </div>
    </main>
</template>
    