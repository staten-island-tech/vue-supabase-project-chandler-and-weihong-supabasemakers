<script setup>
import { onMounted, ref } from "vue";
import Newpost from "./components/newpost.vue";
import List from "./components/list.vue";
import { supabase } from "./supabase";
import { useStore } from "./stores/pinia";

const session = ref(null);
const posts = ref([]);
const store = useStore();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    if (session.value) {
      fetchPosts();
    }
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    if (_session) {
      fetchPosts();
    }
  });
});
onMounted(() => {
  store.fetchUser();
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div class="container">
    <div>
      <router-link to="/signup">Sign Up</router-link>
      <router-view></router-view>
    </div>
    <Account v-if="session" :session="session" />
    <Auth v-else />
    <div v-if="session">
      <h1>social media thing</h1>
      <Newpost @new-post="fetchPosts" />
      <List :posts="posts" />
    </div>
  </div>
</template>
