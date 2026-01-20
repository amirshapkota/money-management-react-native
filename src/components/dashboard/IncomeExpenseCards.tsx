import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";
import { useTransactionStats } from "@/hooks/useTransactions";

export const IncomeExpenseCards = () => {
  // Calculate current month date range
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    .toISOString()
    .split("T")[0];

  const { data: stats, isLoading } = useTransactionStats(startDate, endDate);

  if (isLoading) {
    return (
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <ActivityIndicator size="small" color="#10B981" />
        </View>
        <View style={styles.statCard}>
          <ActivityIndicator size="small" color="#EF4444" />
        </View>
      </View>
    );
  }

  const income = stats?.income || 0;
  const expense = stats?.expense || 0;

  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <View style={[styles.iconContainer, styles.incomeIcon]}>
          <Feather name="arrow-down" size={20} color="#10B981" />
        </View>
        <Text style={styles.statLabel}>INCOME</Text>
        <Text style={styles.statAmount}>+${income.toFixed(2)}</Text>
      </View>
      <View style={styles.statCard}>
        <View style={[styles.iconContainer, styles.expenseIcon]}>
          <Feather name="arrow-up" size={20} color="#EF4444" />
        </View>
        <Text style={styles.statLabel}>EXPENSE</Text>
        <Text style={styles.statAmount}>-${expense.toFixed(2)}</Text>
      </View>
    </View>
  );
};
