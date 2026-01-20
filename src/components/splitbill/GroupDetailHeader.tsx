import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { theme } from "@/constants/theme";

interface GroupDetailHeaderProps {
  groupName: string;
  membersCount: number;
  groupId: string;
}

export const GroupDetailHeader = ({
  groupName,
  membersCount,
  groupId,
}: GroupDetailHeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.headerTitle}>{groupName}</Text>
        <Text style={{ fontSize: 12, color: theme.colors.text.secondary }}>
          {membersCount} Members
        </Text>
      </View>
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() =>
          router.push({
            pathname: "/splitbill/settings",
            params: { id: groupId },
          })
        }
      >
        <Ionicons
          name="settings-outline"
          size={20}
          color={theme.colors.text.primary}
        />
      </TouchableOpacity>
    </View>
  );
};
