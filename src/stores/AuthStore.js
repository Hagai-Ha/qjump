import { makeAutoObservable } from "mobx";
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
    this.loading = true;
    this.errorMessage = "";

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (authError) {
      this.errorMessage = "Incorrect Username or Password";
      this.loading = false;
      return null;
    }

    const { data: userData, error: userError } = await supabase
      .from('Users')
      .select('*')
      .eq('email', this.email)
      .single();

    this.loading = false;
    if (userError || !userData) {
      this.errorMessage = "User not found on system";
      return null;
    }

    return userData.patientId;
  }
}

export const authStore = new AuthStore();