import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { useSplitBill } from "@/context/SplitBillContext";
import { SplitBillHeader } from "@/components/splitbill/SplitBillHeader";
import { EmptyGroupsState } from "@/components/splitbill/EmptyGroupsState";
import { GroupCard } from "@/components/splitbill/GroupCard";

export default function GroupsListScreen() {
  const router = useRouter();
  const { groups } = useSplitBill();

  return (
    <SafeAreaView style={styles.container}>
      <SplitBillHeader />

      <ScrollView contentContainerStyle={styles.groupListContent}>
        {groups.length === 0 ? (
          <EmptyGroupsState />
        ) : (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              id={group.id}
              name={group.name}
              membersCount={group.members.length}
              expensesCount={group.expenses.length}
            />
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/splitbill/create")}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
