import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";

export const BalanceCard = () => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Total Balance</Text>
      <Text style={styles.balanceAmount}>$1,250.00</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.percentageContainer}>
          <Feather
            name="trending-up"
            size={14}
            color="#10B981"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.percentageText}>+2.4%</Text>
        </View>
        <Text style={styles.comparisonText}>vs last month</Text>
      </View>
    </View>
  );
};
