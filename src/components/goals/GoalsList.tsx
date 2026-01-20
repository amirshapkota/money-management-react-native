import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { GoalCard } from "./GoalCard";
import { styles } from "@/styles/goal.styles";
import { theme } from "@/constants/theme";
import { useActiveGoals, useDepositToGoal } from "@/hooks/useGoals";

interface GoalsListProps {
  onGoalPress: (goalId: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  electronics: "#F59E0B",
  travel: "#2DD4BF",
  savings: "#F97316",
  education: "#8B5CF6",
  home: "#EC4899",
  health: "#10B981",
  other: "#6B7280",
};

export const GoalsList = ({ onGoalPress }: GoalsListProps) => {
  const router = useRouter();
  const { data: goals, isLoading } = useActiveGoals();
  const depositToGoal = useDepositToGoal();

  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState("");

  const handleDeposit = (goalId: string) => {
    setSelectedGoalId(goalId);
    setShowDepositModal(true);
    setDepositAmount("");
  };

  const confirmDeposit = async () => {
    if (!selectedGoalId || !depositAmount) return;

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    try {
      const result = await depositToGoal.mutateAsync({
        goalId: selectedGoalId,
        amount,
      });
      setShowDepositModal(false);
      setSelectedGoalId(null);
      setDepositAmount("");

      // Navigate to goal complete screen if goal was completed
      if (result.isCompleted) {
        router.push(`/goal-complete?goalId=${selectedGoalId}`);
      } else {
        Alert.alert("Success", "Deposit added successfully!");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to add deposit");
    }
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: theme.spacing.l,
        }}
      >
        <Text style={styles.sectionTitle}>Your Goals</Text>
        <TouchableOpacity
          style={{
            padding: 4,
            backgroundColor: "#EFF6FF",
            borderRadius: 20,
          }}
          onPress={() => router.push("/add-goal")}
        >
          <Ionicons name="add" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{ padding: 32, alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
        </View>
      ) : goals && goals.length > 0 ? (
        <View style={styles.goalsList}>
          {goals.map((goal) => {
            // Parse icon from name (format: icon:iconName|actualName)
            let displayName = goal.name;
            let iconName = "star";

            if (goal.name.startsWith("icon:")) {
              const parts = goal.name.split("|");
              if (parts.length === 2) {
                iconName = parts[0].replace("icon:", "");
                displayName = parts[1];
              }
            }

            const progress =
              goal.target_amount > 0
                ? goal.current_amount / goal.target_amount
                : 0;
            const color = goal.color || CATEGORY_COLORS.other;

            return (
              <GoalCard
                key={goal.id}
                name={displayName}
                icon={iconName}
                category="Savings" // Default since category not in schema
                currentAmount={`$${goal.current_amount.toFixed(2)}`}
                targetAmount={`$${goal.target_amount.toFixed(2)}`}
                progress={progress}
                color={color}
                onPress={() => onGoalPress(goal.id)}
                onDeposit={() => handleDeposit(goal.id)}
              />
            );
          })}
        </View>
      ) : (
        <View style={{ padding: 32, alignItems: "center" }}>
          <Text style={{ color: theme.colors.text.secondary }}>
            No active goals. Tap + to add one!
          </Text>
        </View>
      )}

      {/* Deposit Modal */}
      <Modal
        visible={showDepositModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDepositModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: 24,
              width: "85%",
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: theme.colors.text.primary,
                marginBottom: 16,
              }}
            >
              Add Deposit
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: theme.colors.text.secondary,
                marginBottom: 12,
              }}
            >
              Enter amount to deposit
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#E5E7EB",
                borderRadius: 12,
                paddingHorizontal: 16,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  color: theme.colors.text.secondary,
                  marginRight: 8,
                }}
              >
                $
              </Text>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 24,
                  fontWeight: "600",
                  color: theme.colors.text.primary,
                  paddingVertical: 12,
                }}
                value={depositAmount}
                onChangeText={setDepositAmount}
                placeholder="0"
                placeholderTextColor="#E5E7EB"
                keyboardType="numeric"
              />
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#F3F4F6",
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                }}
                onPress={() => setShowDepositModal(false)}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: theme.colors.text.secondary,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: theme.colors.primary,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: "center",
                }}
                onPress={confirmDeposit}
                disabled={depositToGoal.isPending}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#FFFFFF",
                  }}
                >
                  {depositToGoal.isPending ? "Adding..." : "Confirm"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
