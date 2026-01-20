import React from "react";
import { View, Text, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";
import { theme } from "@/constants/theme";

interface ToggleSettingItemProps {
  icon: string;
  iconColor: string;
  iconBgColor: string;
  label: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  hasTopBorder?: boolean;
}

export const ToggleSettingItem = ({
  icon,
  iconColor,
  iconBgColor,
  label,
  subtitle,
  value,
  onValueChange,
  hasTopBorder,
}: ToggleSettingItemProps) => {
  return (
    <View
      style={[
        styles.controlRow,
        hasTopBorder && { borderTopWidth: 1, borderTopColor: "#F1F5F9" },
      ]}
    >
      <View style={styles.controlLabelContainer}>
        <View
          style={[
            styles.menuIcon,
            { margin: 0, marginRight: 12, backgroundColor: iconBgColor },
          ]}
        >
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
        <View>
          <Text style={styles.controlText}>{label}</Text>
          {subtitle && <Text style={styles.controlSubtext}>{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E2E8F0", true: theme.colors.primary }}
        thumbColor={"#FFFFFF"}
      />
    </View>
  );
};
