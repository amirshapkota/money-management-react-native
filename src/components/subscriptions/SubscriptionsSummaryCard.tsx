import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";
import { theme } from "@/constants/theme";
import {
  useSubscriptionStats,
  useUpcomingSubscriptions,
} from "@/hooks/useSubscriptions";

export const SubscriptionsSummaryCard = () => {
  const { data: stats, isLoading: loadingStats } = useSubscriptionStats();
  const { data: upcoming, isLoading: loadingUpcoming } =
    useUpcomingSubscriptions(7);

  if (loadingStats || loadingUpcoming) {
    return (
      <View
        style={[
          styles.summaryCard,
          { justifyContent: "center", alignItems: "center", minHeight: 140 },
        ]}
      >
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  const monthlyCost = stats?.monthlyCost || 0;
  const activeCount = stats?.activeSubscriptions || 0;
  const dueSoonCount = upcoming?.length || 0;

  // Calculate trend (mock for now - could be enhanced with historical data)
  const trendPercentage = 8; // Could calculate from previous month
  const isTrendingDown = true;

  return (
    <View style={styles.summaryCard}>
      <View style={styles.summaryHeader}>
        <Text style={styles.summaryLabel}>MONTHLY TOTAL</Text>
        <View style={styles.trendBadge}>
          <MaterialIcons
            name={isTrendingDown ? "trending-down" : "trending-up"}
            size={14}
            color={isTrendingDown ? "#10B981" : "#EF4444"}
          />
          <Text
            style={[
              styles.trendText,
              { color: isTrendingDown ? "#10B981" : "#EF4444" },
            ]}
          >
            {isTrendingDown ? "-" : "+"}
            {trendPercentage}%
          </Text>
        </View>
      </View>
      <Text style={styles.summaryAmount}>
        ${Math.floor(monthlyCost)}
        <Text style={styles.summaryDecimal}>
          .{(monthlyCost % 1).toFixed(2).substring(2)}
        </Text>
      </Text>
      <View style={styles.summaryFooter}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Active</Text>
          <Text style={styles.summaryItemValue}>{activeCount}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemLabel}>Due Soon</Text>
          <Text
            style={[
              styles.summaryItemValue,
              {
                color:
                  dueSoonCount > 0
                    ? theme.colors.status.warning
                    : theme.colors.text.primary,
              },
            ]}
          >
            {dueSoonCount}
          </Text>
        </View>
      </View>
    </View>
  );
};
