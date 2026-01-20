import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

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
    paddingTop: theme.spacing.l,
    paddingBottom: theme.spacing.m,
  },
  headerTitleContainer: {
    alignItems: "center",
  },
  headerOverline: {
    fontSize: 10,
    color: theme.colors.text.light,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text.primary,
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
  scrollContent: {
    paddingBottom: theme.spacing.xl,
  },
  // Balance Card
  balanceCard: {
    marginHorizontal: theme.spacing.l,
    padding: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: 32, // Large rounded corners as per design
    alignItems: "center",
    ...theme.shadows.medium,
    marginBottom: theme.spacing.xl,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.m,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  walletIcon: {
    marginRight: 8,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceAmount: {
    fontSize: 42, // Large font for balance
    fontWeight: "800",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  balanceDecimal: {
    fontSize: 24,
    color: "#9CA3AF",
  },
  growthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.l,
  },
  growthText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.status.success,
    marginLeft: 4,
  },
  balanceStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: theme.spacing.m,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },

  // Goals List
  sectionTitle: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginLeft: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  goalsList: {
    paddingHorizontal: theme.spacing.l,
  },
  goalCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.l,
    ...theme.shadows.small,
  },
  goalHeader: {
    flexDirection: "row",
    marginBottom: theme.spacing.l,
  },
  goalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  goalInfo: {
    flex: 1,
    justifyContent: "center",
  },
  goalName: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  goalCategory: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  goalAmounts: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  currentAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  targetAmount: {
    fontSize: 13,
    color: theme.colors.text.light,
    marginTop: 2,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.text.secondary,
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: theme.spacing.l,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 5,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  depositButton: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.l,
  },
  depositText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },

  // Custom for specific gradients or backgrounds if needed
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  // Add Button Floating (if needed)
  fabContainer: {
    position: "absolute",
    right: theme.spacing.l,
    bottom: theme.spacing.xl, // Adjust based on tab bar
  },
});
