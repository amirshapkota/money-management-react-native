import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";
import { theme } from "@/constants/theme";
import { SubscriptionsHeader } from "@/components/subscriptions/SubscriptionsHeader";
import { SubscriptionsSummaryCard } from "@/components/subscriptions/SubscriptionsSummaryCard";

export default function SubscriptionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <SubscriptionsHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <SubscriptionsSummaryCard />

          {/* Upcoming */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming</Text>
            <View style={styles.actionBadge}>
              <Text style={styles.actionText}>ACTION NEEDED</Text>
            </View>
          </View>

          {/* Upcoming Card */}
          <View style={styles.upcomingCard}>
            <View style={styles.upcomingRow}>
              <View style={[styles.logo, { backgroundColor: "black" }]}>
                <Text style={{ color: "red", fontWeight: "900", fontSize: 18 }}>
                  N
                </Text>
              </View>
              <View style={styles.subInfo}>
                <Text style={styles.subName}>Netflix Premium</Text>
                <Text style={styles.subCategory}>Entertainment</Text>
              </View>
              <View style={styles.subPriceBlock}>
                <Text style={styles.priceText}>$15.99</Text>
                <Text style={styles.periodText}>per month</Text>
              </View>
            </View>

            <View style={styles.alertBlock}>
              <Ionicons name="time-outline" size={16} color="#F97316" />
              <Text style={styles.alertText}>Renews Tomorrow</Text>
              <View style={styles.progressBarBg}>
                <View style={styles.progressBarFill} />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.upcomingCard,
              { borderLeftColor: "#3B82F6", marginBottom: theme.spacing.xl },
            ]}
            onPress={() => {}} // Could expand details
          >
            <View style={styles.upcomingRow}>
              <View style={[styles.logo, { backgroundColor: "#0F172A" }]}>
                <MaterialCommunityIcons
                  name="drawing-box"
                  size={24}
                  color="#3B82F6"
                />
              </View>
              <View style={styles.subInfo}>
                <Text style={styles.subName}>Adobe Creative</Text>
                <Text style={styles.subCategory}>Design Tools</Text>
              </View>
              <View style={styles.subPriceBlock}>
                <Text style={styles.priceText}>$54.99</Text>
                <Text style={styles.periodText}>per month</Text>
              </View>
            </View>

            <View style={[styles.alertBlock, { backgroundColor: "#F8FAFC" }]}>
              <Ionicons name="calendar-outline" size={16} color="#3B82F6" />
              <Text
                style={[
                  styles.alertText,
                  { color: theme.colors.text.primary, fontWeight: "500" },
                ]}
              >
                In 3 days
              </Text>
              <View
                style={[
                  styles.progressBarBg,
                  { backgroundColor: "#E2E8F0", width: 100 },
                ]}
              >
                <View
                  style={[
                    styles.progressBarFill,
                    { backgroundColor: "#3B82F6", width: "60%" },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>

          {/* Active List */}
          <View style={styles.sortRow}>
            <Text style={styles.sectionTitle}>Active List</Text>
            <TouchableOpacity style={styles.sortBtn}>
              <Text style={styles.sortText}>Sort by Price</Text>
              <Ionicons
                name="filter"
                size={14}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* List Item 1 */}
          <View style={styles.subscriptionItem}>
            <View style={[styles.logo, { backgroundColor: "#22C55E" }]}>
              <FontAwesome5 name="spotify" size={24} color="#FFF" />
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subName}>Spotify Duo</Text>
              <Text style={styles.subCategory}>Renews Oct 24</Text>
            </View>
            <View style={styles.subPriceBlock}>
              <Text style={[styles.priceText, { fontSize: 14 }]}>$12.99</Text>
              <View
                style={[styles.statusBadge, { backgroundColor: "#DCFCE7" }]}
              >
                <Text style={[styles.statusText, { color: "#16A34A" }]}>
                  Auto-pay
                </Text>
              </View>
            </View>
          </View>

          {/* List Item 2 */}
          <View style={styles.subscriptionItem}>
            <View style={[styles.logo, { backgroundColor: "#3B82F6" }]}>
              <FontAwesome5 name="dropbox" size={24} color="#FFF" />
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subName}>Dropbox Plus</Text>
              <Text style={styles.subCategory}>Renews Nov 02</Text>
            </View>
            <View style={styles.subPriceBlock}>
              <Text style={[styles.priceText, { fontSize: 14 }]}>$9.99</Text>
              <View style={styles.daysLeftBadge}>
                <Text style={styles.daysLeftText}>18 days left</Text>
              </View>
            </View>
          </View>

          {/* List Item 3 */}
          <View style={styles.subscriptionItem}>
            <View style={[styles.logo, { backgroundColor: "#10B981" }]}>
              <FontAwesome5 name="robot" size={24} color="#FFF" />
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subName}>ChatGPT Plus</Text>
              <Text style={styles.subCategory}>Renews Nov 15</Text>
            </View>
            <View style={styles.subPriceBlock}>
              <Text style={[styles.priceText, { fontSize: 14 }]}>$20.00</Text>
              <View
                style={[styles.daysLeftBadge, { backgroundColor: "#F1F5F9" }]}
              >
                <Text style={[styles.daysLeftText, { color: "#64748B" }]}>
                  30 days left
                </Text>
              </View>
            </View>
          </View>

          {/* List Item 4 */}
          <View style={styles.subscriptionItem}>
            <View
              style={[
                styles.logo,
                {
                  backgroundColor: "#FFF",
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                },
              ]}
            >
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>N</Text>
            </View>
            <View style={styles.subInfo}>
              <Text style={styles.subName}>Notion Personal</Text>
              <Text style={styles.subCategory}>Renews Dec 01</Text>
            </View>
            <View style={styles.subPriceBlock}>
              <Text style={[styles.priceText, { fontSize: 14 }]}>$4.00</Text>
              <View
                style={[styles.daysLeftBadge, { backgroundColor: "#F1F5F9" }]}
              >
                <Text style={[styles.daysLeftText, { color: "#64748B" }]}>
                  45 days left
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {/* Floating Action Button - Moved outside ScrollView for correct placement */}
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 20,
            bottom: 30,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#111827",
            justifyContent: "center",
            alignItems: "center",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
          }}
          onPress={() => router.push("/add-subscription")}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
