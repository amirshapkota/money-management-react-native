import React from "react";
import { View, ScrollView, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/dashboard/Header";
import { BalanceCard } from "@/components/dashboard/BalanceCard";
import { IncomeExpenseCards } from "@/components/dashboard/IncomeExpenseCards";
import { BudgetCard } from "@/components/dashboard/BudgetCard";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { styles } from "@/styles/dashboard.styles";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header />
          <BalanceCard />
          <IncomeExpenseCards />
          <BudgetCard />
          <SavingsGoals />
          <RecentActivity />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
