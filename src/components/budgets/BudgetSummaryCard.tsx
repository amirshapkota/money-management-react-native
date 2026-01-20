import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/budget.styles";
import { theme } from "@/constants/theme";

export const BudgetSummaryCard = () => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.balanceRow}>
        <View>
          <Text style={styles.balanceTitle}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$350.00</Text>
        </View>
        <View style={styles.changeBadge}>
          <MaterialIcons name="trending-up" size={16} color="#4F46E5" />
          <Text style={styles.changeText}>+2.4%</Text>
        </View>
      </View>

      <View style={styles.spendRow}>
        <Text style={styles.spendText}>
          Total Spent:{" "}
          <Text style={{ color: theme.colors.text.primary }}>$850</Text>
        </Text>
        <Text style={styles.limitText}>Limit: $1,200</Text>
      </View>

      <View style={styles.mainProgressBarBg}>
        <View style={[styles.mainProgressBarFill, { width: "70%" }]} />
      </View>

      <View style={styles.periodRow}>
        <Text style={styles.periodText}>Start of Month</Text>
        <Text style={styles.periodText}>End of Month</Text>
      </View>
    </View>
  );
};
