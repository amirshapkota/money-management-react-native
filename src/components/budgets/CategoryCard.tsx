import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Circle } from "react-native-svg";
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
  // Calculate progress percentage
  const percentage = limit > 0 ? Math.min((amount / limit) * 100, 100) : 0;

  // SVG circle properties
  const size = 56;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.categoryCard}>
      <View style={styles.progressCircleContainer}>
        <View
          style={{
            width: size,
            height: size,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Background circle */}
          <Svg width={size} height={size} style={{ position: "absolute" }}>
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color + "20"}
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={color}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>

          {/* Icon in center */}
          <MaterialCommunityIcons name={icon as any} size={24} color={color} />
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
