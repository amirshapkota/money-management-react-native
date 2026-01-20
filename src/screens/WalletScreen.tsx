import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { styles } from "@/styles/history.styles";
import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistorySummaryCards } from "@/components/history/HistorySummaryCards";
import { TransactionList } from "@/components/history/TransactionList";
import { useTransactions, useTransactionStats } from "@/hooks/useTransactions";

// Get current month date range
const getCurrentMonthRange = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
};

export default function WalletScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<
    "all" | "income" | "expense" | "subscription"
  >("all");

  // Get current month range for stats
  const { startDate, endDate } = getCurrentMonthRange();

  // Fetch transactions and stats
  const {
    data: transactions = [],
    isLoading,
    error,
    refetch,
  } = useTransactions(50);
  const { data: stats } = useTransactionStats(startDate, endDate);

  // Filter transactions based on active filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "subscription") return transaction.is_recurring;
    return transaction.type === activeFilter;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1 }}>
        <HistoryHeader />

        {/* Quick Action Buttons */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            paddingTop: 10,
            gap: 12,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#3B82F6",
              borderRadius: 16,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onPress={() => router.push("/subscriptions")}
          >
            <Feather name="repeat" size={18} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 13 }}>
              Subscriptions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#10B981",
              borderRadius: 16,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onPress={() => router.push("/upload-statement")}
          >
            <Feather name="upload-cloud" size={18} color="#FFFFFF" />
            <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 13 }}>
              Upload Statement
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => refetch()}
              tintColor="#2563EB"
            />
          }
        >
          <HistorySummaryCards
            income={stats?.income || 0}
            expense={stats?.expense || 0}
            balance={stats?.balance || 0}
          />

          {/* Filter Pills */}
          <View style={styles.filterContainer}>
            {(["all", "income", "expense", "subscription"] as const).map(
              (filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterPill,
                    activeFilter === filter && styles.filterPillActive,
                  ]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      activeFilter === filter && styles.filterTextActive,
                    ]}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Loading State */}
          {isLoading && !transactions.length && (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={{ marginTop: 16, color: "#6B7280", fontSize: 14 }}>
                Loading transactions...
              </Text>
            </View>
          )}

          {/* Error State */}
          {error && (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <Feather name="alert-circle" size={48} color="#EF4444" />
              <Text
                style={{
                  marginTop: 16,
                  color: "#374151",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Failed to load transactions
              </Text>
              <TouchableOpacity
                style={{
                  marginTop: 16,
                  backgroundColor: "#2563EB",
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 12,
                }}
                onPress={() => refetch()}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredTransactions.length === 0 && (
            <View style={{ alignItems: "center", paddingVertical: 60 }}>
              <Feather name="inbox" size={48} color="#9CA3AF" />
              <Text
                style={{
                  marginTop: 16,
                  color: "#374151",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                No transactions yet
              </Text>
              <Text style={{ marginTop: 8, color: "#6B7280", fontSize: 14 }}>
                {activeFilter === "all"
                  ? "Add your first transaction to get started"
                  : `No ${activeFilter} transactions found`}
              </Text>
            </View>
          )}

          {/* Transaction List */}
          {!isLoading && !error && filteredTransactions.length > 0 && (
            <TransactionList transactions={filteredTransactions} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
