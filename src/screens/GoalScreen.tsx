import React from "react";
import { View, ScrollView, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "@/styles/goal.styles";
import { GoalsHeader } from "@/components/goals/GoalsHeader";
import { GoalsBalanceCard } from "@/components/goals/GoalsBalanceCard";
import { GoalsList } from "@/components/goals/GoalsList";
import { theme } from "@/constants/theme";

export default function GoalScreen() {
  const router = useRouter();

  const handleGoalPress = (goalId: string) => {
    // For demo, we just go to the complete screen if it's the macbook pro
    if (goalId === "macbook") {
      router.push("/goal-complete");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.background}
      />
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <GoalsHeader />
          <GoalsBalanceCard />
          <GoalsList onGoalPress={handleGoalPress} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
