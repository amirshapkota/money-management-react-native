import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome6,
  Feather,
} from "@expo/vector-icons";
import { styles } from "@/styles/reports.styles";
import { theme } from "@/constants/theme";
import { ReportsHeader } from "@/components/reports/ReportsHeader";
import { MonthSelector } from "@/components/reports/MonthSelector";
import { FloatingActionBar } from "@/components/reports/FloatingActionBar";

const MONTHS = ["Oct 2023", "Sep 2023", "Aug 2023", "Custom Range"];

export default function ReportsScreen() {
  const [activeReport, setActiveReport] = useState("Standard");
  const [activeMonth, setActiveMonth] = useState("Oct 2023");

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ReportsHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 150 }}
        >
          <MonthSelector
            months={MONTHS}
            activeMonth={activeMonth}
            onMonthChange={setActiveMonth}
          />

          {/* Report Type */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.typeScroll}
            contentContainerStyle={styles.typeScrollContent}
          >
            {/* Standard - Active */}
            <TouchableOpacity
              style={[styles.reportTypeCard, styles.activeReportType]}
              onPress={() => setActiveReport("Standard")}
            >
              <View style={[styles.reportIcon, styles.activeReportIcon]}>
                <Ionicons name="document-text-outline" size={24} color="#FFF" />
              </View>
              <Text style={styles.activeReportText}>Monthly</Text>
              <Text style={[styles.reportName, styles.activeReportText]}>
                Statement
              </Text>
            </TouchableOpacity>

            {/* Analysis */}
            <TouchableOpacity
              style={styles.reportTypeCard}
              onPress={() => setActiveReport("Analysis")}
            >
              <View style={styles.reportIcon}>
                <FontAwesome6 name="chart-pie" size={20} color="#9333EA" />
              </View>
              <Text
                style={{ color: theme.colors.text.secondary, fontSize: 12 }}
              >
                Expense
              </Text>
              <Text style={styles.reportName}>Breakdown</Text>
            </TouchableOpacity>

            {/* Tax */}
            <TouchableOpacity style={styles.reportTypeCard}>
              <View style={styles.reportIcon}>
                <FontAwesome6
                  name="file-invoice-dollar"
                  size={20}
                  color="#16A34A"
                />
              </View>
              <Text
                style={{ color: theme.colors.text.secondary, fontSize: 12 }}
              >
                Detailed
              </Text>
              <Text style={styles.reportName}>Tax Report</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Smart Statement Card */}
          <View style={styles.statementCard}>
            <View style={styles.cardHeader}>
              <View style={styles.brandRow}>
                <View style={styles.brandIcon}>
                  <FontAwesome6 name="wallet" size={14} color="#FFF" />
                </View>
                <Text style={styles.brandText}>FINAPP PRO</Text>
              </View>
              <View style={styles.tagBadge}>
                <Text style={styles.tagText}>VERIFIED</Text>
              </View>
            </View>

            <View style={styles.balanceSection}>
              <Text style={styles.balanceLabel}>Account Balance</Text>
              <Text style={styles.balanceValue}>$12,450.90</Text>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Income</Text>
                <Text style={[styles.summaryValue, { color: "#16A34A" }]}>
                  +$4,200.00
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>Expense</Text>
                <Text style={[styles.summaryValue, { color: "#DC2626" }]}>
                  -$2,450.00
                </Text>
              </View>
            </View>

            <View style={styles.breakdownSection}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: theme.colors.text.light,
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Top Spending
              </Text>
              <View style={styles.breakdownRow}>
                <View style={[styles.dot, { backgroundColor: "#3B82F6" }]} />
                <Text style={styles.categoryName}>Housing</Text>
                <Text style={styles.categoryValue}>$1,200.00</Text>
              </View>
              <View style={styles.breakdownRow}>
                <View style={[styles.dot, { backgroundColor: "#A855F7" }]} />
                <Text style={styles.categoryName}>Food & Dining</Text>
                <Text style={styles.categoryValue}>$450.00</Text>
              </View>
              <View style={styles.breakdownRow}>
                <View style={[styles.dot, { backgroundColor: "#F97316" }]} />
                <Text style={styles.categoryName}>Transport</Text>
                <Text style={styles.categoryValue}>$200.00</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.footerText}>Ref: #OCT-8842</Text>
              <Text style={styles.footerText}>Gen: 01 Nov, 2023</Text>
            </View>
          </View>
        </ScrollView>

        <FloatingActionBar onExport={() => {}} onShare={() => {}} />
      </SafeAreaView>
    </View>
  );
}
