<template>
  <div>
    <p>Signin Page</p>
    <form @submit.prevent="signIn">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const email = ref("");
const password = ref("");

const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) console.error("Error signing in:", error.message);
};
</script>
