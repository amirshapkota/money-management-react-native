import React from "react";
import { View, Text } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/history.styles";
import { Database } from "@/types/database.types";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

interface TransactionListProps {
  transactions: Transaction[];
}

// Helper function to get icon and color based on category
const getCategoryIcon = (category: string, type: "income" | "expense") => {
  const categoryMap: Record<
    string,
    {
      icon: string;
      iconFamily: "Feather" | "Ionicons";
      bg: string;
      color: string;
    }
  > = {
    "Food & Drink": {
      icon: "coffee",
      iconFamily: "Feather",
      bg: "#FFF7ED",
      color: "#EA580C",
    },
    Transport: {
      icon: "car",
      iconFamily: "Ionicons",
      bg: "#EFF6FF",
      color: "#2563EB",
    },
    Shopping: {
      icon: "shopping-bag",
      iconFamily: "Feather",
      bg: "#F3E8FF",
      color: "#9333EA",
    },
    Entertainment: {
      icon: "film",
      iconFamily: "Feather",
      bg: "#FEF3C7",
      color: "#F59E0B",
    },
    Bills: {
      icon: "file-text",
      iconFamily: "Feather",
      bg: "#FEE2E2",
      color: "#EF4444",
    },
    Health: {
      icon: "heart",
      iconFamily: "Feather",
      bg: "#DCFCE7",
      color: "#10B981",
    },
    Income: {
      icon: "trending-up",
      iconFamily: "Feather",
      bg: "#ECFDF5",
      color: "#059669",
    },
    Salary: {
      icon: "cash-outline",
      iconFamily: "Ionicons",
      bg: "#ECFDF5",
      color: "#059669",
    },
  };

  return (
    categoryMap[category] ||
    (type === "income"
      ? {
          icon: "trending-up",
          iconFamily: "Feather" as const,
          bg: "#ECFDF5",
          color: "#059669",
        }
      : {
          icon: "shopping-bag",
          iconFamily: "Feather" as const,
          bg: "#F3F4F6",
          color: "#6B7280",
        })
  );
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "TODAY";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "YESTERDAY";
  } else {
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  }
};

// Group transactions by date
const groupTransactionsByDate = (transactions: Transaction[]) => {
  const groups: Record<string, Transaction[]> = {};

  transactions.forEach((transaction) => {
    const dateKey = formatDate(transaction.transaction_date);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
  });

  return groups;
};

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}) => {
  const groupedTransactions = groupTransactionsByDate(transactions);

  const renderTransaction = (transaction: Transaction) => {
    const iconData = getCategoryIcon(transaction.category, transaction.type);
    const amount =
      transaction.type === "income"
        ? `+$${Number(transaction.amount).toFixed(2)}`
        : `-$${Number(transaction.amount).toFixed(2)}`;

    return (
      <View key={transaction.id} style={styles.transactionItem}>
        <View style={[styles.iconBox, { backgroundColor: iconData.bg }]}>
          {iconData.iconFamily === "Feather" ? (
            <Feather
              name={iconData.icon as any}
              size={24}
              color={iconData.color}
            />
          ) : (
            <Ionicons
              name={iconData.icon as any}
              size={24}
              color={iconData.color}
            />
          )}
        </View>
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>
            {transaction.description || transaction.category}
          </Text>
          <Text style={styles.itemSubtitle}>
            {transaction.category}
            {transaction.merchant && ` • ${transaction.merchant}`}
          </Text>
        </View>
        <Text
          style={[
            styles.itemAmount,
            transaction.type === "income"
              ? styles.amountIncome
              : styles.amountExpense,
          ]}
        >
          {amount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.listContent}>
      {Object.entries(groupedTransactions).map(([date, dateTransactions]) => (
        <View key={date}>
          <Text style={styles.sectionTitle}>{date}</Text>
          {dateTransactions.map(renderTransaction)}
        </View>
      ))}
    </View>
  );
};
