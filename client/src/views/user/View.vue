<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/UserSideBar.vue";
import CategoryItem from "@/components/AdminCategoryItem.vue";
</script>
    
    <template>
    <main>
        <div>
            <Nav />
            <div class="flex bg-gray-50">
                <SideBar />
                <router-view></router-view>
            </div>
        </div>
    </main>
</template>
    