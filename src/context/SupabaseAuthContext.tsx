import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      console.warn("Supabase is not configured. Using fallback auth.");
      checkFallbackAuth();
      return;
    }

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      checkOnboardingStatus();
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event);
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem("hasSeenOnboarding");
      setHasSeenOnboarding(onboardingStatus === "true");
    } catch (error) {
      console.error("Error checking onboarding status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkFallbackAuth = async (): Promise<void> => {
    try {
      const onboardingStatus = await AsyncStorage.getItem("hasSeenOnboarding");
      const authToken = await AsyncStorage.getItem("authToken");

      setHasSeenOnboarding(onboardingStatus === "true");
      // For fallback, we'll use a mock user if token exists
      if (authToken) {
        setUser({ id: "fallback-user", email: "user@example.com" } as User);
      }
    } catch (error) {
      console.error("Error checking fallback auth:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured()) {
      // Fallback for development without Supabase
      await AsyncStorage.setItem("authToken", "fallback-token");
      setUser({ id: "fallback-user", email } as User);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // Note: User will receive confirmation email
    // Session will be created after email confirmation
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured()) {
      // Fallback for development without Supabase
      await AsyncStorage.setItem("authToken", "fallback-token");
      setUser({ id: "fallback-user", email } as User);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
  };

  const signInWithGoogle = async () => {
    if (!isSupabaseConfigured()) {
      throw new Error("Supabase must be configured to use OAuth");
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "moneyapp://auth/callback",
      },
    });

    if (error) throw error;
  };

  const signOut = async () => {
    if (!isSupabaseConfigured()) {
      // Fallback logout
      await AsyncStorage.clear();
      setUser(null);
      setHasSeenOnboarding(false);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Also clear onboarding status for testing
    await AsyncStorage.removeItem("hasSeenOnboarding");
    setHasSeenOnboarding(false);
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        hasSeenOnboarding,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
