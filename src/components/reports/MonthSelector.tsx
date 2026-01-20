import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "@/styles/reports.styles";

interface MonthSelectorProps {
  months: string[];
  activeMonth: string;
  onMonthChange: (month: string) => void;
}

export const MonthSelector = ({
  months,
  activeMonth,
  onMonthChange,
}: MonthSelectorProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.monthScroll}
      contentContainerStyle={styles.monthScrollContent}
    >
      {months.map((month) => (
        <TouchableOpacity
          key={month}
          style={[
            styles.monthChip,
            activeMonth === month && styles.activeMonthChip,
          ]}
          onPress={() => onMonthChange(month)}
        >
          <Text
            style={[
              styles.monthText,
              activeMonth === month && styles.activeMonthText,
            ]}
          >
            {month}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
