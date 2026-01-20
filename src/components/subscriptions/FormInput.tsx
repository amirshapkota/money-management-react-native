import React from "react";
import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon: string;
  iconColor?: string;
  iconBgColor?: string;
  keyboardType?: "default" | "numeric" | "email-address";
}

export const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  iconColor = theme.colors.primary,
  iconBgColor = "#DBEAFE",
  keyboardType = "default",
}: FormInputProps) => {
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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          padding: theme.spacing.m,
          ...theme.shadows.small,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: iconBgColor,
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.m,
          }}
        >
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "600",
            color: theme.colors.text.primary,
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.light}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};
