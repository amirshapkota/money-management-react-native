import React from "react";
import { View, Text } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";

const TRANSACTIONS = [
  {
    id: "1",
    title: "Starbucks",
    subtitle: "Food & Drink • Today",
    amount: -5.5,
    icon: "coffee",
    type: "expense",
    color: "#1F2937",
  },
  {
    id: "2",
    title: "Freelance Work",
    subtitle: "Income • Yesterday",
    amount: 150.0,
    icon: "cash",
    type: "income",
    color: "#10B981",
  },
  {
    id: "3",
    title: "Spotify Premium",
    subtitle: "Subscription • Oct 24",
    amount: -9.99,
    icon: "spotify",
    type: "expense",
    color: "#9333EA",
  },
];

export const RecentActivity = () => {
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

      {TRANSACTIONS.map((item) => (
        <View key={item.id} style={styles.transactionCard}>
          <View
            style={[
              styles.transactionIcon,
              { backgroundColor: item.color + "15" },
            ]}
          >
            <MaterialCommunityIcons
              name={item.icon as any}
              size={24}
              color={item.color}
            />
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.transactionTitle}>{item.title}</Text>
            <Text style={styles.transactionSubtitle}>{item.subtitle}</Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              item.amount > 0 ? styles.amountPositive : styles.amountNegative,
            ]}
          >
            {item.amount > 0 ? "+" : ""}${Math.abs(item.amount).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};
