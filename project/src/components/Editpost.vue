<template>
  <div class="modal">
    <h2>Edit Post</h2>
    <form @submit.prevent="submit">
      <input type="text" v-model="title" placeholder="Title" required />
      <textarea
        v-model="description"
        placeholder="Description"
        required
      ></textarea>
      <button type="submit">Save</button>
      <button type="button" @click="close">Cancel</button>
    </form>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  post: Object,
});
const emit = defineEmits(["close", "post-updated"]);

const title = ref(props.post.title);
const description = ref(props.post.description);
const errorMessage = ref("");

const submit = async () => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .update({ title: title.value, description: description.value })
      .eq("id", props.post.id);

    if (error) throw error;

    emit("post-updated");
    close();
  } catch (error) {
    errorMessage.value =
      error.message || "An error occurred while updating the post.";
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
