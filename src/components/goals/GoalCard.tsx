import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";

interface GoalCardProps {
  name: string;
  category: string;
  currentAmount: string;
  targetAmount: string;
  progress: number; // 0 to 1
  color: string;
  icon?: any; // Component or Image Source
  onPress: () => void;
  onDeposit: () => void;
}

export const GoalCard = ({
  name,
  category,
  currentAmount,
  targetAmount,
  progress,
  color,
  icon,
  onPress,
  onDeposit,
}: GoalCardProps) => {
  const percent = Math.round(progress * 100);

  return (
    <TouchableOpacity style={styles.goalCard} onPress={onPress}>
      <View style={styles.goalHeader}>
        <View
          style={[styles.goalIconContainer, { backgroundColor: color + "20" }]}
        >
          {/* Using opacity of color for background */}
          {/* If icon is a component, render it, else if it's an image source render Image */}
          {/* For simplicity we'll assume it's passed as a React Node or we handle inside */}
          {/* Placeholder for now */}
          {/* We can use LinearGradient for icon bg if needed */}
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: color,
            }}
          />
        </View>
        <View style={styles.goalInfo}>
          <Text style={styles.goalName}>{name}</Text>
          <Text style={styles.goalCategory}>{category}</Text>
        </View>
        <View style={styles.goalAmounts}>
          <Text style={styles.currentAmount}>{currentAmount}</Text>
          <Text style={styles.targetAmount}>of {targetAmount}</Text>
        </View>
      </View>

      <View style={styles.progressLabelRow}>
        <Text style={styles.progressLabel}>Progress</Text>
        <Text style={[styles.progressPercent, { color: color }]}>
          {percent}%
        </Text>
      </View>

      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percent}%`, backgroundColor: color },
          ]}
        />
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  progress >= 1
                    ? theme.colors.status.success
                    : progress > 0.5
                    ? theme.colors.status.success
                    : theme.colors.status.warning,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {progress >= 1
              ? "Completed"
              : progress > 0.8
              ? "Almost there!"
              : "On track"}
          </Text>
        </View>

        <TouchableOpacity style={styles.depositButton} onPress={onDeposit}>
          <Text style={styles.depositText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
