import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";
import { useTransactionStats } from "@/hooks/useTransactions";
import { theme } from "@/constants/theme";

export const BalanceCard = () => {
  // Get current month date range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const { data: stats, isLoading } = useTransactionStats(startDate, endDate);

  if (isLoading || !stats) {
    return (
      <View
        style={[
          styles.balanceCard,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  const balance = stats.balance;
  // For now, we'll show 0% trend since we need last month's data to compare
  const trend = 0;
  const isPositiveTrend = trend >= 0;

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.percentageContainer}>
          <Feather
            name={isPositiveTrend ? "trending-up" : "trending-down"}
            size={14}
            color={isPositiveTrend ? "#10B981" : "#EF4444"}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.percentageText,
              { color: isPositiveTrend ? "#10B981" : "#EF4444" },
            ]}
          >
            {isPositiveTrend ? "+" : ""}
            {trend.toFixed(1)}%
          </Text>
        </View>
        <Text style={styles.comparisonText}>vs last month</Text>
      </View>
    </View>
  );
};
