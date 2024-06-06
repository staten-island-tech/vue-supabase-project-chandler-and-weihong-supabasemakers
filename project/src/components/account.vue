<template>
  <div>
    <h2 v-if="session">Welcome, {{ session.user.email }}</h2>
    <h2 v-else>Loading...</h2>
    <button v-if="session" @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { defineProps, ref, watch } from "vue";

const props = defineProps({
  session: Object,
});

const session = ref(props.session);

const signOut = async () => {
  await supabase.auth.signOut();
  session.value = null;
};

watch(
  () => props.session,
  (newSession) => {
    session.value = newSession;
  }
);
</script>
