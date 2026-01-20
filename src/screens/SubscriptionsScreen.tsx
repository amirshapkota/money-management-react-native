import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/subscriptions.styles";
import { theme } from "@/constants/theme";
import { SubscriptionsHeader } from "@/components/subscriptions/SubscriptionsHeader";
import { SubscriptionsSummaryCard } from "@/components/subscriptions/SubscriptionsSummaryCard";
import {
  useSubscriptions,
  useUpcomingSubscriptions,
  useDeleteSubscription,
} from "@/hooks/useSubscriptions";

const SUBSCRIPTION_ICONS: Record<
  string,
  { icon: any; color: string; bgColor: string }
> = {
  netflix: { icon: "netflix", color: "#FFFFFF", bgColor: "#E50914" },
  spotify: { icon: "spotify", color: "#1DB954", bgColor: "#000000" },
  adobe: { icon: "adobe-acrobat", color: "#FF0000", bgColor: "#000000" },
  youtube: { icon: "youtube", color: "#FF0000", bgColor: "#FFFFFF" },
  amazon: { icon: "shopping", color: "#FF9900", bgColor: "#232F3E" },
  apple: { icon: "apple", color: "#FFFFFF", bgColor: "#000000" },
  microsoft: { icon: "microsoft", color: "#00A4EF", bgColor: "#F3F4F6" },
  google: { icon: "google", color: "#4285F4", bgColor: "#FFFFFF" },
  discord: { icon: "message-text", color: "#5865F2", bgColor: "#FFFFFF" },
  twitch: { icon: "twitch", color: "#9146FF", bgColor: "#FFFFFF" },
  dropbox: { icon: "dropbox", color: "#0061FF", bgColor: "#FFFFFF" },
  github: { icon: "github", color: "#FFFFFF", bgColor: "#181717" },
  linkedin: { icon: "linkedin", color: "#0A66C2", bgColor: "#FFFFFF" },
  slack: { icon: "slack", color: "#4A154B", bgColor: "#FFFFFF" },
  notion: { icon: "notebook-outline", color: "#000000", bgColor: "#FFFFFF" },
  evernote: { icon: "evernote", color: "#00A82D", bgColor: "#FFFFFF" },
  chatgpt: { icon: "robot", color: "#10A37F", bgColor: "#FFFFFF" },
  default: { icon: "apps", color: "#FFFFFF", bgColor: "#6B7280" },
};

// Parse icon from subscription name (format: "icon:iconName|actualName")
const parseSubscriptionIcon = (name: string, color?: string | null) => {
  if (name.startsWith("icon:")) {
    const parts = name.split("|");
    if (parts.length === 2) {
      const iconName = parts[0].replace("icon:", "");
      const displayName = parts[1];
      return {
        icon: iconName,
        name: displayName,
        color: color || "#6B7280",
        bgColor: "#F3F4F6",
      };
    }
  }

  // Fallback to old icon detection for existing subscriptions
  const lowerName = name.toLowerCase();
  for (const [key, value] of Object.entries(SUBSCRIPTION_ICONS)) {
    if (lowerName.includes(key)) {
      return { ...value, name };
    }
  }
  return { ...SUBSCRIPTION_ICONS.default, name };
};

const getSubscriptionIcon = (name: string, color?: string | null) => {
  return parseSubscriptionIcon(name, color);
};

