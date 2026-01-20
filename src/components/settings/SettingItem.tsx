import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";

interface SettingItemProps {
  icon: string;
  label: string;
  onPress: () => void;
  isLast?: boolean;
}

export const SettingItem = ({
  icon,
  label,
  onPress,
  isLast,
}: SettingItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
      onPress={onPress}
    >
      <View style={styles.menuIcon}>
        <Ionicons name={icon as any} size={18} color="#334155" />
      </View>
      <Text style={styles.menuText}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
    </TouchableOpacity>
  );
};
