import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";
import { theme } from "@/constants/theme";

interface UpcomingPaymentCardProps {
  name: string;
  amount: string;
  daysLeft: number;
  onPayNow: () => void;
}

export const UpcomingPaymentCard = ({
  name,
  amount,
  daysLeft,
  onPayNow,
}: UpcomingPaymentCardProps) => {
  return (
    <View style={styles.upcomingCard}>
      <View style={styles.upcomingHeader}>
        <View style={styles.warningIcon}>
          <Ionicons name="time-outline" size={20} color="#F59E0B" />
        </View>
        <View style={styles.upcomingInfo}>
          <Text style={styles.upcomingTitle}>Upcoming Payment</Text>
          <Text style={styles.upcomingSubtitle}>
            {name} • {amount}
          </Text>
        </View>
      </View>
      <View style={styles.upcomingFooter}>
        <View style={styles.daysLeftBadge}>
          <Text style={styles.daysLeftText}>{daysLeft} days left</Text>
        </View>
        <TouchableOpacity style={styles.payNowButton} onPress={onPayNow}>
          <Text style={styles.payNowText}>Pay Now</Text>
          <Ionicons
            name="arrow-forward"
            size={14}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
