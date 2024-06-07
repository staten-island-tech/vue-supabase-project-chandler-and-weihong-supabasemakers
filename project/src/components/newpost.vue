<template>
  <div class="card">
    <h2>New Post</h2>
    <form class="card-details" @submit.prevent="submit">
      <input class="text-title" type="text" v-model="title" placeholder="Title" required />
      <textarea
        class="text-body"
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

<style scoped>
.card {
 width: 254px;
 height: 190px;
 border-radius: 20px;
 background: #f5f5f5;
 position: relative;
 padding: 1.8rem;
 border: 2px solid #c3c6ce;
 transition: 0.5s ease-out;
 overflow: visible;
}

.card-details {
 color: black;
 height: 100%;
 gap: .5em;
 display: grid;
 place-content: center;
}

.card-button {
 transform: translate(-50%, 125%);
 width: 60%;
 border-radius: 1rem;
 border: none;
 background-color: #008bf8;
 color: #fff;
 font-size: 1rem;
 padding: .5rem 1rem;
 position: absolute;
 left: 50%;
 bottom: 0;
 opacity: 0;
 transition: 0.3s ease-out;
}

.text-body {
 color: rgb(134, 134, 134);
}

/*Text*/
.text-title {
 font-size: 1.5em;
 font-weight: bold;
}

/*Hover*/
.card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
 transform: translate(-50%, 50%);
 opacity: 1;
}</style>
