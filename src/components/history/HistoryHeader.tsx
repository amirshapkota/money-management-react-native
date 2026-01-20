import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styles } from "@/styles/history.styles";

export const HistoryHeader = () => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.monthSelector}>
        <Text style={styles.monthText}>October 2023</Text>
        <Feather name="chevron-down" size={20} color="#111827" />
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="chevron-left" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="chevron-right" size={20} color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.push("/search")}
        >
          <Feather name="search" size={20} color="#111827" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
