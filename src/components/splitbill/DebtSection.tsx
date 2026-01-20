import React from "react";
import { View, Text } from "react-native";
import { styles } from "@/styles/splitbill.styles";

interface Debt {
  from: string;
  to: string;
  amount: number;
}

interface Member {
  id: string;
  name: string;
}

interface DebtSectionProps {
  title: string;
  debts: Debt[];
  members: Member[];
  badgeColor: string;
  badgeTextColor: string;
  avatarColor: string;
  avatarTextColor: string;
  amountColor: string;
  getDescription: (debt: Debt, members: Member[]) => string;
}

export const DebtSection = ({
  title,
  debts,
  members,
  badgeColor,
  badgeTextColor,
  avatarColor,
  avatarTextColor,
  amountColor,
  getDescription,
}: DebtSectionProps) => {
  if (debts.length === 0) return null;

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={[styles.countBadge, { backgroundColor: badgeColor }]}>
          <Text style={[styles.countText, { color: badgeTextColor }]}>
            {debts.length}
          </Text>
        </View>
      </View>
      {debts.map((debt, index) => {
        const member = members.find(
          (m) => m.id === (title === "You're Owed" ? debt.from : debt.to)
        );
        return (
          <View key={index} style={styles.personCard}>
            <View
              style={[styles.personAvatar, { backgroundColor: avatarColor }]}
            >
              <Text style={{ fontWeight: "700", color: avatarTextColor }}>
                {member?.name.substring(0, 1) || "?"}
              </Text>
            </View>
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{member?.name || "Unknown"}</Text>
              <Text style={styles.lastActivity}>
                {getDescription(debt, members)}
              </Text>
            </View>
            <View style={styles.amountBlock}>
              <Text style={[styles.amountText, { color: amountColor }]}>
                {title === "You're Owed" ? "+" : title === "You Owe" ? "-" : ""}
                ${debt.amount.toFixed(2)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};
