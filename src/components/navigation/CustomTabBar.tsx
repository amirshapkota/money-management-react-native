import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.bottomNav}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const getIconColor = () => (isFocused ? "#3B82F6" : "#9CA3AF");

        let iconName: any;
        if (route.name === "index") iconName = "home";
        else if (route.name === "insights") iconName = "stats-chart";
        else if (route.name === "wallet") iconName = "wallet-outline";
        else if (route.name === "settings") iconName = "settings-outline";
        else return null;

        // Render logic: Standard item
        const item = (
          <TouchableOpacity
            key={route.key}
            style={styles.navItem}
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Ionicons name={iconName} size={24} color={getIconColor()} />
          </TouchableOpacity>
        );

        if (index === 2) {
          return (
            <React.Fragment key="fab-fragment">
              <TouchableOpacity
                style={styles.fabButton}
                activeOpacity={0.9}
                onPress={() => navigation.navigate("add-transaction" as any)}
              >
                <Feather name="plus" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              {item}
            </React.Fragment>
          );
        }

        return item;
      })}
      <TouchableOpacity
        style={styles.rightFloatingButton}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("splitbill" as any)}
      >
        <AntDesign name="split-cells" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingBottom: Platform.OS === "ios" ? 22 : 11,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    width: 56,
    height: 56,
    borderRadius: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  fabButton: {
    top: -30,
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  rightFloatingButton: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "ios" ? 110 : 95, // above tab bar
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});
