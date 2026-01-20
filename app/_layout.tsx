import React from "react";
import { Stack, Slot } from "expo-router";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ActivityIndicator, View } from "react-native";
import OnboardingScreen from "@/screens/OnboardingScreen";
import AuthScreen from "@/screens/AuthScreen";
import { SplitBillProvider } from "@/context/SplitBillContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const RootLayoutNav = () => {
  const {
    isAuthenticated,
    isLoading,
    hasSeenOnboarding,
    login,
    completeOnboarding,
  } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={login} />;
  }

  // Authenticated: Render the Slot which will load app/(tabs)
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SplitBillProvider>
            <RootLayoutNav />
          </SplitBillProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
