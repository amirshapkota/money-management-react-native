import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { styles } from "@/styles/categoryPicker.styles";
import { theme } from "@/constants/theme";

const DEFAULT_CATEGORIES = [
  { name: "Groceries", icon: "cart", color: "#6366F1" },
  { name: "Transport", icon: "car", color: "#F59E0B" },
  { name: "Rent", icon: "home", color: "#EF4444" },
  { name: "Entertainment", icon: "gamepad-variant", color: "#10B981" },
  { name: "Food & Drink", icon: "food", color: "#8B5CF6" },
  { name: "Shopping", icon: "shopping", color: "#EC4899" },
  { name: "Health", icon: "heart-pulse", color: "#06B6D4" },
  { name: "Bills", icon: "receipt", color: "#DC2626" },
  { name: "Education", icon: "school", color: "#7C3AED" },
  { name: "Travel", icon: "airplane", color: "#0EA5E9" },
  { name: "Fitness", icon: "dumbbell", color: "#22C55E" },
  { name: "Subscriptions", icon: "refresh", color: "#F97316" },
  { name: "Gifts", icon: "gift", color: "#EC4899" },
  { name: "Pets", icon: "paw", color: "#84CC16" },
  { name: "Salary", icon: "cash", color: "#10B981" },
  { name: "Freelance", icon: "briefcase", color: "#3B82F6" },
  { name: "Investment", icon: "chart-line", color: "#8B5CF6" },
  { name: "Other", icon: "dots-horizontal", color: "#6B7280" },
];

interface CategoryPickerProps {
  visible: boolean;
  selectedCategory: string;
  onSelect: (category: string) => void;
  onClose: () => void;
  customCategories?: Array<{ name: string; icon?: string; color?: string }>;
  showOnlyCustom?: boolean;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  visible,
  selectedCategory,
  onSelect,
  onClose,
  customCategories = [],
  showOnlyCustom = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const allCategories = showOnlyCustom
    ? [
        ...customCategories.map((c) => ({
          name: c.name,
          icon: c.icon || "folder",
          color: c.color || "#6B7280",
        })),
        { name: "Other", icon: "dots-horizontal", color: "#6B7280" },
      ]
    : [
        ...customCategories.map((c) => ({
          name: c.name,
          icon: c.icon || "folder",
          color: c.color || "#6B7280",
        })),
        ...DEFAULT_CATEGORIES.filter(
          (dc) => !customCategories.some((cc) => cc.name === dc.name),
        ),
      ];

  const filteredCategories = allCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (categoryName: string) => {
    onSelect(categoryName);
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Category</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color={theme.colors.text.secondary}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search categories..."
            placeholderTextColor={theme.colors.text.light}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather
                name="x-circle"
                size={20}
                color={theme.colors.text.secondary}
              />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView style={styles.categoriesList}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.name}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name &&
                    styles.categoryItemSelected,
                ]}
                onPress={() => handleSelect(category.name)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color + "20" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={24}
                    color={category.color}
                  />
                </View>
                <Text
                  style={[
                    styles.categoryName,
                    selectedCategory === category.name &&
                      styles.categoryNameSelected,
                  ]}
                >
                  {category.name}
                </Text>
                {selectedCategory === category.name && (
                  <Feather
                    name="check"
                    size={20}
                    color={theme.colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No categories found</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
