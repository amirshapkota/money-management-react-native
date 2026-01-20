import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/addBudgetCategory.styles";
import { theme } from "@/constants/theme";
import {
  useCreateBudgetCategory,
  useUpdateBudgetCategory,
  useBudgetCategories,
} from "@/hooks/useBudgets";

const CATEGORY_TEMPLATES = [
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
  { name: "Other", icon: "dots-horizontal", color: "#6B7280" },
];

const COLORS = [
  "#6366F1",
  "#F59E0B",
  "#EF4444",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
  "#84CC16",
  "#6B7280",
];

export default function AddBudgetCategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const budgetId = params.budgetId as string;
  const categoryId = params.categoryId as string;

  const { data: existingCategories } = useBudgetCategories(
    budgetId && budgetId !== "undefined" ? budgetId : "",
  );
  const createCategory = useCreateBudgetCategory();
  const updateCategory = useUpdateBudgetCategory();

  const existingCategory = existingCategories?.find(
    (c: any) => c.id === categoryId,
  );

  const [categoryName, setCategoryName] = useState(
    existingCategory?.name || "",
  );
  const [limitAmount, setLimitAmount] = useState(
    existingCategory?.limit_amount?.toString() || "",
  );
  const [selectedIcon, setSelectedIcon] = useState(
    existingCategory?.icon || "cart",
  );
  const [selectedColor, setSelectedColor] = useState(
    existingCategory?.color || "#6366F1",
  );
  const [alertThreshold, setAlertThreshold] = useState(
    ((existingCategory?.alert_threshold || 0.8) * 100).toString(),
  );

  const handleSave = async () => {
    if (!budgetId || budgetId === "undefined") {
      Alert.alert("Error", "Invalid budget ID. Please go back and try again.");
      return;
    }

    if (!categoryName.trim()) {
      Alert.alert("Error", "Please enter a category name");
      return;
    }

    if (!limitAmount || parseFloat(limitAmount) <= 0) {
      Alert.alert("Error", "Please enter a valid budget limit");
      return;
    }

    try {
      if (categoryId) {
        // Update existing category
        await updateCategory.mutateAsync({
          id: categoryId,
          updates: {
            name: categoryName.trim(),
            limit_amount: parseFloat(limitAmount),
            icon: selectedIcon,
            color: selectedColor,
            alert_threshold: parseFloat(alertThreshold) / 100,
          },
        });
      } else {
        // Create new category
        await createCategory.mutateAsync({
          budget_id: budgetId,
          name: categoryName.trim(),
          limit_amount: parseFloat(limitAmount),
          spent_amount: 0,
          icon: selectedIcon,
          color: selectedColor,
          alert_threshold: parseFloat(alertThreshold) / 100,
        });
      }

      Alert.alert(
        "Success",
        `Category ${categoryId ? "updated" : "created"} successfully`,
      );
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save category");
    }
  };

  const handleSelectTemplate = (template: (typeof CATEGORY_TEMPLATES)[0]) => {
    setCategoryName(template.name);
    setSelectedIcon(template.icon);
    setSelectedColor(template.color);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {categoryId ? "EDIT CATEGORY" : "NEW CATEGORY"}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* Category Templates */}
        {!categoryId && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>QUICK SELECT</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.templatesList}
            >
              {CATEGORY_TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.name}
                  style={[
                    styles.templateCard,
                    categoryName === template.name && styles.templateCardActive,
                  ]}
                  onPress={() => handleSelectTemplate(template)}
                >
                  <View
                    style={[
                      styles.templateIcon,
                      { backgroundColor: template.color + "20" },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={template.icon as any}
                      size={24}
                      color={template.color}
                    />
                  </View>
                  <Text style={styles.templateName}>{template.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Category Name */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CATEGORY NAME</Text>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={setCategoryName}
            placeholder="e.g., Groceries, Transport"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Budget Limit */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>MONTHLY LIMIT</Text>
          <View style={styles.amountInput}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInputText}
              value={limitAmount}
              onChangeText={setLimitAmount}
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        {/* Alert Threshold */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            ALERT THRESHOLD ({alertThreshold}%)
          </Text>
          <Text style={styles.helperText}>
            Get notified when spending reaches this percentage
          </Text>
          <View style={styles.thresholdOptions}>
            {["70", "80", "90", "100"].map((threshold) => (
              <TouchableOpacity
                key={threshold}
                style={[
                  styles.thresholdButton,
                  alertThreshold === threshold && styles.thresholdButtonActive,
                ]}
                onPress={() => setAlertThreshold(threshold)}
              >
                <Text
                  style={[
                    styles.thresholdButtonText,
                    alertThreshold === threshold &&
                      styles.thresholdButtonTextActive,
                  ]}
                >
                  {threshold}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Icon Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ICON</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.iconsList}
          >
            {CATEGORY_TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.icon}
                style={[
                  styles.iconOption,
                  selectedIcon === template.icon && styles.iconOptionActive,
                ]}
                onPress={() => setSelectedIcon(template.icon)}
              >
                <MaterialCommunityIcons
                  name={template.icon as any}
                  size={24}
                  color={
                    selectedIcon === template.icon
                      ? selectedColor
                      : theme.colors.text.secondary
                  }
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Color Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>COLOR</Text>
          <View style={styles.colorsList}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorOptionActive,
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Feather name="check" size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Preview */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>PREVIEW</Text>
          <View style={styles.previewCard}>
            <View
              style={[
                styles.previewIcon,
                { backgroundColor: selectedColor + "20" },
              ]}
            >
              <MaterialCommunityIcons
                name={selectedIcon as any}
                size={24}
                color={selectedColor}
              />
            </View>
            <View style={styles.previewInfo}>
              <Text style={styles.previewName}>
                {categoryName || "Category Name"}
              </Text>
              <Text style={styles.previewAmount}>
                $0 / ${limitAmount || "0"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            createCategory.isPending && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={createCategory.isPending || updateCategory.isPending}
        >
          {createCategory.isPending || updateCategory.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              {categoryId ? "Update Category" : "Add Category"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
