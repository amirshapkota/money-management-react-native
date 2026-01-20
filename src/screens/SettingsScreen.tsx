import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ProfileCard } from "@/components/settings/ProfileCard";
import { SettingsSection } from "@/components/settings/SettingsSection";
import { SettingItem } from "@/components/settings/SettingItem";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { CurrencySelector } from "@/components/settings/CurrencySelector";
import { ToggleSettingItem } from "@/components/settings/ToggleSettingItem";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark" | "system">(
    "light"
  );

  return (
    <SafeAreaView style={styles.container}>
      <SettingsHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileCard />

        {/* General Section */}
        <SettingsSection title="GENERAL">
          <SettingItem icon="person" label="Account Info" onPress={() => {}} />
          <SettingItem icon="shapes" label="Categories" onPress={() => {}} />
          <SettingItem
            icon="sync"
            label="Data & Sync"
            onPress={() => {}}
            isLast
          />
        </SettingsSection>

        {/* Preferences Section */}
        <SettingsSection title="PREFERENCES" noPadding>
          <ThemeSelector
            currentTheme={currentTheme}
            onThemeChange={setCurrentTheme}
          />
          <CurrencySelector currency="USD ($)" onPress={() => {}} />
          <ToggleSettingItem
            icon="notifications"
            iconColor="#9333EA"
            iconBgColor="#F3E8FF"
            label="Notifications"
            subtitle="Alerts & Reminders"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            hasTopBorder
          />
          <ToggleSettingItem
            icon="finger-print"
            iconColor="#16A34A"
            iconBgColor="#DCFCE7"
            label="Face ID"
            subtitle="Secure Access"
            value={faceIdEnabled}
            onValueChange={setFaceIdEnabled}
            hasTopBorder
          />
        </SettingsSection>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 2.4.0 (Build 1024)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
