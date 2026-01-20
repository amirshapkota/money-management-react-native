import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";
import { theme } from "@/constants/theme";

export const SettingsHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Settings</Text>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons
          name="ellipsis-horizontal"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
