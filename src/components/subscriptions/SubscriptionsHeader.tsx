import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";
import { theme } from "@/constants/theme";

export const SubscriptionsHeader = () => {
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
        <Text style={styles.headerOverline}>MANAGE</Text>
        <Text style={styles.headerTitle}>Subscriptions</Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-subscription")}
      >
        <Ionicons name="add-circle" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};
