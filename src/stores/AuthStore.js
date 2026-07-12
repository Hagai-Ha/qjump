import { makeAutoObservable, runInAction } from "mobx";
import { supabase } from "../data/supabaseClient";

class AuthStore {
  email = "";
  password = "";
  loading = false;
  errorMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setEmail = (val) => (this.email = val);
  setPassword = (val) => (this.password = val);

  async login() {
    runInAction(() => {
      this.loading = true;
      this.errorMessage = "";
    });

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: this.email,
        password: this.password,
      });

      if (authError) throw authError;

      const { data: userData, error: userError } = await supabase
        .from('patients')
        .select('*')
        .eq('user_id', authData.user.id)
        .single();

      if (userError) throw userError;

      runInAction(() => {
        this.loading = false;
      });

      return userData?.patient_id;

    } catch (error) {
      runInAction(() => {
        console.error("Login failed:", error);
        this.errorMessage = error.message || "An unexpected error occurred";
        this.loading = false;
      });
      return null;
    }
  }
}

export const authStore = new AuthStore();