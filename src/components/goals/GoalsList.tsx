import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GoalCard } from "./GoalCard";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";

interface GoalsListProps {
  onGoalPress: (goalId: string) => void;
}

export const GoalsList = ({ onGoalPress }: GoalsListProps) => {
  const router = useRouter();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: theme.spacing.l,
        }}
      >
        <Text style={styles.sectionTitle}>Your Goals</Text>
        <TouchableOpacity
          style={{
            padding: 4,
            backgroundColor: "#EFF6FF",
            borderRadius: 20,
          }}
          onPress={() => router.push("/add-goal")}
        >
          <Ionicons name="add" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.goalsList}>
        <GoalCard
          name="MacBook Pro"
          category="Electronics"
          currentAmount="$800"
          targetAmount="$2,000"
          progress={0.4}
          color="#F59E0B"
          onPress={() => onGoalPress("macbook")}
          onDeposit={() => {}}
        />

        <GoalCard
          name="Spring Break"
          category="Travel"
          currentAmount="$450"
          targetAmount="$500"
          progress={0.9}
          color="#2DD4BF"
          onPress={() => {}}
          onDeposit={() => {}}
        />

        <GoalCard
          name="Rainy Day"
          category="Safety Net"
          currentAmount="$100"
          targetAmount="$1,000"
          progress={0.1}
          color="#F97316"
          onPress={() => {}}
          onDeposit={() => {}}
        />
      </View>
    </>
  );
};
