import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/styles/search.styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const results = [
    {
      id: "1",
      title: "Starbucks Coffee",
      tag: "Food & Drink",
      date: "Oct 24, 8:45 AM",
      amount: "-$5.50",
      icon: "coffee",
      bg: "#18181b", // dark
      iconColor: "#FFFFFF",
      tagBg: "#FFF7ED",
      tagColor: "#EA580C",
    },
    {
      id: "2",
      title: "Dunkin' Donuts",
      tag: "Food & Drink",
      date: "Oct 22, 10:15 AM",
      amount: "-$8.25",
      icon: "fast-food", // Ionicons
      bg: "#FFF7ED", // light orange
      iconColor: "#EA580C",
      tagBg: "#FFF7ED",
      tagColor: "#EA580C",
      customIcon: true,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search Transactions</Text>
          </View>

          <View style={styles.searchBox}>
            <Feather
              name="search"
              size={20}
              color="#9CA3AF"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Coffee"
              placeholderTextColor="#1F2937"
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name="options-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
        >
          <View style={styles.filtersRow}>
            <TouchableOpacity style={styles.activeFilterPill}>
              <Text style={styles.activeFilterText}>All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.filterPill}>
              <Ionicons name="shapes" size={16} color="#2563EB" />
              <Text style={styles.filterPillText}>Food & Drink</Text>
              <Feather
                name="x"
                size={14}
                color="#2563EB"
                style={{ marginLeft: 4 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.filterPill,
                { borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" },
              ]}
            >
              <Feather name="calendar" size={16} color="#6B7280" />
              <Text style={[styles.filterPillText, { color: "#4B5563" }]}>
                Date Range
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            Found{" "}
            <Text style={styles.resultsCountBold}>
              {results.length} results
            </Text>
          </Text>
          <TouchableOpacity>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
          <Text style={styles.sectionTitle}>OCTOBER 2023</Text>
          {results.map((item) => (
            <View key={item.id} style={styles.resultItem}>
              <View style={[styles.itemIcon, { backgroundColor: item.bg }]}>
                {item.customIcon ? (
                  <Ionicons
                    name={item.icon as any}
                    size={24}
                    color={item.iconColor}
                  />
                ) : (
                  <Feather
                    name={item.icon as any}
                    size={24}
                    color={item.iconColor}
                  />
                )}
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemTags}>
                  <View
                    style={[
                      styles.tagContainer,
                      { backgroundColor: item.tagBg },
                    ]}
                  >
                    <Text style={[styles.tagText, { color: item.tagColor }]}>
                      {item.tag}
                    </Text>
                  </View>
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
              </View>
              <Text style={styles.itemAmount}>{item.amount}</Text>
            </View>
          ))}

          <Text style={styles.sectionTitle}>SEPTEMBER 2023</Text>
          {/* Placeholder for Sept items */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
