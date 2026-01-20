import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";

export const GoalsHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Savings Goals</Text>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
