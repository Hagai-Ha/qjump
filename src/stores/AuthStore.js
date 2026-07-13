import { makeAutoObservable, runInAction } from "mobx";
import { supabase } from "../data/supabaseClient";

class AuthStore {
  email = "";
  password = "";
  loading = false;
  errorMessage = "";
  user=null; //added for tracking the authenticated user
  constructor() {
    makeAutoObservable(this);
    this.initializeAuth();
  }

  setEmail = (val) => (this.email = val);
  setPassword = (val) => (this.password = val);
  //this function initializes the authentication state by checking
  //   if there's an existing session and setting up a listener for auth state changes.
  //It ensures that the user state is always in sync with Supabase's auth state.
  async initializeAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    runInAction(() => {
      this.user = session?.user || null;
    });

    // Listen to changes (login / logout events)
    supabase.auth.onAuthStateChange((_event, session) => {
      runInAction(() => {
        this.user = session?.user || null;// Update the user state based on the session
      });
    });
  }
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
        this.user = authData.user;// Update the user state with the authenticated user
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