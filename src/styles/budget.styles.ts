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

  // Month Tabs
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: theme.colors.secondary, // Dark Blue/Black
  },
  tabText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Main Card
  summaryCard: {
    margin: theme.spacing.l,
    padding: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    ...theme.shadows.medium,
  },
  balanceTitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.l,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: "800",
    color: theme.colors.text.primary,
  },
  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F46E5",
    marginLeft: 4,
  },
  spendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  spendText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "600",
  },
  limitText: {
    fontSize: 13,
    color: theme.colors.text.light,
  },
  mainProgressBarBg: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    marginBottom: theme.spacing.m,
    overflow: "hidden",
  },
  mainProgressBarFill: {
    height: "100%",
    backgroundColor: theme.colors.secondary, // Dark fill
    borderRadius: 4,
  },
  periodRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  periodText: {
    fontSize: 10,
    color: theme.colors.text.light,
    textTransform: "uppercase",
  },

  // Categories
  categoriesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  sortByText: {
    fontSize: 14,
    color: "#3B82F6",
    fontWeight: "600",
  },
  categoryList: {
    paddingHorizontal: theme.spacing.l,
    paddingBottom: 100,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: 24,
    marginBottom: theme.spacing.m,
    ...theme.shadows.small,
  },
  progressCircleContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
    position: "relative",
  },
  categoryIcon: {
    position: "absolute",
    // Center icon
  },
  categoryInfo: {
    flex: 1,
  },
  catName: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  catSubtitle: {
    fontSize: 12,
    color: theme.colors.text.light,
  },
  amountInfo: {
    alignItems: "flex-end",
  },
  catAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  catLeftWarning: {
    // "Near Limit" etc
    fontSize: 11,
    fontWeight: "600",
  },
  catLeftText: {
    fontSize: 12,
    color: theme.colors.text.light,
  },

  // New Category Button
  newCategoryContainer: {
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderStyle: "dashed",
    borderRadius: 24,
    padding: theme.spacing.m,
    alignItems: "center",
  },
  newCategoryBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  newCategoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.secondary,
    marginLeft: 8,
  },
});
