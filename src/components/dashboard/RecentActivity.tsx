import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";
import { useTransactions } from "@/hooks/useTransactions";
import { theme } from "@/constants/theme";

const CATEGORY_ICONS: Record<string, { icon: string; color: string }> = {
  food: { icon: "food", color: "#F59E0B" },
  transport: { icon: "car", color: "#3B82F6" },
  shopping: { icon: "cart", color: "#EC4899" },
  entertainment: { icon: "gamepad-variant", color: "#8B5CF6" },
  bills: { icon: "receipt", color: "#EF4444" },
  salary: { icon: "cash", color: "#10B981" },
  other: { icon: "cash-multiple", color: "#6B7280" },
};

const getRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const RecentActivity = () => {
  const { data: transactions, isLoading } = useTransactions(5);

  return (
    <View style={{ marginTop: 24 }}>
      <Text
        style={[
          styles.sectionTitle,
          { paddingHorizontal: 24, marginBottom: 16 },
        ]}
      >
        Recent Activity
      </Text>

      {isLoading ? (
        <View style={{ padding: 32, alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : transactions && transactions.length > 0 ? (
        transactions.map((transaction: any) => {
          const categoryConfig =
            CATEGORY_ICONS[transaction.category.toLowerCase()] ||
            CATEGORY_ICONS.other;
          const isIncome = transaction.type === "income";
          const iconColor = isIncome ? "#10B981" : categoryConfig.color;

          return (
            <View key={transaction.id} style={styles.transactionCard}>
              <View
                style={[
                  styles.transactionIcon,
                  { backgroundColor: iconColor + "15" },
                ]}
              >
                <MaterialCommunityIcons
                  name={categoryConfig.icon as any}
                  size={24}
                  color={iconColor}
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>
                  {transaction.description || transaction.category}
                </Text>
                <Text style={styles.transactionSubtitle}>
                  {transaction.category} •{" "}
                  {getRelativeDate(transaction.transaction_date)}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  isIncome ? styles.amountPositive : styles.amountNegative,
                ]}
              >
                {isIncome ? "+" : "-"}${Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </View>
          );
        })
      ) : (
        <View style={{ padding: 32, alignItems: "center" }}>
          <Text style={{ color: theme.colors.text.secondary }}>
            No recent transactions
          </Text>
        </View>
      )}
    </View>
  );
};
