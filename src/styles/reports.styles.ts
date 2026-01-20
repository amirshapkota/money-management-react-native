import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.m,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text.light,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    ...theme.shadows.small,
  },

  // Month Chips
  monthScroll: {
    marginTop: 16,
    marginBottom: 24,
  },
  monthScrollContent: {
    paddingHorizontal: theme.spacing.l,
  },
  monthChip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  activeMonthChip: {
    backgroundColor: "#1E293B", // Dark slate
    borderColor: "#1E293B",
  },
  monthText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.secondary,
  },
  activeMonthText: {
    color: "#FFFFFF",
  },

  // Report Types
  typeScroll: {
    marginBottom: 24,
  },
  typeScrollContent: {
    paddingHorizontal: theme.spacing.l,
    gap: 12,
  },
  reportTypeCard: {
    width: 150,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    ...theme.shadows.small,
  },
  activeReportType: {
    backgroundColor: "#EFF6FF", // Light Blue
    borderColor: "#3B82F6",
    borderWidth: 2,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  activeReportIcon: {
    backgroundColor: "#3B82F6",
  },
  reportName: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text.primary,
    lineHeight: 20,
  },
  activeReportText: {
    color: "#1E293B",
  },

  // Smart Statement Card
  statementCard: {
    marginHorizontal: theme.spacing.l,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    ...theme.shadows.medium,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIcon: {
    width: 32,
    height: 32,
    backgroundColor: "#0F172A",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    transform: [{ rotate: "15deg" }],
  },
  brandText: {
    fontWeight: "800",
    fontSize: 16,
    color: theme.colors.text.primary,
    letterSpacing: -0.5,
  },
  tagBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
  },
  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: theme.colors.text.secondary,
    textTransform: "uppercase",
  },

  // Statement Content
  balanceSection: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 12,
    color: theme.colors.text.light,
    textTransform: "uppercase",
    fontWeight: "700",
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 36,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -1,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    padding: 12,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
  },
  summaryLabel: {
    fontSize: 11,
    color: theme.colors.text.light,
    marginBottom: 4,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },

  // Breakdown
  breakdownSection: {
    marginBottom: 24,
  },
  breakdownRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.secondary,
  },
  categoryValue: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },

  // Footer
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontSize: 11,
    color: theme.colors.text.light,
    fontWeight: "500",
  },

  // Actions
  floatingActionBar: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: "#1E293B",
    padding: 8,
    borderRadius: 24,
    ...theme.shadows.large,
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainActionBtn: {
    flex: 1,
    backgroundColor: "#3B82F6",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    marginRight: 8,
  },
  mainActionText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryActionBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
