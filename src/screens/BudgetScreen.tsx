import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/budget.styles";
import { theme } from "@/constants/theme";
import { BudgetHeader } from "@/components/budgets/BudgetHeader";
import { MonthTabs } from "@/components/budgets/MonthTabs";
import { BudgetSummaryCard } from "@/components/budgets/BudgetSummaryCard";
import { CategoryCard } from "@/components/budgets/CategoryCard";

// Mock Data
const CATEGORIES = [
  {
    id: 1,
    name: "Groceries",
    subtitle: "Monthly essentials",
    amount: 150,
    limit: 300,
    icon: "shopping-cart",
    color: "#6366F1",
    warning: null,
  },
  {
    id: 2,
    name: "Transport",
    subtitle: "Near Limit",
    amount: 45,
    limit: 50,
    icon: "bus",
    color: "#F59E0B",
    warning: "Near Limit",
  },
  {
    id: 3,
    name: "Rent",
    subtitle: "Maxed Out",
    amount: 600,
    limit: 600,
    icon: "home",
    color: "#EF4444",
    warning: "Maxed Out",
  },
  {
    id: 4,
    name: "Fun",
    subtitle: "Movies & Games",
    amount: 195,
    limit: 250,
    icon: "film",
    color: "#10B981",
    warning: null,
  },
];

const MONTHS = ["October", "November", "December"];

export default function BudgetScreen() {
  const [activeMonth, setActiveMonth] = useState("October");

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <BudgetHeader />
        <MonthTabs
          months={MONTHS}
          activeMonth={activeMonth}
          onMonthChange={setActiveMonth}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <BudgetSummaryCard />

          {/* Categories */}
          <View style={styles.categoriesHeader}>
            <Text style={styles.categoriesTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.sortByText}>Sort by</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryList}>
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                subtitle={cat.subtitle}
                amount={cat.amount}
                limit={cat.limit}
                icon={cat.icon}
                color={cat.color}
                warning={cat.warning}
              />
            ))}

            <TouchableOpacity style={styles.newCategoryContainer}>
              <View style={styles.newCategoryBtn}>
                <Ionicons
                  name="add-circle"
                  size={24}
                  color={theme.colors.text.secondary}
                />
                <Text style={styles.newCategoryText}>New Category</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
