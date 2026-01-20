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
  },
  headerTitle: {
    ...theme.typography.h3,
    fontSize: 20, // Ensure size matches h3
    letterSpacing: 0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.l,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.m,
    padding: 4,
    marginBottom: 40,
    marginTop: theme.spacing.m,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  toggleButtonActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  toggleText: {
    ...theme.typography.body,
    fontWeight: "500",
  },
  toggleTextActive: {
    color: theme.colors.text.primary,
    fontWeight: "600",
  },
  amountContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  amountLabel: {
    fontSize: 11,
    color: theme.colors.text.light,
    letterSpacing: 1,
    marginBottom: theme.spacing.s,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  currencySymbol: {
    fontSize: 32,
    color: "#D1D5DB", // keeping specific color for inactive state look
    marginRight: 4,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  amountInput: {
    fontSize: 56,
    fontWeight: "800", // Making this very bold like the dashboard balance
    color: theme.colors.text.primary,
    minWidth: 100,
    textAlign: "center",
    padding: 0,
  },
  sectionLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: "uppercase",
    fontWeight: "600",
    marginLeft: 4,
  },
  inputCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.m,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.l,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: theme.colors.inputBg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.primary,
  },
  placeholderText: {
    color: theme.colors.text.light,
  },
  saveButton: {
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: theme.borderRadius.xxl,
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  saveButtonText: {
    ...theme.typography.button,
    marginRight: 8,
  },
});
