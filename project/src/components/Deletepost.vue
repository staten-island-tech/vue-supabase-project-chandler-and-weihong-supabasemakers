<template>
  <div class="modal">
    <h2>Delete Post</h2>
    <p>Are you sure you want to delete this post?</p>
    <button @click="deletePost">Delete</button>
    <button @click="close">Cancel</button>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  postId: String,
});
const emit = defineEmits(["close", "post-deleted"]);

const errorMessage = ref("");

const deletePost = async () => {
  try {
    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", props.postId);

    if (error) throw error;

    emit("post-deleted");
    close();
  } catch (error) {
    errorMessage.value =
      error.message || "An error occurred while deleting the post.";
  }
};

const close = () => {
  emit("close");
};
</script>

<style scoped>
.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
