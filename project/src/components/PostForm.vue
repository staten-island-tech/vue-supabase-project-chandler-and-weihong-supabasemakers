<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <textarea v-model="content" placeholder="What's on your mind?"></textarea>
      <button type="submit">Post</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const content = ref("");

const handleSubmit = async () => {
  if (content.value.trim()) {
    const { error } = await supabase
      .from("posts")
      .insert([{ content: content.value }]);
    if (error) console.error("Error creating post:", error);
    else content.value = "";
  }
};
</script>
