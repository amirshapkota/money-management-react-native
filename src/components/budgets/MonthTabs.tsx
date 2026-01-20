import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/budget.styles";

interface MonthTabsProps {
  months: string[];
  activeMonth: string;
  onMonthChange: (month: string) => void;
}

export const MonthTabs = ({
  months,
  activeMonth,
  onMonthChange,
}: MonthTabsProps) => {
  return (
    <View style={styles.tabsContainer}>
      {months.map((month) => (
        <TouchableOpacity
          key={month}
          style={[styles.tab, activeMonth === month && styles.activeTab]}
          onPress={() => onMonthChange(month)}
        >
          <Text
            style={[
              styles.tabText,
              activeMonth === month && styles.activeTabText,
            ]}
          >
            {month}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
