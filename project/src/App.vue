<script setup>
import { onMounted, ref } from "vue";
import Account from "./components/account.vue";
import Auth from "./components/auth.vue";
import Newpost from "./components/newpost.vue";
import List from "./components/list.vue";
import { supabase } from "./supabase";

const session = ref(null);
const posts = ref([]);

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) console.error("error fetching posts:", error);
  else posts.value = data;
};

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
</script>

<template>
  <div class="container">
    <Account v-if="session" :session="session" />
    <Auth v-else />
    <div v-if="session">
      <h1>social media thing</h1>
      <Newpost @new-post="fetchPosts" />
      <List :posts="posts" />
    </div>
  </div>
</template>
