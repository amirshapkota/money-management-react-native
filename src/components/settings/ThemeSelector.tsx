import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";
import { theme } from "@/constants/theme";

type ThemeType = "light" | "dark" | "system";

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

export const ThemeSelector = ({
  currentTheme,
  onThemeChange,
}: ThemeSelectorProps) => {
  const themes: { value: ThemeType; label: string; bgColor: string }[] = [
    { value: "light", label: "Light", bgColor: "#FFFFFF" },
    { value: "dark", label: "Dark", bgColor: "#334155" },
    { value: "system", label: "System", bgColor: "#F1F5F9" },
  ];

  return (
    <View
      style={{
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F1F5F9",
      }}
    >
      <Text style={[styles.menuText, { marginBottom: 12 }]}>App Theme</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {themes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.value}
            style={styles.themeOption}
            onPress={() => onThemeChange(themeOption.value)}
          >
            <View
              style={[
                styles.themePreview,
                {
                  backgroundColor: themeOption.bgColor,
                  borderColor:
                    currentTheme === themeOption.value
                      ? theme.colors.primary
                      : "#E2E8F0",
                },
              ]}
            >
              {currentTheme === themeOption.value && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 4,
                    right: 4,
                    backgroundColor: theme.colors.primary,
                    borderRadius: 8,
                    padding: 2,
                  }}
                >
                  <Ionicons name="checkmark" size={10} color="#FFF" />
                </View>
              )}
            </View>
            <Text
              style={[
                styles.themeLabel,
                currentTheme === themeOption.value && {
                  color: theme.colors.primary,
                  fontWeight: "700",
                },
              ]}
            >
              {themeOption.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
