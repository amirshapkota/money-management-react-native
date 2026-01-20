import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";

export const IncomeExpenseCards = () => {
  return (
    <View style={styles.statsRow}>
      <View style={styles.statCard}>
        <View style={[styles.iconContainer, styles.incomeIcon]}>
          <Feather name="arrow-down" size={20} color="#10B981" />
        </View>
        <Text style={styles.statLabel}>INCOME</Text>
        <Text style={styles.statAmount}>+$2,300</Text>
      </View>
      <View style={styles.statCard}>
        <View style={[styles.iconContainer, styles.expenseIcon]}>
          <Feather name="arrow-up" size={20} color="#EF4444" />
        </View>
        <Text style={styles.statLabel}>EXPENSE</Text>
        <Text style={styles.statAmount}>-$1,050</Text>
      </View>
    </View>
  );
};
