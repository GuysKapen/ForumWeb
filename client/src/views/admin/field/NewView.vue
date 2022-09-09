<script setup>
import Nav from "@/components/Nav.vue";
import SideBar from "@/components/AdminSideBar.vue";
import Form from "@/components/AdminFieldForm.vue";
</script>
    
    <template>
    <main>
        <div>
            <Nav />
            <div class="flex bg-gray-50">
                <SideBar />
                <Form />
            </div>
        </div>
    </main>
</template>
    