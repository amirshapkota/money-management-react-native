import React from "react";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";

export const BudgetCard = () => {
  const router = useRouter();
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.budgetCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Monthly Budget</Text>
            <Text style={styles.sectionSubtitle}>October 2023</Text>
          </View>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => router.push("/budget")}
          >
            <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.budgetAmounts}>
          <Text style={styles.spentAmount}>$850</Text>
          <Text style={styles.totalBudget}>of $1,200</Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: "70%" }]} />
        </View>

        <View style={styles.budgetmessageContainer}>
          <Ionicons name="checkmark-circle" size={20} color="#3B82F6" />
          <Text style={styles.budgetMessage}>
            <Text style={{ fontWeight: "700", color: "#334155" }}>
              Great job!{" "}
            </Text>
            You're staying well within your limits. Keep it up!
          </Text>
        </View>
      </View>
    </View>
  );
};
