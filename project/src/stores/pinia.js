import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useSessionStore = defineStore("session", {
  state: () => ({
    session: null,
  }),
  actions: {
    async fetchSession() {
      const { data } = await supabase.auth.getSession();
      this.session = data.session;
    },
    setSession(newSession) {
      this.session = newSession;
    },
    async signOut() {
      await supabase.auth.signOut();
      this.session = null;
    },
  },
});
