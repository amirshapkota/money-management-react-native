import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/dashboard.styles";

export const Header = () => {
  const router = useRouter();
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>
        <View>
          <Text style={styles.welcomeText}>WELCOME BACK</Text>
          <Text style={styles.userName}>Alex Johnson</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.notificationButton}
        onPress={() => router.push("/notifications")}
      >
        <Ionicons name="notifications-outline" size={22} color="#1F2937" />
      </TouchableOpacity>
    </View>
  );
};
