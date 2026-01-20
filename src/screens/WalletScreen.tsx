import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { styles } from "@/styles/history.styles";
import { HistoryHeader } from "@/components/history/HistoryHeader";
import { HistorySummaryCards } from "@/components/history/HistorySummaryCards";
import { TransactionList } from "@/components/history/TransactionList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1 }}>
        <HistoryHeader />

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
            }}
            onPress={() => router.push("/subscriptions")}
          >
            <Text style={{ color: "#FFF", fontWeight: "600", marginRight: 8 }}>
              Subscriptions
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              borderRadius: 16,
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
            onPress={() => router.push("/upload-statement")}
          >
            <Text
              style={{ color: "#374151", fontWeight: "600", marginRight: 8 }}
            >
              Upload
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          <HistorySummaryCards />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {["All", "Income", "Expense", "Subscription"].map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterPill,
                  filter === f && styles.filterPillActive,
                ]}
                onPress={() => setFilter(f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.filterTextActive,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TransactionList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
