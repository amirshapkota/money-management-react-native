import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/history.styles";

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  type: "expense" | "income";
  icon: string | any; // name of the icon
  iconFamily: "Feather" | "Ionicons";
  bg: string;
  color: string;
}

export const TransactionList = () => {
  const todayTransactions: Transaction[] = [
    {
      id: "1",
      title: "Morning Brew",
      subtitle: "Food & Drink • 8:30 AM",
      amount: "-$4.50",
      type: "expense",
      icon: "coffee",
      iconFamily: "Feather",
      bg: "#FFF7ED",
      color: "#EA580C",
    },
    {
      id: "2",
      title: "Starbucks",
      subtitle: "Meeting • 10:15 AM",
      amount: "-$12.20",
      type: "expense",
      icon: "cafe",
      iconFamily: "Ionicons",
      bg: "#18181b",
      color: "#FFFFFF",
    },
    {
      id: "3",
      title: "Uber Ride",
      subtitle: "Transport • 2:45 PM",
      amount: "-$24.00",
      type: "expense",
      icon: "car",
      iconFamily: "Ionicons",
      bg: "#EFF6FF",
      color: "#2563EB",
    },
  ];

  const yesterdayTransactions: Transaction[] = [
    {
      id: "4",
      title: "Client Payment",
      subtitle: "Freelance • 4:20 PM",
      amount: "+$850.00",
      type: "income",
      icon: "cash-outline",
      iconFamily: "Ionicons",
      bg: "#ECFDF5",
      color: "#059669",
    },
  ];

  const renderItem = (item: Transaction) => (
    <View key={item.id} style={styles.transactionItem}>
      <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
        {item.iconFamily === "Feather" ? (
          <Feather name={item.icon} size={24} color={item.color} />
        ) : (
          <Ionicons name={item.icon} size={24} color={item.color} />
        )}
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
      <Text
        style={[
          styles.itemAmount,
          item.type === "income" ? styles.amountIncome : styles.amountExpense,
        ]}
      >
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View>
      <Text style={styles.sectionTitle}>TODAY</Text>
      {todayTransactions.map(renderItem)}

      <Text style={styles.sectionTitle}>YESTERDAY</Text>
      {yesterdayTransactions.map(renderItem)}
    </View>
  );
};
