import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "@/styles/budget.styles";

interface CategoryCardProps {
  name: string;
  subtitle: string;
  amount: number;
  limit: number;
  icon: string;
  color: string;
  warning: string | null;
}

export const CategoryCard = ({
  name,
  subtitle,
  amount,
  limit,
  icon,
  color,
  warning,
}: CategoryCardProps) => {
  return (
    <View style={styles.categoryCard}>
      <View style={styles.progressCircleContainer}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            borderWidth: 4,
            borderColor: color + "30",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome5 name={icon} size={20} color={color} />
        </View>
      </View>

      <View style={styles.categoryInfo}>
        <Text style={styles.catName}>{name}</Text>
        <Text style={[styles.catSubtitle, warning ? { color: color } : {}]}>
          {warning || subtitle}
        </Text>
      </View>

      <View style={styles.amountInfo}>
        <Text style={styles.catAmount}>${amount}</Text>
        <Text style={styles.catLeftText}>left of ${limit}</Text>
      </View>
    </View>
  );
};
