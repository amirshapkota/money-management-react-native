import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/notifications.styles";
import { NotificationsHeader } from "@/components/notifications/NotificationsHeader";
import { FilterTabs } from "@/components/notifications/FilterTabs";

const FILTERS = ["All Alerts", "Bills", "Budgets", "System"];

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState("All Alerts");

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsHeader />
      <FilterTabs
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ATTENTION NEEDED */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ATTENTION NEEDED</Text>
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>● 2 New</Text>
          </View>
        </View>

        {/* Electricity Bill Card */}
        <View style={styles.card}>
          {/* Side Strip */}
          <View style={[styles.sideStrip, { backgroundColor: "#EF4444" }]} />

          <View style={{ paddingLeft: 8 }}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={[styles.cardIcon, { backgroundColor: "#FEF2F2" }]}>
                  <Ionicons name="receipt" size={24} color="#EF4444" />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Electricity Bill</Text>
                  <Text style={styles.cardTime}>2h ago</Text>
                </View>
              </View>
            </View>

            <Text style={styles.cardDescription}>
              Your recurring payment of{" "}
              <Text style={styles.highlightText}>$85.40</Text> is due today.
              Avoid late fees.
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.primaryAction}>
                <Text style={styles.primaryActionText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryAction}>
                <Text style={styles.secondaryActionText}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Budget Exceeded Card */}
        <View style={styles.card}>
          {/* Side Strip */}
          <View style={[styles.sideStrip, { backgroundColor: "#F97316" }]} />

          <View style={{ paddingLeft: 8 }}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: "row" }}>
                <View style={[styles.cardIcon, { backgroundColor: "#FFF7ED" }]}>
                  <Ionicons name="warning" size={24} color="#F97316" />
                </View>
                <View>
                  <Text style={styles.cardTitle}>Budget Exceeded</Text>
                  <Text style={styles.cardTime}>5h ago</Text>
                </View>
              </View>
            </View>

            <Text style={styles.cardDescription}>
              You've reached{" "}
              <Text style={[styles.highlightText, { color: "#F97316" }]}>
                90%
              </Text>{" "}
              of your monthly dining out budget.
            </Text>

            <View
              style={[styles.progressContainer, { backgroundColor: "#FFF7ED" }]}
            >
              <View
                style={[
                  styles.progressBar,
                  { width: "90%", backgroundColor: "#F97316" },
                ]}
              />
            </View>

            <TouchableOpacity style={styles.textAction}>
              <Text style={styles.textActionLabel}>Review Budget</Text>
              <Ionicons name="arrow-forward" size={14} color="#F97316" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ACHIEVEMENTS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.cardIcon, { backgroundColor: "#EFF6FF" }]}>
                <Ionicons name="trophy" size={24} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Milestone Unlocked!</Text>
                <Text style={styles.cardTime}>Yesterday</Text>
              </View>
            </View>
          </View>

          <Text style={styles.cardDescription}>
            You hit 50% of your{" "}
            <Text style={[styles.highlightText, { color: "#64748B" }]}>
              New Laptop
            </Text>{" "}
            goal. Only $500 more to go!
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#F8FAFC",
              padding: 12,
              borderRadius: 12,
            }}
          >
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: "#EFF6FF",
                borderRadius: 8,
                marginRight: 12,
              }}
            >
              <Text
                style={{ fontWeight: "700", color: "#3B82F6", fontSize: 12 }}
              >
                50%
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 6,
                backgroundColor: "#E2E8F0",
                borderRadius: 3,
              }}
            >
              <View
                style={{
                  width: "50%",
                  height: "100%",
                  backgroundColor: "#3B82F6",
                  borderRadius: 3,
                }}
              />
            </View>
          </View>
        </View>

        {/* EARLIER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>EARLIER</Text>
        </View>

        <View style={styles.smallCard}>
          <View style={[styles.smallIcon, { backgroundColor: "#F3E8FF" }]}>
            <Ionicons name="stats-chart" size={20} color="#9333EA" />
          </View>
          <View style={styles.smallContent}>
            <Text style={styles.smallTitle}>Weekly Report Ready</Text>
            <Text style={styles.smallDesc}>
              Your spending habits analysis is available.
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11, color: "#94A3B8" }}>Oct 24</Text>
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#CBD5E1"
              style={{ marginTop: 4 }}
            />
          </View>
        </View>

        <View style={styles.smallCard}>
          <View style={[styles.smallIcon, { backgroundColor: "#F1F5F9" }]}>
            <MaterialCommunityIcons
              name="shield-check"
              size={20}
              color="#64748B"
            />
          </View>
          <View style={styles.smallContent}>
            <Text style={styles.smallTitle}>Password Updated</Text>
            <Text style={styles.smallDesc}>
              Account security settings changed.
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 11, color: "#94A3B8" }}>Oct 22</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
