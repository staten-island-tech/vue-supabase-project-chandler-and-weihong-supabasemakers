<script setup>
import { onMounted, ref } from "vue";
import Account from "./components/account.vue";
import Auth from "./components/auth.vue";
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import { supabase } from "./supabase";

const session = ref(null);
const posts = ref([]);

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) console.error("Error fetching posts:", error);
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
  <div class="container" style="padding: 50px 0 100px 0">
    <Account v-if="session" :session="session" />
    <Auth v-else />

    <div v-if="session">
      <h1>Social Media App</h1>
      <PostForm @new-post="fetchPosts" />
      <PostList :posts="posts" />
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
