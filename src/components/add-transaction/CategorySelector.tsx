import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { styles } from "@/styles/addTransaction.styles";

interface CategorySelectorProps {
  category: string;
  onPress: () => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  category,
  onPress,
}) => {
  return (
    <View>
      <Text style={styles.sectionLabel}>CATEGORY</Text>
      <TouchableOpacity style={styles.inputCard} onPress={onPress}>
        <View style={styles.categoryIcon}>
          <Ionicons name="shapes" size={20} color="#3B82F6" />
        </View>
        <Text style={[styles.inputText, !category && styles.placeholderText]}>
          {category || "Select Category"}
        </Text>
        <Feather name="chevron-down" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </View>
  );
};
