import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { theme } from "@/constants/theme";

interface GroupCardProps {
  id: string;
  name: string;
  membersCount: number;
  expensesCount: number;
}

export const GroupCard = ({
  id,
  name,
  membersCount,
  expensesCount,
}: GroupCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.groupCard}
      onPress={() => router.push(`/splitbill/${id}`)}
    >
      <View style={styles.groupIcon}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: theme.colors.primary,
          }}
        >
          {name.charAt(0)}
        </Text>
      </View>
      <View style={styles.groupInfo}>
        <Text style={styles.groupName}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Ionicons
            name="people-outline"
            size={14}
            color={theme.colors.text.secondary}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.groupMembers}>{membersCount} Members</Text>
          <Text style={[styles.groupMembers, { marginHorizontal: 6 }]}>•</Text>
          <Ionicons
            name="receipt-outline"
            size={14}
            color={theme.colors.text.secondary}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.groupMembers}>{expensesCount} Expenses</Text>
        </View>
      </View>
      <View style={styles.groupArrow}>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={theme.colors.text.secondary}
        />
      </View>
    </TouchableOpacity>
  );
};
