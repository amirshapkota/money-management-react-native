import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: {
    ...theme.typography.h2, // 24px, 800 weight
    color: theme.colors.text.primary,
  },

  // ...

  totalAmount: {
    ...theme.typography.display, // 36px, 800 weight
    fontSize: 32, // slight adjust if needed, but keeping weight 800
    color: theme.colors.text.primary,
  },

  // ...

  statValue: {
    fontSize: 18,
    fontWeight: "800", // Make stat values very bold
    color: theme.colors.text.primary,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  calendarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE4E6",
  },

  // Segmented Control
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.inputBg,
    marginHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.xl,
    padding: 4,
    marginBottom: 24,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 16,
  },
  segmentButtonActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.secondary,
  },
  segmentTextActive: {
    color: theme.colors.text.primary,
  },

  // Main Chart Card
  mainCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    marginHorizontal: theme.spacing.l,
    padding: 24,
    marginBottom: 24,
    ...theme.shadows.medium,
  },
  totalLabel: {
    fontSize: 14,
    color: theme.colors.text.light,
    marginBottom: 4,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  trendContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  trendBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.status.errorBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.status.error,
    marginLeft: 4,
  },
  trendComparison: {
    fontSize: 11,
    color: theme.colors.text.light,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.l,
    gap: 16,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    padding: 20,
    borderRadius: 24,
    ...theme.shadows.medium,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  shoppingIcon: {
    backgroundColor: "#FFF7ED",
  },
  dailyIcon: {
    backgroundColor: "#EFF6FF",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700", // Increased from 600
    color: theme.colors.text.secondary,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statSubValue: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },
  orangeText: {
    color: "#F97316",
  },
  purpleText: {
    color: "#6366F1",
  },

  // Spending Breakdown
  breakdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  breakdownCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.l,
    borderRadius: 32,
    padding: 24,
    ...theme.shadows.medium,
  },
  donutContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  legendContainer: {
    flex: 1,
    marginLeft: 24,
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  legendPercent: {
    fontSize: 13,
    color: theme.colors.text.primary,
    fontWeight: "600",
  },

  // Category List
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  shoppingBg: { backgroundColor: "#EFF6FF" },
  foodBg: { backgroundColor: "#FCE7F3" },
  billsBg: { backgroundColor: theme.colors.status.successBg },
  transportBg: { backgroundColor: "#FFF7ED" },

  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: theme.colors.border,
    borderRadius: 3,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
