import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { theme } from "@/constants/theme";

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: string;
}

interface Member {
  id: string;
  name: string;
}

interface ActivityItemProps {
  expense: Expense;
  payer: Member | undefined;
  currency: string;
  onDelete: () => void;
}

export const ActivityItem = ({
  expense,
  payer,
  currency,
  onDelete,
}: ActivityItemProps) => {
  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons
          name="receipt-outline"
          size={24}
          color={theme.colors.text.primary}
        />
      </View>
      <View style={[styles.activityContent, { flex: 1 }]}>
        <Text style={styles.activityTitle}>{expense.description}</Text>
        <Text style={styles.activitySubtitle}>
          {payer?.name || "Unknown"} paid {currency}
          {expense.amount.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity onPress={onDelete} style={{ padding: 8 }}>
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );
};
