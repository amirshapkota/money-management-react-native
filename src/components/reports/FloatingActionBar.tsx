import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/reports.styles";

interface FloatingActionBarProps {
  onExport: () => void;
  onShare: () => void;
}

export const FloatingActionBar = ({
  onExport,
  onShare,
}: FloatingActionBarProps) => {
  return (
    <View style={styles.floatingActionBar}>
      <TouchableOpacity style={styles.mainActionBtn} onPress={onExport}>
        <Text style={styles.mainActionText}>Export PDF Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryActionBtn} onPress={onShare}>
        <Ionicons name="share-outline" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};
