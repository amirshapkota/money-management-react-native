import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { styles } from "@/styles/addGoal.styles";
import { theme } from "@/constants/theme";

const GOAL_COLORS = [
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#10B981", // Green
  "#F59E0B", // Yellow/Orange
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#F97316", // Orange
];

export default function AddGoalScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(GOAL_COLORS[0]);
  const [date, setDate] = useState("12/31/2024");

  const handleSave = () => {
    // Add save logic here
    router.back();
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
                <FontAwesome5 name="bullseye" size={20} color={selectedColor} />
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
            <TouchableOpacity style={styles.inputCard}>
              <View style={styles.iconContainer}>
                <Feather
                  name="calendar"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <Text style={styles.inputText}>{date}</Text>
              <Feather name="chevron-down" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.createButton} onPress={handleSave}>
          <Text style={styles.createButtonText}>Create Goal</Text>
          <Feather name="check" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
