<template>
  <div>
    <h2 v-if="sessionStore.session">
      Welcome, {{ sessionStore.session.user.email }}
    </h2>
    <h2 v-else>Loading...</h2>
    <button v-if="sessionStore.session" @click="signOut">Sign Out</button>
  </div>
  <div>
    <form>
      <button @click="newpost">Createpost</button>
      <input type="text" v-model="postcontent" />
    </form>
  </div>
</template>

<script setup>
import { useSessionStore } from "../stores/pinia";

const sessionStore = useSessionStore();

const newpost = async () => {
  await supabase.from("posts").insert({ contents, postcontent });
};

const signOut = async () => {
  await sessionStore.signOut();
};
</script>
