import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";
import { useActiveGoals } from "@/hooks/useGoals";
import { theme } from "@/constants/theme";

const GOAL_ICONS: Record<string, { icon: string; color: string }> = {
  electronics: { icon: "laptop", color: "#6366F1" },
  travel: { icon: "airplane", color: "#EF4444" },
  savings: { icon: "piggy-bank", color: "#F59E0B" },
  education: { icon: "school", color: "#8B5CF6" },
  home: { icon: "home", color: "#EC4899" },
  health: { icon: "heart-pulse", color: "#10B981" },
  other: { icon: "star", color: "#6B7280" },
};

export const SavingsGoals = () => {
  const router = useRouter();
  const { data: goals, isLoading } = useActiveGoals();

  const getGoalIcon = (category: string) => {
    return GOAL_ICONS[category.toLowerCase()] || GOAL_ICONS.other;
  };

  return (
    <View>
      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Savings Goals</Text>
        <TouchableOpacity onPress={() => router.push("/goal")}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{ padding: 32, alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : (
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

          {goals && goals.length > 0 ? (
            goals.slice(0, 5).map((goal) => {
              const percent = Math.round(
                (goal.current_amount / goal.target_amount) * 100,
              );

              // Parse icon from name (format: icon:iconName|actualName)
              let displayName = goal.name;
              let iconName = "star";

              if (goal.name.startsWith("icon:")) {
                const parts = goal.name.split("|");
                if (parts.length === 2) {
                  iconName = parts[0].replace("icon:", "");
                  displayName = parts[1];
                }
              }

              const goalColor = goal.color || "#6B7280";

              return (
                <TouchableOpacity
                  key={goal.id}
                  style={styles.savingsCard}
                  onPress={() => router.push("/goal")}
                >
                  <View style={styles.goalIconContainer}>
                    <View
                      style={[
                        styles.goalIcon,
                        {
                          backgroundColor: goalColor + "15",
                        },
                      ]}
                    >
                      <MaterialCommunityIcons
                        name={iconName as any}
                        size={20}
                        color={goalColor}
                      />
                    </View>
                    <View
                      style={[
                        styles.percentBadge,
                        {
                          backgroundColor: goalColor + "15",
                        },
                      ]}
                    >
                      <Text style={[styles.percentText, { color: goalColor }]}>
                        {percent}%
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.goalName} numberOfLines={1}>
                    {displayName}
                  </Text>

                  <View style={styles.goalProgressBg}>
                    <View
                      style={[
                        styles.goalProgressFill,
                        {
                          width: `${Math.min(percent, 100)}%`,
                          backgroundColor: goalColor,
                        },
                      ]}
                    />
                  </View>

                  <Text style={styles.goalAmountText}>
                    ${goal.current_amount.toFixed(0)} / $
                    {goal.target_amount.toFixed(0)}
                  </Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={{ padding: 20 }}>
              <Text style={{ color: theme.colors.text.secondary }}>
                No goals yet
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
