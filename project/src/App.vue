<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "./supabase";

const router = useRouter();
const session = ref(null);
const posts = ref([]);

const fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    console.error("Error fetching posts:", error.message);
  } else {
    posts.value = data;
  }
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
    if (session.value) {
      fetchPosts();
    } else {
      posts.value = [];
      router.push("/signin"); // Redirect to sign-in page if the user signs out
    }
  });
});
</script>

<template>
  <div class="container">
    <nav>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
      <router-link v-if="session" to="/account">Account</router-link>
    </nav>
    <router-view :session="session"></router-view>
  </div>
</template>

<style scoped></style>
