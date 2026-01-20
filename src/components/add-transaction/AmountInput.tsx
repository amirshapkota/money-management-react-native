import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "@/styles/addTransaction.styles";

interface AmountInputProps {
  amount: string;
  setAmount: (amount: string) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  amount,
  setAmount,
}) => {
  return (
    <View style={styles.amountContainer}>
      <Text style={styles.amountLabel}>AMOUNT</Text>
      <View style={styles.amountWrapper}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={styles.amountInput}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor="#E5E7EB"
        />
      </View>
    </View>
  );
};
