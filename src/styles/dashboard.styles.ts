import { StyleSheet, Dimensions, Platform } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom nav
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    paddingTop: Platform.OS === "android" ? 20 : 0,
    marginBottom: theme.spacing.l,
    marginTop: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: theme.spacing.m,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.xxl,
    backgroundColor: "#FFE4E6", // Light pink placeholder
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.status.success,
    borderWidth: 1.5,
    borderColor: theme.colors.background,
  },
  welcomeText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.text.secondary,
    fontWeight: "500",
    marginBottom: 2,
  },
  userName: {
    fontSize: theme.typography.subtitle.fontSize,
    color: theme.colors.text.primary,
    fontWeight: "700",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  // Balance Card
  balanceCard: {
    marginHorizontal: theme.spacing.l,
    padding: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    alignItems: "center",
    ...theme.shadows.medium,
    marginBottom: theme.spacing.l,
  },
  balanceLabel: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.s,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.m,
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.status.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.xl,
  },
  percentageText: {
    color: theme.colors.status.success,
    fontWeight: "600",
    fontSize: 13,
    marginRight: 4,
  },
  comparisonText: {
    color: theme.colors.text.light,
    fontSize: 13,
    marginLeft: 6,
  },

  // Income/Expense Row
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.l,
    gap: theme.spacing.m,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: theme.borderRadius.xxl,
    ...theme.shadows.medium,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.xl,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.m,
  },
  incomeIcon: {
    backgroundColor: theme.colors.status.successBg,
  },
  expenseIcon: {
    backgroundColor: theme.colors.status.errorBg,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },

  // Budget
  sectionContainer: {
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.l,
  },
  budgetCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xxl,
    padding: theme.spacing.l,
    ...theme.shadows.medium,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: theme.colors.text.light,
  },
  arrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  budgetAmounts: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  spentAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginRight: 8,
  },
  totalBudget: {
    fontSize: 15,
    color: theme.colors.text.light,
    fontWeight: "500",
  },
  progressBarBg: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: theme.spacing.m,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  budgetmessageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: theme.borderRadius.m,
  },
  budgetMessage: {
    fontSize: 13,
    color: "#64748B",
    flex: 1,
    marginLeft: 8,
    lineHeight: 18,
  },

  // Savings
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  viewAllText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  savingsList: {
    paddingLeft: theme.spacing.l,
    paddingRight: theme.spacing.s,
  },
  savingsCard: {
    width: 160,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.xxl,
    marginRight: theme.spacing.m,
    ...theme.shadows.medium,
  },
  newGoalCard: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0,
    elevation: 0,
  },
  addGoalButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    ...theme.shadows.small,
  },
  newGoalText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.light,
  },
  goalIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.l,
  },
  goalIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.m,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
  },
  percentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#EFF6FF",
    borderRadius: theme.borderRadius.m,
  },
  percentText: {
    fontSize: 11,
    fontWeight: "700",
    color: theme.colors.primary,
  },
  goalName: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  goalProgressBg: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
    marginBottom: 8,
  },
  goalProgressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  },
  goalAmountText: {
    fontSize: 12,
    color: theme.colors.text.light,
  },

  // Recent Activity
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.l,
    marginBottom: 12,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.small,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.l,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 13,
    color: theme.colors.text.light,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  amountNegative: {
    color: theme.colors.text.primary,
  },
  amountPositive: {
    color: theme.colors.status.success,
  },

  // Custom Bottom Nav
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    paddingVertical: 16,
    paddingBottom: Platform.OS === "ios" ? 32 : 16,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  fabButton: {
    top: -30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.medium, // Using medium shadow for FAB
    elevation: 6,
  },
});
