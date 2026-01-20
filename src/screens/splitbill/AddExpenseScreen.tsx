import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { useSplitBill } from "@/context/SplitBillContext";
import { theme } from "@/constants/theme";

export default function AddExpenseScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { currentGroup, addExpense, selectGroup } = useSplitBill();

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("user-me");
  const [splitBetween, setSplitBetween] = useState<string[]>([]);

  useEffect(() => {
    if (id && (!currentGroup || currentGroup.id !== id)) {
      selectGroup(id as string);
    }
  }, [id, currentGroup]);

  useEffect(() => {
    if (currentGroup) {
      setSplitBetween(currentGroup.members.map((m) => m.id));
    }
  }, [currentGroup]);

  const handleSave = async () => {
    if (!description || !amount) {
      alert("Please enter description and amount");
      return;
    }
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (splitBetween.length === 0) {
      alert("Split must include at least one person");
      return;
    }

    if (currentGroup) {
      await addExpense(
        currentGroup.id,
        description,
        numAmount,
        paidBy,
        splitBetween
      );
      router.back();
    }
  };

  const toggleSplitUser = (userId: string) => {
    if (splitBetween.includes(userId)) {
      setSplitBetween(splitBetween.filter((id) => id !== userId));
    } else {
      setSplitBetween([...splitBetween, userId]);
    }
  };

  if (!currentGroup) return <View />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { backgroundColor: "transparent" }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Expense</Text>
        <View style={{ width: 44 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          {/* Amount Input */}
          <View style={{ alignItems: "center", marginVertical: 32 }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.text.secondary,
                fontWeight: "600",
                marginBottom: 16,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Enter Amount
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: "800",
                  color: theme.colors.text.primary,
                  marginRight: 8,
                }}
              >
                $
              </Text>
              <TextInput
                style={{
                  fontSize: 56,
                  fontWeight: "800",
                  color: theme.colors.text.primary,
                  minWidth: 100,
                  textAlign: "center",
                }}
                placeholder="0"
                placeholderTextColor="#CBD5E1"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                autoFocus
              />
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <View
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                },
              ]}
            >
              <View
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  backgroundColor: "#EFF6FF",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 16,
                }}
              >
                <Ionicons
                  name="receipt"
                  size={20}
                  color={theme.colors.primary}
                />
              </View>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 17,
                  color: theme.colors.text.primary,
                  fontWeight: "600",
                }}
                placeholder="What is this for?"
                placeholderTextColor={theme.colors.text.light}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Paid By */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Paid By</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {currentGroup.members.map((member) => (
                <TouchableOpacity
                  key={member.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 24,
                    backgroundColor:
                      paidBy === member.id ? "#1E293B" : "#FFFFFF",
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: paidBy === member.id ? "#1E293B" : "#F1F5F9",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 4,
                    elevation: 1,
                  }}
                  onPress={() => setPaidBy(member.id)}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor:
                        paidBy === member.id ? "#334155" : "#F1F5F9",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "700",
                        color:
                          paidBy === member.id
                            ? "#FFFFFF"
                            : theme.colors.text.secondary,
                      }}
                    >
                      {member.name.substring(0, 1)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color:
                        paidBy === member.id
                          ? "#FFFFFF"
                          : theme.colors.text.primary,
                      fontWeight: "700",
                    }}
                  >
                    {member.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Split Between */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Split Between</Text>
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 24,
                padding: 16,
                borderWidth: 1,
                borderColor: "#F1F5F9",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 1,
              }}
            >
              {currentGroup.members.map((member, index) => {
                const isSelected = splitBetween.includes(member.id);
                return (
                  <TouchableOpacity
                    key={member.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 14,
                      borderBottomWidth:
                        index < currentGroup.members.length - 1 ? 1 : 0,
                      borderBottomColor: "#F8FAFC",
                    }}
                    onPress={() => toggleSplitUser(member.id)}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 14,
                        backgroundColor: isSelected ? "#DCFCE7" : "#F1F5F9",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 16,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: isSelected ? "#16A34A" : "#94A3B8",
                        }}
                      >
                        {member.name.substring(0, 1)}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: isSelected
                          ? theme.colors.text.primary
                          : theme.colors.text.light,
                        flex: 1,
                      }}
                    >
                      {member.name}
                    </Text>
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: isSelected ? "#16A34A" : "#E2E8F0",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isSelected && (
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Save Expense</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
