import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";
import { theme } from "@/constants/theme";

export const SubscriptionsSummaryCard = () => {
  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryLabel}>MONTHLY TOTAL</Text>
        <View style={styles.trendBadge}>
          <MaterialIcons name="trending-down" size={14} color="#10B981" />
          <Text style={styles.trendText}>-8%</Text>
        </View>
      </View>
      <Text style={styles.summaryAmount}>
        $127<Text style={styles.summaryDecimal}>.50</Text>
      </Text>
      <View style={styles.summaryFooter}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Active</Text>
          <Text style={styles.summaryItemValue}>8</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Due Soon</Text>
          <Text
            style={[
              styles.summaryItemValue,
              { color: theme.colors.status.warning },
            ]}
          >
            2
          </Text>
        </View>
      </View>
    </View>
  );
};
