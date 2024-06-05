<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useStore } from "../stores/pinia";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const signUp = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    errorMessage.value = "";
  }
};
</script>

<style scoped></style>
