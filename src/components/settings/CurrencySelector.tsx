import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";
import { theme } from "@/constants/theme";

interface CurrencySelectorProps {
  currency: string;
  onPress: () => void;
}

export const CurrencySelector = ({
  currency,
  onPress,
}: CurrencySelectorProps) => {
  return (
    <View style={styles.controlRow}>
      <View style={styles.controlLabelContainer}>
        <View
          style={[
            styles.menuIcon,
            { margin: 0, marginRight: 12, backgroundColor: "#FFF7ED" },
          ]}
        >
          <MaterialCommunityIcons
            name="currency-usd"
            size={20}
            color="#EA580C"
          />
        </View>
        <Text style={styles.controlText}>Currency</Text>
      </View>
      <TouchableOpacity style={styles.currencySelector} onPress={onPress}>
        <Text
          style={{
            fontWeight: "600",
            marginRight: 4,
            color: theme.colors.text.primary,
          }}
        >
          {currency}
        </Text>
        <Ionicons
          name="chevron-down"
          size={14}
          color={theme.colors.text.secondary}
        />
      </TouchableOpacity>
    </View>
  );
};
