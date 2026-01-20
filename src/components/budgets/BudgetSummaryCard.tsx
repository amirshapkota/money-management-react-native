import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/budget.styles";
import { theme } from "@/constants/theme";
import { useBudgetSummary } from "@/hooks/useBudgets";

interface BudgetSummaryCardProps {
  month: string;
}

export const BudgetSummaryCard = ({ month }: BudgetSummaryCardProps) => {
  const { data: summary, isLoading } = useBudgetSummary(month);

  if (isLoading || !summary) {
    return (
      <View
        style={[
          styles.summaryCard,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  const totalSpent = summary.totalSpent || 0;
  const totalBudget = summary.totalLimit || 0;
  const percentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const remaining = totalBudget - totalSpent;

  return (
    <View style={styles.summaryCard}>
      <View style={styles.balanceRow}>
        <View>
          <Text style={styles.balanceTitle}>Remaining</Text>
          <Text style={styles.balanceAmount}>${remaining.toFixed(2)}</Text>
        </View>
        <View
          style={[
            styles.changeBadge,
            { backgroundColor: percentage > 80 ? "#FEE2E2" : "#E0E7FF" },
          ]}
        >
          <MaterialIcons
            name={percentage > 80 ? "trending-down" : "trending-up"}
            size={16}
            color={percentage > 80 ? "#EF4444" : "#4F46E5"}
          />
          <Text
            style={[
              styles.changeText,
              { color: percentage > 80 ? "#EF4444" : "#4F46E5" },
            ]}
          >
            {percentage.toFixed(1)}%
          </Text>
        </View>
      </View>

      <View style={styles.spendRow}>
        <Text style={styles.spendText}>
          Total Spent:{" "}
          <Text style={{ color: theme.colors.text.primary }}>
            ${totalSpent.toFixed(2)}
          </Text>
        </Text>
        <Text style={styles.limitText}>Limit: ${totalBudget.toFixed(2)}</Text>
      </View>

      <View style={styles.mainProgressBarBg}>
        <View
          style={[
            styles.mainProgressBarFill,
            {
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor:
                percentage > 90
                  ? "#EF4444"
                  : percentage > 80
                    ? "#F59E0B"
                    : theme.colors.primary,
            },
          ]}
        />
      </View>

      <View style={styles.periodRow}>
        <Text style={styles.periodText}>Start of Month</Text>
        <Text style={styles.periodText}>End of Month</Text>
      </View>
    </View>
  );
};
