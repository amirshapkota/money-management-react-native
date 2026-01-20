import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/addGoal.styles";
import { theme } from "@/constants/theme";
import { useCreateGoal } from "@/hooks/useGoals";

const GOAL_TEMPLATES = [
  { name: "Electronics", icon: "laptop", color: "#6366F1" },
  { name: "Travel", icon: "airplane", color: "#0EA5E9" },
  { name: "Savings", icon: "piggy-bank", color: "#F59E0B" },
  { name: "Education", icon: "school", color: "#8B5CF6" },
  { name: "Home", icon: "home", color: "#EC4899" },
  { name: "Health", icon: "heart-pulse", color: "#10B981" },
  { name: "Car", icon: "car", color: "#EF4444" },
  { name: "Wedding", icon: "ring", color: "#EC4899" },
  { name: "Emergency Fund", icon: "shield-check", color: "#DC2626" },
  { name: "Vacation", icon: "beach", color: "#06B6D4" },
  { name: "Investment", icon: "chart-line", color: "#8B5CF6" },
  { name: "Other", icon: "star", color: "#6B7280" },
];

const GOAL_COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Yellow/Orange
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F97316", // Orange
  "#06B6D4", // Cyan
  "#84CC16", // Lime
  "#6B7280", // Gray
];

export default function AddGoalScreen() {
  const router = useRouter();
  const createGoal = useCreateGoal();

  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(GOAL_TEMPLATES[0].icon);
  const [selectedColor, setSelectedColor] = useState(GOAL_TEMPLATES[0].color);
  const [targetDate, setTargetDate] = useState("");

  const handleSave = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a goal name");
      return;
    }

    const targetAmount = parseFloat(amount);
    if (!targetAmount || targetAmount <= 0) {
      Alert.alert("Error", "Please enter a valid target amount");
      return;
    }

    if (!targetDate) {
      Alert.alert("Error", "Please select a target date");
      return;
    }

    try {
      // Store icon in name using special format: icon:iconName|actualName
      const goalNameWithIcon = `icon:${selectedIcon}|${name.trim()}`;

      await createGoal.mutateAsync({
        name: goalNameWithIcon,
        target_amount: targetAmount,
        current_amount: 0,
        target_date: targetDate,
        color: selectedColor,
      });

      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to create goal. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Feather
            name="arrow-left"
            size={24}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NEW SAVINGS GOAL</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {/* Target Amount */}
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>TARGET AMOUNT</Text>
            <View style={styles.amountWrapper}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                placeholderTextColor="#E5E7EB"
                keyboardType="numeric"
                maxLength={7}
              />
            </View>
          </View>

          {/* Goal Name */}
          <View>
            <Text style={styles.sectionLabel}>GOAL NAME</Text>
            <View style={styles.inputCard}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: selectedColor + "20" },
                ]}
              >
                <MaterialCommunityIcons
                  name={selectedIcon as any}
                  size={20}
                  color={selectedColor}
                />
              </View>
              <TextInput
                style={styles.inputText}
                value={name}
                onChangeText={setName}
                placeholder="e.g. New Car, Paris Trip"
                placeholderTextColor={theme.colors.text.light}
              />
            </View>
          </View>

          {/* Goal Templates */}
          <View>
            <Text style={styles.sectionLabel}>GOAL TEMPLATES</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4, gap: 12 }}
            >
              {GOAL_TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.name}
                  style={[
                    {
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor:
                        selectedIcon === template.icon &&
                        selectedColor === template.color
                          ? theme.colors.primary
                          : "#F3F4F6",
                    },
                  ]}
                  onPress={() => {
                    setSelectedIcon(template.icon);
                    setSelectedColor(template.color);
                    if (!name) setName(template.name);
                  }}
                >
                  <MaterialCommunityIcons
                    name={template.icon as any}
                    size={18}
                    color={
                      selectedIcon === template.icon &&
                      selectedColor === template.color
                        ? "#FFFFFF"
                        : template.color
                    }
                  />
                  <Text
                    style={{
                      color:
                        selectedIcon === template.icon &&
                        selectedColor === template.color
                          ? "#FFFFFF"
                          : theme.colors.text.secondary,
                      fontWeight: "600",
                    }}
                  >
                    {template.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Icon Picker */}
          <View>
            <Text style={styles.sectionLabel}>ICON</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4, gap: 12 }}
            >
              {GOAL_TEMPLATES.map((template) => (
                <TouchableOpacity
                  key={template.icon}
                  style={[
                    {
                      width: 50,
                      height: 50,
                      borderRadius: 12,
                      backgroundColor:
                        selectedIcon === template.icon
                          ? selectedColor + "20"
                          : "#F3F4F6",
                      borderWidth: 2,
                      borderColor:
                        selectedIcon === template.icon
                          ? selectedColor
                          : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                  onPress={() => setSelectedIcon(template.icon)}
                >
                  <MaterialCommunityIcons
                    name={template.icon as any}
                    size={24}
                    color={
                      selectedIcon === template.icon
                        ? selectedColor
                        : template.color
                    }
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Color Picker */}
          <View>
            <Text style={styles.sectionLabel}>COLOR TAG</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.colorPickerScroll}
            >
              {GOAL_COLORS.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color },
                    selectedColor === color && styles.colorOptionSelected,
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Target Date */}
          <View>
            <Text style={styles.sectionLabel}>TARGET DATE</Text>
            <View style={styles.inputCard}>
              <View style={styles.iconContainer}>
                <Feather
                  name="calendar"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <TextInput
                style={styles.inputText}
                value={targetDate}
                onChangeText={setTargetDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={theme.colors.text.light}
              />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.createButton,
            createGoal.isPending && { opacity: 0.6 },
          ]}
          onPress={handleSave}
          disabled={createGoal.isPending}
        >
          {createGoal.isPending ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Text style={styles.createButtonText}>Create Goal</Text>
              <Feather name="check" size={20} color="#FFFFFF" />
            </>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
