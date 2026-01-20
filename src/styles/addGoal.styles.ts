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
    fontSize: 20,
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
    paddingTop: theme.spacing.l,
  },

  // Goal Amount Section (similar to Transaction Amount)
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
    color: "#D1D5DB",
    marginRight: 4,
    fontWeight: "500",
    textAlignVertical: "center",
  },
  amountInput: {
    fontSize: 56,
    fontWeight: "800",
    color: theme.colors.text.primary,
    minWidth: 100,
    textAlign: "center",
    padding: 0,
  },

  // Input Fields
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
  iconContainer: {
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

  // Color Picker / Icon Picker specifically for goals
  colorPickerScroll: {
    flexDirection: "row",
    marginBottom: theme.spacing.l,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  colorOptionSelected: {
    borderColor: theme.colors.text.primary,
  },

  buttonContainer: {
    marginTop: "auto", // Push to bottom if content is short
  },
  createButton: {
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
  createButtonText: {
    ...theme.typography.button,
    marginRight: 8,
  },
});
