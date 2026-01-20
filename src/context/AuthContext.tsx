import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  hasSeenOnboarding: false,
  login: async () => {},
  logout: async () => {},
  completeOnboarding: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    try {
      const onboardingStatus = await AsyncStorage.getItem("hasSeenOnboarding");
      const authToken = await AsyncStorage.getItem("authToken");

      setHasSeenOnboarding(onboardingStatus === "true");
      setIsAuthenticated(!!authToken);
    } catch (error) {
      console.error("Error checking app state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    try {
      await AsyncStorage.setItem("authToken", "your-auth-token");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      setIsAuthenticated(false);
      setHasSeenOnboarding(false); // Optional: reset onboarding on logout for testing
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      setHasSeenOnboarding(true);
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        hasSeenOnboarding,
        login,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
