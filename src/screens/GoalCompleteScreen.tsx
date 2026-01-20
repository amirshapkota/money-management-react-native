import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/styles/goalComplete.styles";
import { theme } from "@/constants/theme";

export default function GoalCompleteScreen() {
  const router = useRouter();

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
                <FontAwesome5 name="trophy" size={80} color="#F59E0B" />
              </View>
              <View style={styles.goalMetBadge}>
                <FontAwesome5 name="star" size={14} color="#F59E0B" solid />
                <Text style={styles.goalMetText}>GOAL MET!</Text>
              </View>
            </View>

            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.congratsSubText}>
              You've successfully reached your saving goal for the{" "}
              <Text style={styles.highlightText}>New Laptop</Text>.
            </Text>
          </View>

          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.goalHeader}>
              <View style={[styles.iconBox, { backgroundColor: "#DBEAFE" }]}>
                <FontAwesome5 name="laptop" size={24} color="#3B82F6" />
              </View>
              <View style={styles.goalDetails}>
                <Text style={styles.goalLabel}>GOAL NAME</Text>
                <Text style={styles.goalTitle}>MacBook Pro</Text>
              </View>
              <View style={styles.savedSection}>
                <Text style={styles.goalLabel}>SAVED</Text>
                <Text style={styles.savedAmount}>$1,500</Text>
              </View>
            </View>

            <View style={styles.datesRow}>
              <Text style={styles.dateLabel}>Started: Aug 15</Text>
              <Text style={styles.dateLabel}>Completed: Oct 25</Text>
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

          {/* Footer / Next Milestone */}
          <View style={styles.footer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Text style={styles.nextMilestoneTitle}>Next Milestone</Text>
              <Text style={styles.nextMilestoneSubtitle}>1 of 3 left</Text>
            </View>

            <TouchableOpacity style={styles.setNewGoalBtn}>
              <Text style={styles.setNewGoalText}>Set New Goal</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.push("/")}
            >
              <Text style={styles.backBtnText}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
