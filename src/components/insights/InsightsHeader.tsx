import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/styles/insights.styles";

export const InsightsHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Insights</Text>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.calendarButton}>
          <Feather name="calendar" size={20} color="#374151" />
        </TouchableOpacity>
        <View style={styles.avatar} />
      </View>
    </View>
  );
};
