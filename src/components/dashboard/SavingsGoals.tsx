import React from "react";
import { useRouter } from "expo-router";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";

const SAVINGS_DATA = [
  {
    id: "1",
    name: "New Laptop",
    current: 450,
    target: 1000,
    icon: "laptop",
    color: "#6366F1",
  },
  {
    id: "2",
    name: "Spring Trip",
    current: 200,
    target: 800,
    icon: "plane",
    color: "#EF4444",
  },
];

export const SavingsGoals = () => {
  const router = useRouter();
  return (
    <View>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Savings Goals</Text>
        <TouchableOpacity onPress={() => router.push("/goal")}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.savingsList}
      >
        <TouchableOpacity
          style={[styles.savingsCard, styles.newGoalCard]}
          onPress={() => router.push("/add-goal")}
        >
          <View style={styles.addGoalButton}>
            <Feather name="plus" size={24} color="#9CA3AF" />
          </View>
          <Text style={styles.newGoalText}>New Goal</Text>
        </TouchableOpacity>

        {SAVINGS_DATA.map((goal) => {
          const percent = Math.round((goal.current / goal.target) * 100);
          return (
            <View key={goal.id} style={styles.savingsCard}>
              <View style={styles.goalIconContainer}>
                <View
                  style={[
                    styles.goalIcon,
                    { backgroundColor: goal.color + "15" },
                  ]}
                >
                  <FontAwesome5 name={goal.icon} size={18} color={goal.color} />
                </View>
                <View
                  style={[
                    styles.percentBadge,
                    { backgroundColor: goal.color + "15" },
                  ]}
                >
                  <Text style={[styles.percentText, { color: goal.color }]}>
                    {percent}%
                  </Text>
                </View>
              </View>

              <Text style={styles.goalName} numberOfLines={1}>
                {goal.name}
              </Text>

              <View style={styles.goalProgressBg}>
                <View
                  style={[
                    styles.goalProgressFill,
                    { width: `${percent}%`, backgroundColor: goal.color },
                  ]}
                />
              </View>

              <Text style={styles.goalAmountText}>
                ${goal.current} / ${goal.target}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
