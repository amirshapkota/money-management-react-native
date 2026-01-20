import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";

interface SubscriptionCardProps {
  name: string;
  category: string;
  amount: string;
  nextBilling: string;
  logo: any;
  color: string;
  onPress: () => void;
}

export const SubscriptionCard = ({
  name,
  category,
  amount,
  nextBilling,
  logo,
  color,
  onPress,
}: SubscriptionCardProps) => {
  return (
    <TouchableOpacity style={styles.subscriptionCard} onPress={onPress}>
      <View style={[styles.logoContainer, { backgroundColor: color }]}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.subscriptionInfo}>
        <Text style={styles.subscriptionName}>{name}</Text>
        <Text style={styles.subscriptionCategory}>{category}</Text>
        <View style={styles.billingRow}>
          <Ionicons name="calendar-outline" size={12} color="#94A3B8" />
          <Text style={styles.billingText}>{nextBilling}</Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.subscriptionAmount}>{amount}</Text>
        <Text style={styles.perMonth}>/mo</Text>
      </View>
    </TouchableOpacity>
  );
};
