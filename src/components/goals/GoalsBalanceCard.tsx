import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";
import { useGoalsSummary } from "@/hooks/useGoals";

export const GoalsBalanceCard = () => {
  const { data: summary, isLoading } = useGoalsSummary();

  if (isLoading || !summary) {
    return (
      <View
        style={[
          styles.balanceCard,
          { justifyContent: "center", alignItems: "center", minHeight: 180 },
        ]}
      >
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  const totalCurrent = summary.totalCurrentAmount || 0;
  const totalTarget = summary.totalTargetAmount || 0;
  const monthlyRequired = 0; // Calculate from target date if needed
  const remaining = totalTarget - totalCurrent;
  const growthPercentage =
    summary.totalGoals > 0 ? (totalCurrent / totalTarget) * 100 : 0;

  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <FontAwesome6
          name="wallet"
          size={12}
          color="#4F46E5"
          style={styles.walletIcon}
        />
        <Text style={styles.balanceLabel}>TOTAL SAVED</Text>
      </View>
      <Text style={styles.balanceAmount}>
        ${Math.floor(totalCurrent)}
        <Text style={styles.balanceDecimal}>
          .{(totalCurrent % 1).toFixed(2).substring(2)}
        </Text>
      </Text>
      <View style={styles.growthContainer}>
        <MaterialCommunityIcons
          name={growthPercentage > 0 ? "trending-up" : "trending-neutral"}
          size={20}
          color={
            growthPercentage > 50
              ? theme.colors.status.success
              : theme.colors.text.secondary
          }
        />
        <Text style={styles.growthText}>
          {growthPercentage.toFixed(1)}% towards goals
        </Text>
      </View>

      <View style={styles.balanceStatsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Monthly Goal</Text>
          <Text style={styles.statValue}>${monthlyRequired.toFixed(2)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>${remaining.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};
