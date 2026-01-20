import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Text,
} from "react-native";
import { styles } from "@/styles/insights.styles";
import { InsightsHeader } from "@/components/insights/InsightsHeader";
import { TimeRangeSelector } from "@/components/insights/TimeRangeSelector";
import { SpendingTrendCard } from "@/components/insights/SpendingTrendCard";
import { InsightsStatsGrid } from "@/components/insights/InsightsStatsGrid";
import { CategoryBreakdown } from "@/components/insights/CategoryBreakdown";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InsightsScreen() {
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState("This Month");

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <InsightsHeader />
          <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#3B82F6",
                borderRadius: 16,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => router.push("/reports")}
            >
              <Text style={{ color: "#FFF", fontWeight: "700", fontSize: 16 }}>
                View Reports & Export
              </Text>
            </TouchableOpacity>
          </View>
          <TimeRangeSelector
            activeSegment={activeSegment}
            onSegmentChange={setActiveSegment}
          />
          <SpendingTrendCard />
          <InsightsStatsGrid />
          <CategoryBreakdown />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
