import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "@/styles/notifications.styles";

interface FilterTabsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterTabs = ({
  filters,
  activeFilter,
  onFilterChange,
}: FilterTabsProps) => {
  return (
    <View style={{ marginBottom: 8 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filters}
        contentContainerStyle={styles.filterContainer}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterItem,
              activeFilter === item && styles.activeFilterItem,
            ]}
            onPress={() => onFilterChange(item)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === item && styles.activeFilterText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
