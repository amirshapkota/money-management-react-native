import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { theme } from "@/constants/theme";

interface Member {
  id: string;
  name: string;
}

interface NetBalanceCardProps {
  members: Member[];
  myBalance: number;
  isOwed: boolean;
  onSettleUp: () => void;
}

export const NetBalanceCard = ({
  members,
  myBalance,
  isOwed,
  onSettleUp,
}: NetBalanceCardProps) => {
  const otherMembers = members.filter((m) => m.id !== "user-me");

  return (
    <View style={styles.netBalanceCard}>
      <View style={styles.avatarsRow}>
        {otherMembers.slice(0, 3).map((m, i) => (
          <View
            key={m.id}
            style={[
              styles.avatar,
              { backgroundColor: ["#EFF6FF", "#FFF7ED", "#F0FDF4"][i % 3] },
            ]}
          >
            <Text style={styles.avatarText}>
              {m.name.substring(0, 2).toUpperCase()}
            </Text>
          </View>
        ))}
        <View
          style={[
            styles.avatar,
            {
              backgroundColor: "#F8FAFC",
              borderStyle: "dashed",
              borderWidth: 2,
              borderColor: "#CBD5E1",
            },
          ]}
        >
          <Ionicons name="add" size={16} color="#94A3B8" />
        </View>
      </View>

      <Text style={styles.netBalanceLabel}>Your Net Balance</Text>
      <Text
        style={[
          styles.netBalanceValue,
          {
            color: isOwed
              ? "#10B981"
              : myBalance < 0
              ? "#EF4444"
              : theme.colors.text.primary,
          },
        ]}
      >
        {myBalance > 0 ? "+" : ""}${Math.abs(myBalance).toFixed(2)}
      </Text>

      <View
        style={[
          styles.oweBadge,
          {
            backgroundColor: isOwed
              ? "#F0FDF4"
              : myBalance < 0
              ? "#FEF2F2"
              : "#F1F5F9",
          },
        ]}
      >
        <Text
          style={[
            styles.oweText,
            {
              color: isOwed
                ? "#16A34A"
                : myBalance < 0
                ? "#EF4444"
                : theme.colors.text.secondary,
            },
          ]}
        >
          {isOwed
            ? "You are owed overall"
            : myBalance < 0
            ? "You owe overall"
            : "Settled up"}
        </Text>
      </View>

      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.settleButton]}
          onPress={onSettleUp}
        >
          <MaterialCommunityIcons name="check-all" size={18} color="#FFF" />
          <Text style={[styles.actionBtnText, { color: "#FFF" }]}>
            Settle Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.totalsButton]}>
          <MaterialCommunityIcons
            name="poll"
            size={18}
            color={theme.colors.text.primary}
          />
          <Text
            style={[styles.actionBtnText, { color: theme.colors.text.primary }]}
          >
            Totals
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
