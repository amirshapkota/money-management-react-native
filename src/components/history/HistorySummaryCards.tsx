import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/history.styles";

interface HistorySummaryCardsProps {
  income: number;
  expense: number;
  balance: number;
}

export const HistorySummaryCards: React.FC<HistorySummaryCardsProps> = ({
  income = 0,
  expense = 0,
  balance = 0,
}) => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>TOTAL SPENT</Text>
        <Text style={styles.expenseAmount}>${expense.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>TOTAL INCOME</Text>
        <Text style={styles.incomeAmount}>+${income.toFixed(2)}</Text>
      </View>
    </View>
  );
};
