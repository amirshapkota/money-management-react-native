import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { AddSubscriptionHeader } from "@/components/subscriptions/AddSubscriptionHeader";
import { FormInput } from "@/components/subscriptions/FormInput";
import { CategorySelector } from "@/components/subscriptions/CategorySelector";
import { BillingCycleSelector } from "@/components/subscriptions/BillingCycleSelector";

export default function AddSubscriptionScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Entertainment");
  const [billingCycle, setBillingCycle] = useState("Monthly");
  const [nextBilling, setNextBilling] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!name || !amount) {
      Alert.alert("Error", "Please fill in subscription name and amount");
      return;
    }

    // Save logic here
    Alert.alert("Success", "Subscription added successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
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
                // Open category picker modal
                Alert.alert("Category", "Category picker coming soon!");
              }}
            />

            <BillingCycleSelector
              label="Billing Cycle"
              selectedCycle={billingCycle}
              onPress={() => {
                // Open billing cycle picker modal
                Alert.alert(
                  "Billing Cycle",
                  "Billing cycle picker coming soon!"
                );
              }}
            />

            <FormInput
              label="Next Billing Date"
              value={nextBilling}
              onChangeText={setNextBilling}
              placeholder="MM/DD/YYYY"
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
      </SafeAreaView>
    </View>
  );
}
