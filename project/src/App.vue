<template>
  <div class="container">
    <nav>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
      <router-link v-if="sessionStore.session" to="/account"
        >Account</router-link
      >
    </nav>
    <h1>Our Social Media Site</h1>
    <router-view></router-view>
    <div v-if="sessionStore.session">
      <NewPost />
    </div>
    <List />
  </div>
</template>

<script setup>
import { supabase } from "./supabase";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "./stores/pinia";
import NewPost from "./components/newpost.vue";
import List from "./components/list.vue";

const router = useRouter();
const sessionStore = useSessionStore();

onMounted(() => {
  sessionStore.fetchSession();

  supabase.auth.onAuthStateChange((_, session) => {
    sessionStore.setSession(session);
    if (!session) {
      router.push("/signin");
    }
  });
});
</script>

<style scoped>
.container {
  padding: 50px;
  text-align: center;
}
</style>
