import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LineChart } from "react-native-gifted-charts";
import { styles } from "@/styles/insights.styles";

const { width } = Dimensions.get("window");

export const SpendingTrendCard = () => {
  const lineData = [
    { value: 1200, label: "01", date: "Nov 01" },
    { value: 1350, label: "05", date: "Nov 05" },
    { value: 1250, label: "10", date: "Nov 10" },
    { value: 1800, label: "15", date: "Nov 15" },
    { value: 1400, label: "20", date: "Nov 20" },
    { value: 2100, label: "25", date: "Nov 25" },
    { value: 1600, label: "30", date: "Nov 30" },
  ];

  return (
    <View style={styles.mainCard}>
      <Text style={styles.totalLabel}>Total Spent</Text>
      <View style={styles.amountRow}>
        <Text style={styles.totalAmount}>$2,450.50</Text>
        <View style={styles.trendContainer}>
          <View style={styles.trendBadge}>
            <Feather name="arrow-up" size={12} color="#EF4444" />
            <Text style={styles.trendText}>12%</Text>
          </View>
          <Text style={styles.trendComparison}>vs $2,180.00</Text>
        </View>
      </View>

      <View style={{ marginLeft: -20, overflow: "hidden" }}>
        <LineChart
          data={lineData}
          areaChart
          curved
          color="#3B82F6"
          startFillColor="#DBEAFE"
          endFillColor="rgba(219, 234, 254, 0.1)"
          startOpacity={0.9}
          endOpacity={0.2}
          initialSpacing={20}
          noOfSections={3}
          spacing={45}
          thickness={3}
          hideRules
          hideYAxisText
          yAxisThickness={0}
          xAxisThickness={0}
          xAxisLabelTextStyle={{ color: "#9CA3AF", fontSize: 11 }}
          width={width - 80}
          height={160}
          pointerConfig={{
            pointerStripHeight: 160,
            pointerStripColor: "lightgray",
            pointerStripWidth: 2,
            pointerColor: "lightgray",
            radius: 6,
            pointerLabelWidth: 100,
            pointerLabelHeight: 90,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            pointerLabelComponent: (items: any) => {
              return (
                <View
                  style={{
                    height: 90,
                    width: 100,
                    justifyContent: "center",
                    marginTop: -30,
                    marginLeft: -40,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginBottom: 6,
                      textAlign: "center",
                    }}
                  >
                    {items[0].date}
                  </Text>
                  <View
                    style={{
                      paddingHorizontal: 14,
                      paddingVertical: 6,
                      borderRadius: 16,
                      backgroundColor: "white",
                    }}
                  >
                    <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                      {"$" + items[0].value + ".0"}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  );
};
