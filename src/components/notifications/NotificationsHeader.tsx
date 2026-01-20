import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/notifications.styles";
import { theme } from "@/constants/theme";

export const NotificationsHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Notifications</Text>
      <TouchableOpacity style={styles.readAllButton}>
        <Ionicons name="checkmark-done" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
