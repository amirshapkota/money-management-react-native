import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { useSplitBill } from "@/context/SplitBillContext";
import { theme } from "@/constants/theme";

export default function CreateGroupScreen() {
  const router = useRouter();
  const { createGroup } = useSplitBill();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>([""]); // Start with one empty field

  const handleAddMemberField = () => {
    setMembers([...members, ""]);
  };

  const handleMemberChange = (text: string, index: number) => {
    const updated = [...members];
    updated[index] = text;
    setMembers(updated);
  };

  const handleCreate = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    const validMembers = members.filter((m) => m.trim().length > 0);
    if (validMembers.length === 0) {
      alert("Please add at least one friend to the group");
      return;
    }

    await createGroup(groupName, validMembers);
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={20} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Group</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Group Name</Text>
            <View
              style={[
                styles.input,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Ionicons
                name="people-outline"
                size={20}
                color={theme.colors.text.secondary}
                style={{ marginRight: 10 }}
              />
              <TextInput
                style={{
                  flex: 1,
                  color: theme.colors.text.primary,
                  fontSize: 16,
                }}
                placeholder="e.g. Apartment 4B, Trip to Paris"
                placeholderTextColor={theme.colors.text.light}
                value={groupName}
                onChangeText={setGroupName}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Add Members</Text>
            {members.map((member, index) => (
              <View key={index} style={styles.memberInputRow}>
                <View
                  style={[
                    styles.input,
                    { flex: 1, flexDirection: "row", alignItems: "center" },
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={theme.colors.text.secondary}
                    style={{ marginRight: 8 }}
                  />
                  <TextInput
                    style={{
                      flex: 1,
                      color: theme.colors.text.primary,
                      fontSize: 16,
                    }}
                    placeholder="Enter name"
                    placeholderTextColor={theme.colors.text.light}
                    value={member}
                    onChangeText={(text) => handleMemberChange(text, index)}
                  />
                </View>
                {members.length > 1 && (
                  <TouchableOpacity
                    style={{ marginLeft: 10, padding: 8 }}
                    onPress={() => {
                      const updated = members.filter((_, i) => i !== index);
                      setMembers(updated);
                    }}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={24}
                      color={theme.colors.status.error}
                    />
                  </TouchableOpacity>
                )}
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddMemberField}
            >
              <Ionicons
                name="person-add-outline"
                size={20}
                color={theme.colors.primary}
              />
              <Text style={styles.addText}>Add another person</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleCreate}>
            <Text style={styles.primaryButtonText}>Create Group</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
