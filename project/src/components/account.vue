<template>
  <div>
    <h2>Welcome, {{ session.user.email }}</h2>
    <button @click="signOut">Sign Out</button>
  </div>
  <div>
    <form>
      <button @click="newpost" >Createpost</button>
      <input type="text" v-model="postcontent">
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { defineProps } from "vue";

const postcontent = ref("");

const props = defineProps({
  session: Object,
});


const newpost = async () => {await supabase
  .from('posts')
  .insert({ contents, postcontent  })
}

  
const signOut = async () => {
  await supabase.auth.signOut();
};
</script>
