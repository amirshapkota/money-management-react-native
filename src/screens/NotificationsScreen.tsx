import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/notifications.styles";
import { NotificationsHeader } from "@/components/notifications/NotificationsHeader";
import { FilterTabs } from "@/components/notifications/FilterTabs";
import {
  useNotifications,
  useMarkNotificationAsRead,
  useRealtimeNotifications,
} from "@/hooks/useNotifications";
import { theme } from "@/constants/theme";

const FILTERS = ["All Alerts", "Bills", "Budgets", "System"];

const NOTIFICATION_ICONS: Record<
  string,
  { icon: string; color: string; bg: string }
> = {
  budget_alert: { icon: "warning", color: "#F97316", bg: "#FFF7ED" },
  subscription_reminder: { icon: "receipt", color: "#EF4444", bg: "#FEF2F2" },
  goal_completed: { icon: "trophy", color: "#3B82F6", bg: "#EFF6FF" },
  goal_milestone: { icon: "flag", color: "#10B981", bg: "#D1FAE5" },
  transaction_alert: { icon: "card", color: "#8B5CF6", bg: "#F3E8FF" },
  default: { icon: "notifications", color: "#6B7280", bg: "#F3F4F6" },
};

export default function NotificationsScreen() {
  const [activeFilter, setActiveFilter] = useState("All Alerts");
  const { data: notifications, isLoading } = useNotifications();
  const markNotificationAsRead = useMarkNotificationAsRead();

  // Enable real-time updates
  useRealtimeNotifications();

  const getIconConfig = (type: string) => {
    return NOTIFICATION_ICONS[type] || NOTIFICATION_ICONS.default;
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead.mutateAsync(notificationId);
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const unreadNotifications = notifications?.filter((n) => !n.read) || [];
  const filteredNotifications =
    activeFilter === "All Alerts"
      ? notifications
      : notifications?.filter((n) => {
          if (activeFilter === "Bills")
            return n.type === "subscription_reminder";
          if (activeFilter === "Budgets") return n.type === "budget_alert";
          if (activeFilter === "System") return n.type === "transaction_alert";
          return true;
        });

  return (
    <SafeAreaView style={styles.container}>
      <NotificationsHeader />
      <FilterTabs
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          {unreadNotifications.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>ATTENTION NEEDED</Text>
                <View style={styles.newBadge}>
                  <Text style={styles.newBadgeText}>
                    ● {unreadNotifications.length} New
                  </Text>
                </View>
              </View>

              {unreadNotifications.map((notification) => {
                const iconConfig = getIconConfig(notification.type);

                return (
                  <View key={notification.id} style={styles.card}>
                    <View
                      style={[
                        styles.sideStrip,
                        { backgroundColor: iconConfig.color },
                      ]}
                    />

                    <View style={{ paddingLeft: 8, flex: 1 }}>
                      <View style={styles.cardHeader}>
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={[
                              styles.cardIcon,
                              { backgroundColor: iconConfig.bg },
                            ]}
                          >
                            <Ionicons
                              name={iconConfig.icon as any}
                              size={24}
                              color={iconConfig.color}
                            />
                          </View>
                          <View>
                            <Text style={styles.cardTitle}>
                              {notification.title}
                            </Text>
                            <Text style={styles.cardTime}>
                              {getTimeAgo(notification.created_at)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <Text style={styles.cardDescription}>
                        {notification.message}
                      </Text>

                      <View style={styles.actionRow}>
                        <TouchableOpacity
                          style={styles.primaryAction}
                          onPress={() => handleMarkAsRead(notification.id)}
                        >
                          <Text style={styles.primaryActionText}>
                            Mark as Read
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryAction}>
                          <Text style={styles.secondaryActionText}>
                            Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}

          {filteredNotifications && filteredNotifications.length > 0 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>ALL NOTIFICATIONS</Text>
              </View>

              {filteredNotifications.map((notification) => {
                const iconConfig = getIconConfig(notification.type);

                return (
                  <View
                    key={notification.id}
                    style={[styles.card, notification.read && { opacity: 0.6 }]}
                  >
                    <View style={styles.cardHeader}>
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={[
                            styles.cardIcon,
                            { backgroundColor: iconConfig.bg },
                          ]}
                        >
                          <Ionicons
                            name={iconConfig.icon as any}
                            size={24}
                            color={iconConfig.color}
                          />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.cardTitle}>
                            {notification.title}
                          </Text>
                          <Text style={styles.cardTime}>
                            {getTimeAgo(notification.created_at)}
                          </Text>
                          <Text
                            style={[styles.cardDescription, { marginTop: 4 }]}
                          >
                            {notification.message}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}

          {(!filteredNotifications || filteredNotifications.length === 0) && (
            <View style={{ padding: 40, alignItems: "center" }}>
              <Ionicons
                name="notifications-off-outline"
                size={64}
                color={theme.colors.text.light}
              />
              <Text
                style={{
                  marginTop: 16,
                  color: theme.colors.text.secondary,
                  fontSize: 16,
                }}
              >
                No notifications
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
