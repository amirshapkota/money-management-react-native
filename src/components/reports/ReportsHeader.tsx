import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/reports.styles";
import { theme } from "@/constants/theme";

export const ReportsHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
        <Ionicons
          name="arrow-back"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>Financial Reports</Text>
        <Text style={styles.headerSubtitle}>Analysis & Export</Text>
      </View>
    </View>
  );
};
