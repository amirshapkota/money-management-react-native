import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  headerTitle: {
    ...theme.typography.h3, // Now 700 weight
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.xl,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginRight: 6,
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.l,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.l,
    justifyContent: "space-between",
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: 20,
    alignItems: "center",
    width: 180,
    ...theme.shadows.medium,
    justifyContent: "center",
  },
  summaryLabel: {
    fontSize: 11,
    color: theme.colors.text.light,
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  expenseAmount: {
    fontSize: 20,
    fontWeight: "800", // Bolder
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  incomeAmount: {
    fontSize: 20,
    fontWeight: "800", // Bolder
    color: theme.colors.status.success,
    letterSpacing: -0.5,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.l,
    height: 40,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.surface,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: "center",
  },
  filterPillActive: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  filterText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "600",
  },
  filterTextActive: {
    color: theme.colors.text.white,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
    textTransform: "uppercase",
  },
  listContent: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: 110,
    paddingTop: 8,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: theme.borderRadius.xxl,
    marginBottom: 12,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.background, // subtle distinction
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700", // Increased from 600
    color: theme.colors.text.primary,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  itemSubtitle: {
    fontSize: 13,
    color: theme.colors.text.light,
    fontWeight: "600", // Increased from 500
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "800", // Increased from 700
    color: theme.colors.text.primary,
    textAlign: "right",
  },
  amountExpense: {
    color: theme.colors.text.primary,
  },
  amountIncome: {
    color: theme.colors.status.success,
  },
});
