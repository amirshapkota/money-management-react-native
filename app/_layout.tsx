import React from "react";
import { Stack, Slot } from "expo-router";
import { AuthProvider, useAuth } from "@/context/SupabaseAuthContext";
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
  const { user, isLoading, hasSeenOnboarding, completeOnboarding } = useAuth();

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

  if (!user) {
    return <AuthScreen />;
  }

  // Authenticated: Render the Stack which will load app/(tabs)
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-transaction"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="add-subscription"
        options={{ presentation: "modal" }}
      />
      <Stack.Screen name="add-goal" options={{ presentation: "modal" }} />
      <Stack.Screen name="budget" />
      <Stack.Screen name="goal" />
      <Stack.Screen name="goal-complete" />
      <Stack.Screen name="subscriptions" />
      <Stack.Screen name="reports" />
      <Stack.Screen name="search" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="upload-statement" />
      <Stack.Screen name="splitbill" />
    </Stack>
  );
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
