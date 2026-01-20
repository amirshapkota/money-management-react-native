import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSplitBill } from "@/context/SplitBillContext";
import { styles } from "@/styles/splitbill.styles";
import { theme } from "@/constants/theme";

export default function GroupSettingsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { currentGroup, deleteGroup, addMember, removeMember } = useSplitBill();

  const [newMemberName, setNewMemberName] = useState("");

  if (!currentGroup || currentGroup.id !== id) {
    return <View />;
  }

  const handleAddMember = async () => {
    if (!newMemberName.trim()) return;
    await addMember(currentGroup.id, newMemberName);
    setNewMemberName("");
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    Alert.alert(
      "Remove Member",
      `Are you sure you want to remove ${memberName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await removeMember(currentGroup.id, memberId);
          },
        },
      ]
    );
  };

  const handleDeleteGroup = async () => {
    Alert.alert(
      "Delete Group",
      "Are you sure you want to delete this group? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteGroup(currentGroup.id);
            router.dismissAll();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color={theme.colors.text.primary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Settings</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: theme.spacing.l }}>
        {/* Group Name Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Group Name</Text>
          <View style={styles.input}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: theme.colors.text.primary,
              }}
            >
              {currentGroup.name}
            </Text>
          </View>
        </View>

        {/* Members Management */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Members</Text>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
              padding: 16,
              ...theme.shadows.small,
            }}
          >
            {currentGroup.members.map((member, index) => (
              <View
                key={member.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 12,
                  borderBottomWidth:
                    index < currentGroup.members.length - 1 ? 1 : 0,
                  borderBottomColor: "#F1F5F9",
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: "#F1F5F9",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "700",
                      color: theme.colors.text.secondary,
                    }}
                  >
                    {member.name.substring(0, 1)}
                  </Text>
                </View>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: theme.colors.text.primary,
                    fontWeight: "600",
                  }}
                >
                  {member.name}
                </Text>
                {member.id !== "user-me" && (
                  <TouchableOpacity
                    onPress={() => handleRemoveMember(member.id, member.name)}
                    style={{
                      padding: 8,
                      backgroundColor: "#FEF2F2",
                      borderRadius: 8,
                    }}
                  >
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {/* Add New Member Input */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 16,
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: "#F1F5F9",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 15,
                  padding: 12,
                  backgroundColor: "#F8FAFC",
                  borderRadius: 12,
                  marginRight: 12,
                  color: theme.colors.text.primary,
                }}
                placeholder="Add new member..."
                placeholderTextColor={theme.colors.text.light}
                value={newMemberName}
                onChangeText={setNewMemberName}
              />
              <TouchableOpacity
                onPress={handleAddMember}
                style={{
                  padding: 12,
                  backgroundColor: theme.colors.primary,
                  borderRadius: 12,
                }}
              >
                <Ionicons name="add" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: "#EF4444",
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Danger Zone
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FEF2F2",
              borderRadius: 20,
              padding: 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#FECACA",
            }}
            onPress={handleDeleteGroup}
          >
            <Ionicons
              name="trash"
              size={20}
              color="#EF4444"
              style={{ marginRight: 8 }}
            />
            <Text style={{ color: "#EF4444", fontSize: 16, fontWeight: "700" }}>
              Delete Group
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
