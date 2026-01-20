import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/settings.styles";

interface SettingsSectionProps {
  title: string;
  children: ReactNode;
  noPadding?: boolean;
}

export const SettingsSection = ({
  title,
  children,
  noPadding,
}: SettingsSectionProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={[styles.sectionCard, noPadding && { padding: 0 }]}>
        {children}
      </View>
    </View>
  );
};
