import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";
import { useCompletedGoals } from "@/hooks/useGoals";

export const CompletedGoalsList = () => {
  const router = useRouter();
  const { data: goals, isLoading } = useCompletedGoals();

  if (isLoading) {
    return (
      <View style={{ padding: 32, alignItems: "center" }}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  if (!goals || goals.length === 0) {
    return null;
  }

  return (
    <View style={{ marginTop: 24 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: theme.spacing.l,
          marginBottom: 16,
        }}
      >
        <Text style={styles.sectionTitle}>Completed Goals</Text>
        <View
          style={{
            backgroundColor: "#DCFCE7",
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#15803D" }}>
            {goals.length}
          </Text>
        </View>
      </View>

      <View style={styles.goalsList}>
        {goals.map((goal) => {
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

          const color = goal.color || "#6B7280";

          return (
            <TouchableOpacity
              key={goal.id}
              style={[styles.goalCard, { opacity: 0.8 }]}
              onPress={() => router.push(`/goal-complete?goalId=${goal.id}`)}
            >
              <View style={styles.goalHeader}>
                <View
                  style={[
                    styles.goalIconContainer,
                    { backgroundColor: color + "20" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={iconName as any}
                    size={24}
                    color={color}
                  />
                </View>
                <View style={styles.goalInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.goalName}>{displayName}</Text>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={theme.colors.status.success}
                    />
                  </View>
                  <Text style={styles.goalCategory}>Completed</Text>
                </View>
                <View style={styles.goalAmounts}>
                  <Text
                    style={[
                      styles.currentAmount,
                      { color: theme.colors.status.success },
                    ]}
                  >
                    ${goal.target_amount.toFixed(0)}
                  </Text>
                  <Text style={styles.targetAmount}>Goal Met!</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
