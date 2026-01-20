import React from "react";
import { View, Text } from "react-native";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";

export const GoalsBalanceCard = () => {
  return (
    <View style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <FontAwesome6
          name="wallet"
          size={12}
          color="#4F46E5"
          style={styles.walletIcon}
        />
        <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
      </View>
      <Text style={styles.balanceAmount}>
        $3,450<Text style={styles.balanceDecimal}>.00</Text>
      </Text>
      <View style={styles.growthContainer}>
        <MaterialCommunityIcons
          name="trending-up"
          size={20}
          color={theme.colors.status.success}
        />
        <Text style={styles.growthText}>+12% from last month</Text>
      </View>

      <View style={styles.balanceStatsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Monthly Goal</Text>
          <Text style={styles.statValue}>$500.00</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Remaining</Text>
          <Text style={styles.statValue}>$50.00</Text>
        </View>
      </View>
    </View>
  );
};
