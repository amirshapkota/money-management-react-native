import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/budget.styles";
import { theme } from "@/constants/theme";

export const BudgetHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerOverline}>OVERVIEW</Text>
        <Text style={styles.headerTitle}>My Budgets</Text>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
