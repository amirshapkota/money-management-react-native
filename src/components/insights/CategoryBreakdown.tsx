import React from "react";
import { View, Text } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";
import { styles } from "@/styles/insights.styles";

export const CategoryBreakdown = () => {
  const pieData = [
    { value: 45, color: "#3B82F6", focused: true }, // Shopping - Blue
    { value: 25, color: "#EC4899" }, // Food - Pink
    { value: 15, color: "#10B981" }, // Bills - Green
    { value: 15, color: "#F59E0B" }, // Transport - Orange/Yellow
  ];

  const categories = [
    {
      name: "Shopping",
      amount: "-$850.00",
      color: "#3B82F6",
      icon: "bag-handle",
      bgStyle: styles.shoppingBg,
      percent: "45%",
    },
    {
      name: "Food & Dining",
      amount: "-$520.40",
      color: "#EC4899",
      icon: "restaurant",
      bgStyle: styles.foodBg,
      percent: "30%",
    },
    {
      name: "Bills & Utilities",
      amount: "-$340.00",
      color: "#10B981",
      icon: "receipt",
      bgStyle: styles.billsBg,
      percent: "20%",
    },
    {
      name: "Transport",
      amount: "-$180.50",
      color: "#F97316",
      icon: "car",
      bgStyle: styles.transportBg,
      percent: "15%",
    },
  ];

  return (
    <>
      <View style={styles.breakdownHeader}>
        <Text style={styles.sectionTitle}>Spending Breakdown</Text>
        <Feather name="filter" size={20} color="#9CA3AF" />
      </View>

      <View style={styles.breakdownCard}>
        <View style={styles.donutContainer}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <PieChart
              data={pieData}
              donut
              radius={60}
              innerRadius={50}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 10, color: "#9CA3AF" }}>TOP</Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#111827",
                        fontWeight: "bold",
                      }}
                    >
                      45%
                    </Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.legendContainer}>
            {[
              { label: "Shopping", color: "#3B82F6", percent: "45%" },
              { label: "Food", color: "#EC4899", percent: "25%" },
              { label: "Bills", color: "#10B981", percent: "15%" },
            ].map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={styles.legendLeft}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
                <Text style={styles.legendPercent}>{item.percent}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Category List */}
        <View>
          {categories.map((cat, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={[styles.categoryIcon, cat.bgStyle]}>
                <Ionicons name={cat.icon as any} size={24} color={cat.color} />
              </View>
              <View style={styles.categoryInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <Text style={styles.categoryName}>{cat.name}</Text>
                  <Text style={styles.categoryAmount}>{cat.amount}</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: cat.percent as any, backgroundColor: cat.color },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};
