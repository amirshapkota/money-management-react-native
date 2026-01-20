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
import { Feather, Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/addTransaction.styles";
import { TransactionTypeToggle } from "@/components/add-transaction/TransactionTypeToggle";
import { AmountInput } from "@/components/add-transaction/AmountInput";
import { CategorySelector } from "@/components/add-transaction/CategorySelector";

export default function AddTransactionScreen() {
  const router = useRouter();
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & Drink"); // Default for now
  const [date, setDate] = useState("10/27/2023");
  const [note, setNote] = useState("");

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
            onPress={() => {
              /* Open category picker */
            }}
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

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Transaction</Text>
          <Feather name="check-circle" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
