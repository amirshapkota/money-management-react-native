import React, { useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/splitbill.styles";
import { useSplitBill } from "@/context/SplitBillContext";
import { theme } from "@/constants/theme";
import { GroupDetailHeader } from "@/components/splitbill/GroupDetailHeader";
import { NetBalanceCard } from "@/components/splitbill/NetBalanceCard";
import { DebtSection } from "@/components/splitbill/DebtSection";
import { ActivityItem } from "@/components/splitbill/ActivityItem";

export default function GroupDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const {
    currentGroup,
    selectGroup,
    getGroupBalances,
    getDebts,
    settleUp,
    deleteExpense,
  } = useSplitBill();

  useEffect(() => {
    if (id) {
      selectGroup(id as string);
    }
  }, [id]);

  // Calculate Balances & Debts
  const balances = useMemo(
    () => (currentGroup ? getGroupBalances(currentGroup.id) : {}),
    [currentGroup]
  );

  const allDebts = useMemo(
    () => (currentGroup ? getDebts(currentGroup.id) : []),
    [currentGroup]
  );

  // "You" is hardcoded as 'user-me' in context for now
  const myBalance = balances["user-me"] || 0;
  const isOwed = myBalance > 0;

  const youAreOwed = allDebts.filter((d) => d.to === "user-me");
  const youOwe = allDebts.filter((d) => d.from === "user-me");
  const otherDebts = allDebts.filter(
    (d) => d.from !== "user-me" && d.to !== "user-me"
  );

  // Redirect if group not found (e.g. deleted)
  useEffect(() => {
    if (!currentGroup) {
      const timer = setTimeout(() => {
        if (!currentGroup) {
          if (router.canGoBack()) {
            router.dismissAll();
          } else {
            router.replace("/splitbill");
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentGroup]);

  if (!currentGroup) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  // Expenses (reversed for latest first)
  const recentExpenses = [...currentGroup.expenses].reverse();

  const handleDeleteExpense = (expenseId: string) => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this expense?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteExpense(currentGroup.id, expenseId),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GroupDetailHeader
        groupName={currentGroup.name}
        membersCount={currentGroup.members.length}
        groupId={currentGroup.id}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <NetBalanceCard
          members={currentGroup.members}
          myBalance={myBalance}
          isOwed={isOwed}
          onSettleUp={() => settleUp(currentGroup.id)}
        />

        <DebtSection
          title="You're Owed"
          debts={youAreOwed}
          members={currentGroup.members}
          badgeColor="#DCFCE7"
          badgeTextColor="#15803D"
          avatarColor="#F0FDF4"
          avatarTextColor="#15803D"
          amountColor="#10B981"
          getDescription={() => "owes you"}
        />

        <DebtSection
          title="You Owe"
          debts={youOwe}
          members={currentGroup.members}
          badgeColor="#FEE2E2"
          badgeTextColor="#B91C1C"
          avatarColor="#FEF2F2"
          avatarTextColor="#B91C1C"
          amountColor="#EF4444"
          getDescription={() => "you owe"}
        />

        <DebtSection
          title="Group Debts"
          debts={otherDebts}
          members={currentGroup.members}
          badgeColor="#F3F4F6"
          badgeTextColor="#4B5563"
          avatarColor="#F3F4F6"
          avatarTextColor="#64748B"
          amountColor={theme.colors.text.primary}
          getDescription={(debt, members) => {
            const toMember = members.find((m) => m.id === debt.to);
            return `owes ${toMember?.name || "Unknown"}`;
          }}
        />

        {/* Recent Activity */}
        <View style={styles.activityTopper}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentExpenses.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              color: theme.colors.text.secondary,
              marginTop: 20,
              fontStyle: "italic",
            }}
          >
            No expenses yet. Add one!
          </Text>
        ) : (
          recentExpenses.map((expense) => {
            const payer = currentGroup.members.find(
              (m) => m.id === expense.paidBy
            );
            return (
              <ActivityItem
                key={expense.id}
                expense={expense}
                payer={payer}
                currency={currentGroup.currency}
                onDelete={() => handleDeleteExpense(expense.id)}
              />
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push(`/splitbill/${currentGroup.id}/add`)}
      >
        <Ionicons name="receipt-outline" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
