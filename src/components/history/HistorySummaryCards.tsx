import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/history.styles";

export const HistorySummaryCards = () => {
  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>TOTAL SPENT</Text>
        <Text style={styles.expenseAmount}>$2,450.00</Text>
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>TOTAL INCOME</Text>
        <Text style={styles.incomeAmount}>+$3,200.00</Text>
      </View>
    </View>
  );
};
