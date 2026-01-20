import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/styles/budget.styles";
import { theme } from "@/constants/theme";
import { BudgetHeader } from "@/components/budgets/BudgetHeader";
import { MonthTabs } from "@/components/budgets/MonthTabs";
import { BudgetSummaryCard } from "@/components/budgets/BudgetSummaryCard";
import { CategoryCard } from "@/components/budgets/CategoryCard";
import { useBudgetByMonth, useCreateBudget } from "@/hooks/useBudgets";

// Generate last 3 months with their keys
const generateMonths = () => {
  const months = [];
  const today = new Date();
  for (let i = 0; i < 3; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push({
      name: date.toLocaleDateString("en-US", { month: "long" }),
      key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`,
    });
  }
  return months;
};

const MONTHS = generateMonths();

export default function BudgetScreen() {
  const router = useRouter();
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);
  const activeMonth = MONTHS[activeMonthIndex];
  const monthKey = activeMonth.key;

  const { data: budget, isLoading, error } = useBudgetByMonth(monthKey);
  const createBudget = useCreateBudget();

  // Log for debugging
  useEffect(() => {
    console.log("BudgetScreen - monthKey:", monthKey);
    console.log("BudgetScreen - budget:", budget);
    console.log("BudgetScreen - isLoading:", isLoading);
    console.log("BudgetScreen - error:", error);
  }, [monthKey, budget, isLoading, error]);

  const handleCreateBudget = () => {
    createBudget.mutate(
      { month: monthKey, total_budget: 0 },
      {
        onError: (error) => {
          console.error("Failed to create budget:", error);
          Alert.alert("Error", "Failed to create budget. Please try again.");
        },
        onSuccess: (data) => {
          console.log("Budget created successfully:", data);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <BudgetHeader />
        <MonthTabs
          months={MONTHS.map((m) => m.name)}
          activeMonth={activeMonth.name}
          onMonthChange={(monthName: string) => {
            const index = MONTHS.findIndex((m) => m.name === monthName);
            if (index !== -1) setActiveMonthIndex(index);
          }}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {!budget && !isLoading ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="wallet-outline"
                size={80}
                color={theme.colors.text.light}
              />
              <Text style={styles.emptyStateTitle}>
                No Budget for {activeMonth.name}
              </Text>
              <Text style={styles.emptyStateDescription}>
                Create a monthly budget to track your spending and manage your
                finances better.
              </Text>
              <TouchableOpacity
                style={styles.createBudgetButton}
                onPress={handleCreateBudget}
                disabled={createBudget.isPending}
              >
                {createBudget.isPending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="add-circle" size={24} color="#FFFFFF" />
                    <Text style={styles.createBudgetButtonText}>
                      Create Budget
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <BudgetSummaryCard month={monthKey} />

              {isLoading || createBudget.isPending ? (
                <View style={{ padding: 32, alignItems: "center" }}>
                  <ActivityIndicator
                    size="large"
                    color={theme.colors.primary}
                  />
                  <Text
                    style={{
                      marginTop: 16,
                      color: theme.colors.text.secondary,
                    }}
                  >
                    Loading budget...
                  </Text>
                </View>
              ) : (
                <>
                  {/* Categories */}
                  <View style={styles.categoriesHeader}>
                    <Text style={styles.categoriesTitle}>Categories</Text>
                    <TouchableOpacity>
                      <Text style={styles.sortByText}>Sort by</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.categoryList}>
                    {budget?.budget_categories?.map((cat) => {
                      const percentage =
                        cat.limit_amount > 0
                          ? (cat.spent_amount / cat.limit_amount) * 100
                          : 0;
                      const warning =
                        percentage >= 100
                          ? "Maxed Out"
                          : percentage >= cat.alert_threshold * 100
                            ? "Near Limit"
                            : null;

                      return (
                        <TouchableOpacity
                          key={cat.id}
                          onPress={() =>
                            router.push(
                              `/add-budget-category?budgetId=${budget.id}&categoryId=${cat.id}` as any,
                            )
                          }
                        >
                          <CategoryCard
                            name={cat.name}
                            subtitle={warning || cat.name}
                            amount={cat.spent_amount}
                            limit={cat.limit_amount}
                            icon={cat.icon || "folder"}
                            color={cat.color || "#6366F1"}
                            warning={warning}
                          />
                        </TouchableOpacity>
                      );
                    })}

                    <TouchableOpacity
                      style={[
                        styles.newCategoryContainer,
                        !budget?.id && { opacity: 0.5 },
                      ]}
                      onPress={() => {
                        if (budget?.id) {
                          router.push(
                            `/add-budget-category?budgetId=${budget.id}` as any,
                          );
                        }
                      }}
                      disabled={!budget?.id}
                    >
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
                </>
              )}
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
