import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

interface AddSubscriptionHeaderProps {
  onSave: () => void;
}

export const AddSubscriptionHeader = ({
  onSave,
}: AddSubscriptionHeaderProps) => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: theme.spacing.l,
        paddingTop: theme.spacing.m,
        paddingBottom: theme.spacing.m,
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
          ...theme.shadows.small,
        }}
      >
        <Ionicons name="close" size={24} color={theme.colors.text.primary} />
      </TouchableOpacity>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "700",
            color: theme.colors.text.light,
            letterSpacing: 1.2,
          }}
        >
          NEW
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: theme.colors.text.primary,
            marginTop: 2,
          }}
        >
          Subscription
        </Text>
      </View>

      <TouchableOpacity
        onPress={onSave}
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: theme.colors.primary,
          justifyContent: "center",
          alignItems: "center",
          ...theme.shadows.small,
        }}
      >
        <Ionicons name="checkmark" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};
