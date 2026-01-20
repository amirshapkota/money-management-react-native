import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/goalComplete.styles";
import { theme } from "@/constants/theme";
import { useGoalById } from "@/hooks/useGoals";

export default function GoalCompleteScreen() {
  const router = useRouter();
  const { goalId } = useLocalSearchParams();
  const { data: goal, isLoading } = useGoalById(goalId as string);

  if (isLoading || !goal) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Parse icon from name
  let displayName = goal.name;
  let iconName = "star";
  if (goal.name.startsWith("icon:")) {
    const parts = goal.name.split("|");
    if (parts.length === 2) {
      iconName = parts[0].replace("icon:", "");
      displayName = parts[1];
    }
  }

  const goalColor = goal.color || "#6B7280";
  const startDate = new Date(goal.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const completedDate = goal.completed_at
    ? new Date(goal.completed_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.iconButton}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons
                name="share-social-outline"
                size={24}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* Hero Section - Trophy */}
          <View style={styles.heroSection}>
            {/* Decorative particles/confetti can be added here with absolute positioning */}
            <View style={styles.trophyContainer}>
              <View style={styles.trophyCircle}>
                <MaterialCommunityIcons
                  name="trophy"
                  size={80}
                  color="#F59E0B"
                />
              </View>
              <View style={styles.goalMetBadge}>
                <MaterialCommunityIcons name="star" size={14} color="#F59E0B" />
                <Text style={styles.goalMetText}>GOAL MET!</Text>
              </View>
            </View>

            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.congratsSubText}>
              You've successfully reached your saving goal for{" "}
              <Text style={styles.highlightText}>{displayName}</Text>.
            </Text>
          </View>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.goalHeader}>
              <View
                style={[styles.iconBox, { backgroundColor: goalColor + "20" }]}
              >
                <MaterialCommunityIcons
                  name={iconName as any}
                  size={24}
                  color={goalColor}
                />
              </View>
              <View style={styles.goalDetails}>
                <Text style={styles.goalLabel}>GOAL NAME</Text>
                <Text style={styles.goalTitle}>{displayName}</Text>
              </View>
              <View style={styles.savedSection}>
                <Text style={styles.goalLabel}>SAVED</Text>
                <Text style={styles.savedAmount}>
                  ${goal.target_amount.toFixed(0)}
                </Text>
              </View>
            </View>

            <View style={styles.datesRow}>
              <Text style={styles.dateLabel}>Started: {startDate}</Text>
              <Text style={styles.dateLabel}>Completed: {completedDate}</Text>
            </View>

            <View style={styles.successBar} />

            <View style={styles.completeBadge}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={theme.colors.status.success}
              />
              <Text style={styles.completeText}>100% Complete</Text>
            </View>

            <View style={styles.shareRow}>
              <View style={styles.avatarsGroup}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>me</Text>
                </View>
                <View
                  style={[
                    styles.avatarCircle,
                    { backgroundColor: "#E2E8F0", zIndex: -1 },
                  ]}
                >
                  <Ionicons name="add" size={16} color="#64748B" />
                </View>
              </View>
              <TouchableOpacity style={styles.shareBtn}>
                <Text style={styles.shareBtnText}>Share Achievement</Text>
                <Ionicons
                  name="share-outline"
                  size={16}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
