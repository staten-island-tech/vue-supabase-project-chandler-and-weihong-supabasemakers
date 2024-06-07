<template>
  <div>
    <h2>Posts</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <h3>{{ post.title }}</h3>
        <p>{{ post.description }}</p>
        <button @click="editPost(post)">Edit</button>
        <button @click="confirmDelete(post.id)">Delete</button>
      </li>
    </ul>
    <DeletePost
      v-if="showDeleteModal"
      :postId="selectedPostId"
      @close="showDeleteModal = false"
      @post-deleted="postDeleted"
    />
    <EditPost
      v-if="showEditModal"
      :post="selectedPost"
      @close="showEditModal = false"
      @post-updated="fetchPosts"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";
import DeletePost from "./Deletepost.vue";
import EditPost from "./Editpost.vue";

const posts = ref([]);
const showDeleteModal = ref(false);
const selectedPostId = ref(null);
const showEditModal = ref(false);
const selectedPost = ref(null);

const fetchPosts = async () => {
  const { data } = await supabase.from("posts").select("*");
  posts.value = data;
};

const confirmDelete = (postId) => {
  selectedPostId.value = postId;
  showDeleteModal.value = true;
};

const postDeleted = () => {
  fetchPosts();
  showDeleteModal.value = false;
};

const editPost = (post) => {
  selectedPost.value = post;
  showEditModal.value = true;
};

onMounted(fetchPosts);
</script>

<style scoped></style>

<style scoped>
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
.post img {
  width: 100%;
  height: auto;
}
</style>
