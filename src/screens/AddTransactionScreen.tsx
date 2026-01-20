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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/addTransaction.styles";
import { TransactionTypeToggle } from "@/components/add-transaction/TransactionTypeToggle";
import { AmountInput } from "@/components/add-transaction/AmountInput";
import { CategorySelector } from "@/components/add-transaction/CategorySelector";
import { CategoryPicker } from "@/components/CategoryPicker";
import { useCreateTransaction } from "@/hooks/useTransactions";
import { useBudgetByMonth } from "@/hooks/useBudgets";

export default function AddTransactionScreen() {
  const router = useRouter();
  const createTransaction = useCreateTransaction();

  // Get current month budget to fetch categories
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  const { data: budget } = useBudgetByMonth(currentMonth);

  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // ISO format
  const [note, setNote] = useState("");

  // Extract categories from budget
  const budgetCategories =
    budget?.budget_categories?.map((cat) => ({
      name: cat.name,
      icon: cat.icon || "folder",
      color: cat.color || "#6B7280",
    })) || [];

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    try {
      console.log(`[AddTransaction] Creating transaction:`, {
        type,
        amount: parseFloat(amount),
        category,
        transaction_date: date,
      });

      await createTransaction.mutateAsync({
        type,
        amount: parseFloat(amount),
        category,
        transaction_date: date,
        description: note || null,
        currency: "USD",
      });

      console.log(`[AddTransaction] Transaction created successfully`);
      Alert.alert("Success", "Transaction saved successfully");
      router.back();
    } catch (error: any) {
      console.error(`[AddTransaction] Error:`, error);
      Alert.alert("Error", error.message || "Failed to save transaction");
    }
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
        <Text style={styles.headerTitle}>NEW TRANSACTION</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="more-horizontal" size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.content}>
          <TransactionTypeToggle type={type} setType={setType} />
          <AmountInput amount={amount} setAmount={setAmount} />

          <CategorySelector
            category={category}
            onPress={() => setShowCategoryPicker(true)}
          />

          <View>
            <Text style={styles.sectionLabel}>DATE</Text>
            <TouchableOpacity style={styles.inputCard}>
              <View style={styles.categoryIcon}>
                <Feather name="calendar" size={20} color="#A855F7" />
              </View>
              <Text style={styles.inputText}>{date}</Text>
              <Feather name="edit-2" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.sectionLabel}>NOTE</Text>
            <View style={styles.inputCard}>
              <View style={styles.categoryIcon}>
                <Ionicons name="create-outline" size={20} color="#F97316" />
              </View>
              <TextInput
                style={styles.inputText}
                value={note}
                onChangeText={setNote}
                placeholder="Add a note..."
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.saveButton,
            createTransaction.isPending && { opacity: 0.6 },
          ]}
          onPress={handleSave}
          disabled={createTransaction.isPending}
        >
          <Text style={styles.saveButtonText}>
            {createTransaction.isPending ? "Saving..." : "Save Transaction"}
          </Text>
          <Feather name="check-circle" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <CategoryPicker
        visible={showCategoryPicker}
        selectedCategory={category}
        onSelect={setCategory}
        onClose={() => setShowCategoryPicker(false)}
        customCategories={budgetCategories}
        showOnlyCustom={true}
      />
    </SafeAreaView>
  );
}
