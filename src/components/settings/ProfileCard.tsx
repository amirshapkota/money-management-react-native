import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/settings.styles";

export const ProfileCard = () => {
  return (
    <View style={styles.profileCard}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=alex" }}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={12} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.userName}>Alex Johnson</Text>
      <Text style={styles.userEmail}>alex.j@example.com</Text>
      <View style={styles.proBadge}>
        <Text style={styles.proText}>Pro Member</Text>
      </View>
    </View>
  );
};
