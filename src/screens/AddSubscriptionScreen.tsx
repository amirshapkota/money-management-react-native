import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AddSubscriptionHeader } from "@/components/subscriptions/AddSubscriptionHeader";
import { FormInput } from "@/components/subscriptions/FormInput";
import { CategorySelector } from "@/components/subscriptions/CategorySelector";
import { BillingCycleSelector } from "@/components/subscriptions/BillingCycleSelector";
import { SubscriptionIconPicker } from "@/components/subscriptions/SubscriptionIconPicker";
import { useCreateSubscription } from "@/hooks/useSubscriptions";

export default function AddSubscriptionScreen() {
  const router = useRouter();
  const createSubscription = useCreateSubscription();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Entertainment");
  const [billingCycle, setBillingCycle] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");
  const [nextBilling, setNextBilling] = useState("");
  const [description, setDescription] = useState("");
  const [autoRenew, setAutoRenew] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState("apps");
  const [iconColor, setIconColor] = useState("#6B7280");
  const [showIconPicker, setShowIconPicker] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !amount) {
      Alert.alert("Error", "Please fill in subscription name and amount");
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (!nextBilling) {
      Alert.alert("Error", "Please enter next billing date (YYYY-MM-DD)");
      return;
    }

    try {
      // Store icon in name like goals: "icon:iconName|actualName"
      const nameWithIcon = `icon:${selectedIcon}|${name.trim()}`;

      await createSubscription.mutateAsync({
        name: nameWithIcon,
        amount: amountNum,
        billing_cycle: billingCycle,
        next_billing_date: nextBilling,
        category: category,
        auto_pay: autoRenew,
        status: "active",
        color: iconColor,
      });

      Alert.alert("Success", "Subscription added successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to add subscription. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <AddSubscriptionHeader onSave={handleSave} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Icon Selector */}
            <TouchableOpacity
              onPress={() => setShowIconPicker(true)}
              style={{
                alignSelf: "center",
                marginBottom: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: iconColor + "20",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <MaterialCommunityIcons
                  name={selectedIcon as any}
                  size={40}
                  color={iconColor}
                />
              </View>
              <Text
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  fontWeight: "500",
                }}
              >
                Tap to change icon
              </Text>
            </TouchableOpacity>

            <FormInput
              label="Subscription Name"
              value={name}
              onChangeText={setName}
              placeholder="e.g. Netflix, Spotify"
              icon="tv"
              iconColor="#EF4444"
              iconBgColor="#FEE2E2"
            />

            <FormInput
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              icon="cash"
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              keyboardType="numeric"
            />

            <CategorySelector
              label="Category"
              selectedCategory={category}
              onPress={() => {
                // Cycle through categories
                const categories = [
                  "Entertainment",
                  "Productivity",
                  "Health",
                  "Education",
                  "Other",
                ];
                const currentIndex = categories.indexOf(category);
                const nextIndex = (currentIndex + 1) % categories.length;
                setCategory(categories[nextIndex]);
              }}
            />

            <BillingCycleSelector
              label="Billing Cycle"
              selectedCycle={
                billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)
              }
              onPress={() => {
                // Cycle through billing cycles
                const cycles: Array<"daily" | "weekly" | "monthly" | "yearly"> =
                  ["daily", "weekly", "monthly", "yearly"];
                const currentIndex = cycles.indexOf(billingCycle);
                const nextIndex = (currentIndex + 1) % cycles.length;
                setBillingCycle(cycles[nextIndex]);
              }}
            />

            <FormInput
              label="Next Billing Date"
              value={nextBilling}
              onChangeText={setNextBilling}
              placeholder="YYYY-MM-DD"
              icon="calendar-outline"
              iconColor="#3B82F6"
              iconBgColor="#DBEAFE"
            />

            <FormInput
              label="Description (Optional)"
              value={description}
              onChangeText={setDescription}
              placeholder="Add notes about this subscription"
              icon="document-text-outline"
              iconColor="#F59E0B"
              iconBgColor="#FEF3C7"
            />
          </ScrollView>
        </KeyboardAvoidingView>

        <SubscriptionIconPicker
          visible={showIconPicker}
          selectedIcon={selectedIcon}
          onSelect={(icon, color) => {
            setSelectedIcon(icon);
            setIconColor(color);
          }}
          onClose={() => setShowIconPicker(false)}
        />
      </SafeAreaView>
    </View>
  );
}
