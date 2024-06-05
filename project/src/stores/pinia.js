import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useStore = defineStore("main", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      this.user = user;
    },
    async signOut() {
      await supabase.auth.signOut();
      this.user = null;
    },
  },
});
