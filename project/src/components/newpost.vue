<template>
  <div>
    <h2>New Post</h2>
    <form @submit.prevent="submit">
      <input type="text" v-model="title" placeholder="Title" required />
      <textarea
        v-model="description"
        placeholder="Contents"
        required
      ></textarea>
      <button type="submit">Post</button>
    </form>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useSessionStore } from "../stores/pinia";
import { supabase } from "../supabase";

const title = ref("");
const description = ref("");
const errorMessage = ref("");
const sessionStore = useSessionStore();

const submit = async () => {
  try {
    if (!sessionStore.session) {
      throw new Error("Please log in to create posts.");
    }

    const { data, error } = await supabase.from("posts").insert([
      {
        title: title.value,
        description: description.value,
        created_at: new Date(),
        id: sessionStore.session.user.id,
      },
    ]);

    if (error) throw error;

    title.value = "";
    description.value = "";
    errorMessage.value = "";
  } catch (error) {
    errorMessage.value =
      error.message || "An error occurred while creating the post.";
  }
};
</script>

<style scoped></style>
