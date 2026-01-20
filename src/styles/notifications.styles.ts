import { StyleSheet, Platform } from "react-native";
import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    paddingHorizontal: theme.spacing.l,
    paddingTop: Platform.OS === "android" ? 40 : theme.spacing.xl,
    paddingBottom: theme.spacing.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text.primary,
    fontFamily: "Inter_700Bold",
  },
  readAllButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#111827", // Dark button for contrast
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },

  // Filters
  filterContainer: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: theme.spacing.m,
  },
  filterItem: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  activeFilterItem: {
    backgroundColor: "#111827",
    borderColor: "#111827",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.secondary,
  },
  activeFilterText: {
    color: "#FFFFFF",
  },

  // Sections
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  newBadge: {
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  newBadgeText: {
    color: "#EF4444",
    fontSize: 11,
    fontWeight: "700",
  },

  // Notification Cards
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: theme.spacing.l,
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  cardTime: {
    fontSize: 12,
    color: "#94A3B8",
  },
  cardDescription: {
    fontSize: 15,
    color: theme.colors.text.secondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  highlightText: {
    color: theme.colors.text.primary,
    fontWeight: "700",
  },

  // Progress Bar for Achievements
  progressContainer: {
    height: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },

  // Actions
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  primaryAction: {
    backgroundColor: "#111827",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 12,
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  secondaryAction: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  secondaryActionText: {
    color: theme.colors.text.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  textAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  textActionLabel: {
    color: "#F97316", // Orange color from design
    fontWeight: "700",
    fontSize: 14,
    marginRight: 4,
  },

  // Earlier List Item (Small Card)
  smallCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: theme.spacing.m,
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.s,
    borderRadius: 20,
    ...theme.shadows.small,
  },
  smallIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  smallContent: {
    flex: 1,
  },
  smallTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  smallDesc: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },

  // Side Strip
  sideStrip: {
    position: "absolute",
    left: 0,
    top: 24,
    bottom: 24,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
