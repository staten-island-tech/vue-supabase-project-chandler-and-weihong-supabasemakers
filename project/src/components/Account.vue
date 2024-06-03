<template>
  <div>
    <h2>Welcome, {{ email.value }}</h2>
    <button @click="signOut">Sign Out</button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { defineProps } from "vue";
import {email} from "./auth.vue";


const props = defineProps({
  session: Object,
  email: Object,
});

const niceName = session.user.email.toString

const signOut = async () => {
  await supabase.auth.signOut();
};
</script>
