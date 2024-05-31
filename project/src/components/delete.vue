<template>
  <div>
    <button @click="deleteItem">Delete Item</button>
  </div>
</template>

<script setup>
const deleteItem = async () => {
  const itemId = prompt("enter name of item to delete:");
  if (!itemId) return;

  try {
    const { data, error } = await supabase
      .from("your-table-name")
      .delete()
      .eq("id", itemId);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      console.log("Item deleted:", data);
    }
  } catch (error) {
    console.error("Error deleting item:", error.message);
  }
};
</script>
