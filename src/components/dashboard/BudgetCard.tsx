import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";
import { useBudgetByMonth, useBudgetSummary } from "@/hooks/useBudgets";
import { theme } from "@/constants/theme";

export const BudgetCard = () => {
  const router = useRouter();

  // Get current month
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const monthName = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const { data: budget, isLoading: budgetLoading } =
    useBudgetByMonth(currentMonth);
  const { data: summary, isLoading: summaryLoading } =
    useBudgetSummary(currentMonth);

  const isLoading = budgetLoading || summaryLoading;

  if (isLoading) {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.budgetCard}>
          <View style={{ padding: 32, alignItems: "center" }}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        </View>
      </View>
    );
  }

  if (!budget || !summary) {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.budgetCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Monthly Budget</Text>
              <Text style={styles.sectionSubtitle}>{monthName}</Text>
            </View>
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => router.push("/budget")}
            >
              <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.text.secondary,
              padding: 20,
            }}
          >
            No budget set for this month
          </Text>
        </View>
      </View>
    );
  }

  const totalSpent = summary.totalSpent || 0;
  const totalLimit = summary.totalLimit || 0;
  const percentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;
  const remaining = totalLimit - totalSpent;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.budgetCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Monthly Budget</Text>
            <Text style={styles.sectionSubtitle}>{monthName}</Text>
          </View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => router.push("/budget")}
          >
            <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.budgetAmounts}>
          <Text style={styles.spentAmount}>${totalSpent.toFixed(0)}</Text>
          <Text style={styles.totalBudget}>of ${totalLimit.toFixed(0)}</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(percentage, 100)}%` },
            ]}
          />
        </View>

        <View style={styles.budgetmessageContainer}>
          <Ionicons
            name={percentage > 90 ? "warning" : "checkmark-circle"}
            size={20}
            color={percentage > 90 ? "#EF4444" : "#3B82F6"}
          />
          <Text style={styles.budgetMessage}>
            {percentage > 100 ? (
              <>
                <Text style={{ fontWeight: "700", color: "#EF4444" }}>
                  Over budget!{" "}
                </Text>
                You've exceeded your limit by ${Math.abs(remaining).toFixed(0)}.
              </>
            ) : percentage > 90 ? (
              <>
                <Text style={{ fontWeight: "700", color: "#F59E0B" }}>
                  Almost there!{" "}
                </Text>
                Only ${remaining.toFixed(0)} remaining.
              </>
            ) : (
              <>
                <Text style={{ fontWeight: "700", color: "#334155" }}>
                  Great job!{" "}
                </Text>
                You're staying well within your limits. Keep it up!
              </>
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};
