<template>
  <div>
    <h2>Posts</h2>
    <div class="post-grid">
    <ul>
      <ul v-for="post in posts" :key="post.id">
        <div class="card">
          <div class="card-details">
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="text-body">{{ post.description }}</p>
            <button @click="editPost(post)">Edit</button>
            <button @click="confirmDelete(post.id)">Delete</button>
          </div>
        </div>
      </ul>
    </ul>
  </div>
    <DeletePost v-if="showDeleteModal" :postId="selectedPostId" @close="showDeleteModal = false"
      @post-deleted="postDeleted" />
    <EditPost v-if="showEditModal" :post="selectedPost" @close="showEditModal = false" @post-updated="fetchPosts" />
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
  justify-items: center;
}

.post img {
  width: 100%;
  height: auto;
}
.card {
 width: 254px;
 height: auto;
 border-radius: 20px;
 background: #f5f5f5;
 position: relative;
 padding: 1rem;
 border: 2px solid #c3c6ce;
 transition: 0.5s ease-out;
 overflow: hidden;
 margin: 1rem;
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
 resize: none;
}

.text-title {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5em;
 font-size: 1.5em;
 font-weight: bold;
}

.card:hover {
 border-color: #008bf8;
 box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
}

.card:hover .card-button {
 transform: translate(-50%, 50%);
 opacity: 1;
}
</style>
