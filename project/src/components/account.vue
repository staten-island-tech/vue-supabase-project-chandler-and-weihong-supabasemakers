<template>
  <div>
    <h2 v-if="sessionStore.session">
      Welcome, {{ sessionStore.session.user.email }}
    </h2>
    <h2 v-else>Loading...</h2>
    <button v-if="sessionStore.session" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { useSessionStore } from "../stores/pinia";

const sessionStore = useSessionStore();

const signOut = async () => {
  await sessionStore.signOut();
};
</script>
