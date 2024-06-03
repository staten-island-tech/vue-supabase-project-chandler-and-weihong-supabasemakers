<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="post">
      <p>{{ post.content }}</p>
      <small>{{ new Date(post.created_at).toLocaleString() }}</small>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
});
</script>

<style>
.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