const getDaysUntil = (date: string) => {
  const target = new Date(date);
  const today = new Date();
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default function SubscriptionsScreen() {
  const router = useRouter();
  const { data: allSubscriptions, isLoading: loadingAll } = useSubscriptions();
  const { data: upcomingSubscriptions, isLoading: loadingUpcoming } =
    useUpcomingSubscriptions(7);
  const deleteSubscription = useDeleteSubscription();

  const activeSubscriptions =
    allSubscriptions?.filter((sub) => sub.status === "active") || [];

  const handleDelete = (id: string, name: string) => {
    const iconConfig = getSubscriptionIcon(name);
    Alert.alert(
      "Delete Subscription",
      `Are you sure you want to delete ${iconConfig.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteSubscription.mutateAsync(id);
              Alert.alert("Success", "Subscription deleted successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to delete subscription");
            }
          },
        },
      ],
    );
  };

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
          {loadingUpcoming ? (
            <View style={{ padding: 32, alignItems: "center" }}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          ) : upcomingSubscriptions && upcomingSubscriptions.length > 0 ? (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming</Text>
                {upcomingSubscriptions.some(
                  (sub) => getDaysUntil(sub.next_billing_date) <= 1,
                ) && (
                  <View style={styles.actionBadge}>
                    <Text style={styles.actionText}>ACTION NEEDED</Text>
                  </View>
                )}
              </View>

              {upcomingSubscriptions.map((subscription) => {
                const daysUntil = getDaysUntil(subscription.next_billing_date);
                const iconConfig = getSubscriptionIcon(
                  subscription.name,
                  subscription.color,
                );
                const isUrgent = daysUntil <= 1;
                const progress = Math.max(
                  0,
                  Math.min(100, ((7 - daysUntil) / 7) * 100),
                );

                return (
                  <View
                    key={subscription.id}
                    style={[
                      styles.upcomingCard,
                      { borderLeftColor: isUrgent ? "#F97316" : "#3B82F6" },
                    ]}
                  >
                    <View style={styles.upcomingRow}>
                      <View
                        style={[
                          styles.logo,
                          {
                            backgroundColor: iconConfig.bgColor,
                          },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={iconConfig.icon as any}
                          size={24}
                          color={iconConfig.color}
                        />
                      </View>
                      <View style={styles.subInfo}>
                        <Text style={styles.subName}>{iconConfig.name}</Text>
                        <Text style={styles.subCategory}>
                          {subscription.category}
                        </Text>
                      </View>
                      <View style={styles.subPriceBlock}>
                        <Text style={styles.priceText}>
                          ${subscription.amount.toFixed(2)}
                        </Text>
                        <Text style={styles.periodText}>
                          per {subscription.billing_cycle}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.alertBlock,
                        !isUrgent && { backgroundColor: "#F8FAFC" },
                      ]}
                    >
                      <Ionicons
                        name={isUrgent ? "time-outline" : "calendar-outline"}
                        size={16}
                        color={isUrgent ? "#F97316" : "#3B82F6"}
                      />
                      <Text
                        style={[
                          styles.alertText,
                          !isUrgent && {
                            color: theme.colors.text.primary,
                            fontWeight: "500",
                          },
                        ]}
                      >
                        {daysUntil === 0
                          ? "Renews Today"
                          : daysUntil === 1
                            ? "Renews Tomorrow"
                            : `In ${daysUntil} days`}
                      </Text>
                      <View
                        style={[
                          styles.progressBarBg,
                          !isUrgent && {
                            backgroundColor: "#E2E8F0",
                            width: 100,
                          },
                        ]}
                      >
                        <View
                          style={[
                            styles.progressBarFill,
                            !isUrgent && { backgroundColor: "#3B82F6" },
                            { width: `${progress}%` },
                          ]}
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          ) : null}

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

          {loadingAll ? (
            <View style={{ padding: 32, alignItems: "center" }}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          ) : activeSubscriptions.length > 0 ? (
            activeSubscriptions.map((subscription) => {
              const daysUntil = getDaysUntil(subscription.next_billing_date);
              const iconConfig = getSubscriptionIcon(
                subscription.name,
                subscription.color,
              );
              const isAutoPay = subscription.auto_pay;

              return (
                <View key={subscription.id} style={styles.subscriptionItem}>
                  <View
                    style={[
                      styles.logo,
                      {
                        backgroundColor: iconConfig.bgColor,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={iconConfig.icon as any}
                      size={24}
                      color={iconConfig.color}
                    />
                  </View>
                  <View style={styles.subInfo}>
                    <Text style={styles.subName}>{iconConfig.name}</Text>
                    <Text style={styles.subCategory}>
                      Renews{" "}
                      {new Date(
                        subscription.next_billing_date,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Text>
                  </View>
                  <View style={styles.subPriceBlock}>
                    <Text style={[styles.priceText, { fontSize: 14 }]}>
                      ${subscription.amount.toFixed(2)}
                    </Text>
                    {isAutoPay ? (
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: "#DCFCE7" },
                        ]}
                      >
                        <Text style={[styles.statusText, { color: "#16A34A" }]}>
                          Auto-pay
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.daysLeftBadge}>
                        <Text style={styles.daysLeftText}>
                          {daysUntil} days left
                        </Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      handleDelete(subscription.id, subscription.name)
                    }
                    style={{
                      padding: 8,
                      marginLeft: 8,
                    }}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <View style={{ padding: 32, alignItems: "center" }}>
              <Text style={{ color: theme.colors.text.secondary }}>
                No active subscriptions
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Floating Action Button */}
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
