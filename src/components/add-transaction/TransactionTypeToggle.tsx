import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/addTransaction.styles";

interface TransactionTypeToggleProps {
  type: "expense" | "income";
  setType: (type: "expense" | "income") => void;
}

export const TransactionTypeToggle: React.FC<TransactionTypeToggleProps> = ({
  type,
  setType,
}) => {
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          type === "expense" && styles.toggleButtonActive,
        ]}
        onPress={() => setType("expense")}
      >
        <Text
          style={[
            styles.toggleText,
            type === "expense" && styles.toggleTextActive,
          ]}
        >
          Expense
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          type === "income" && styles.toggleButtonActive,
        ]}
        onPress={() => setType("income")}
      >
        <Text
          style={[
            styles.toggleText,
            type === "income" && styles.toggleTextActive,
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>
    </View>
  );
};
