import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

export const EmptyGroupsState = () => {
  return (
    <View style={{ alignItems: "center", marginTop: 100 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#F1F5F9",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <FontAwesome5 name="users" size={32} color={theme.colors.text.light} />
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          color: theme.colors.text.primary,
        }}
      >
        No Groups Yet
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: theme.colors.text.secondary,
          textAlign: "center",
          marginTop: 8,
          width: 200,
        }}
      >
        Create a group to start splitting bills with friends and roommates.
      </Text>
    </View>
  );
};
