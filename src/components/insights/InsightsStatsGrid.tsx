import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/insights.styles";

export const InsightsStatsGrid = () => {
  return (
    <View style={styles.statsGrid}>
      <View style={styles.statCard}>
        <View style={[styles.iconBox, styles.shoppingIcon]}>
          <Ionicons name="flame" size={22} color="#F97316" />
        </View>
        <Text style={styles.statLabel}>TOP CATEGORY</Text>
        <Text style={styles.statValue}>Shopping</Text>
        <Text style={[styles.statSubValue, styles.orangeText]}>$850 spent</Text>
      </View>
      <View style={styles.statCard}>
        <View style={[styles.iconBox, styles.dailyIcon]}>
          <Ionicons name="stats-chart" size={20} color="#3B82F6" />
        </View>
        <Text style={styles.statLabel}>AVG. DAILY</Text>
        <Text style={styles.statValue}>$79.05</Text>
        <Text style={[styles.statSubValue, styles.purpleText]}>+5% trend</Text>
      </View>
    </View>
  );
};
