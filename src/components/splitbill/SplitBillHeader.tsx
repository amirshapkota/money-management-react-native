import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { theme } from "@/constants/theme";

export const SplitBillHeader = () => {
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
      <Text style={styles.headerTitle}>Split Bill</Text>
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons
          name="settings-outline"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
