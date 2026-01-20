import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

interface CategorySelectorProps {
  label: string;
  selectedCategory: string;
  onPress: () => void;
}

const CATEGORY_COLORS: { [key: string]: { bg: string; color: string } } = {
  Entertainment: { bg: "#FEE2E2", color: "#EF4444" },
  Productivity: { bg: "#DBEAFE", color: "#3B82F6" },
  Storage: { bg: "#FEF3C7", color: "#F59E0B" },
  Music: { bg: "#D1FAE5", color: "#10B981" },
  Design: { bg: "#E9D5FF", color: "#A855F7" },
  Other: { bg: "#F3F4F6", color: "#6B7280" },
};

export const CategorySelector = ({
  label,
  selectedCategory,
  onPress,
}: CategorySelectorProps) => {
  const categoryStyle =
    CATEGORY_COLORS[selectedCategory] || CATEGORY_COLORS.Other;

  return (
    <View style={{ marginBottom: theme.spacing.l }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "700",
          color: theme.colors.text.light,
          letterSpacing: 1,
          marginBottom: theme.spacing.s,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: theme.spacing.m,
          ...theme.shadows.small,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: categoryStyle.bg,
              justifyContent: "center",
              alignItems: "center",
              marginRight: theme.spacing.m,
            }}
          >
            <Ionicons name="apps" size={20} color={categoryStyle.color} />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.text.primary,
            }}
          >
            {selectedCategory}
          </Text>
        </View>
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.text.light}
        />
      </TouchableOpacity>
    </View>
  );
};
