import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

interface BillingCycleSelectorProps {
  label: string;
  selectedCycle: string;
  onPress: () => void;
}

const BILLING_CYCLES = ["Monthly", "Yearly", "Weekly", "Custom"];

export const BillingCycleSelector = ({
  label,
  selectedCycle,
  onPress,
}: BillingCycleSelectorProps) => {
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
              backgroundColor: "#F3E8FF",
              justifyContent: "center",
              alignItems: "center",
              marginRight: theme.spacing.m,
            }}
          >
            <Ionicons name="calendar" size={20} color="#A855F7" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: theme.colors.text.primary,
            }}
          >
            {selectedCycle}
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
