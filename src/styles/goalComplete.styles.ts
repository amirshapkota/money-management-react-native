import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Slightly off-white background
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.l,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },

  // Hero Section
  heroSection: {
    alignItems: "center",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  trophyContainer: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.l,
    position: "relative",
  },
  trophyCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FEF3C7", // Light gold border
    ...theme.shadows.large,
  },
  trophyIcon: {
    // Icon styling
  },
  goalMetBadge: {
    position: "absolute",
    bottom: 20,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    ...theme.shadows.medium,
  },
  goalMetText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  congratsText: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
    marginTop: 10,
  },
  congratsSubText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  highlightText: {
    color: theme.colors.text.primary,
    fontWeight: "700",
  },

  // Summary Card
  summaryCard: {
    marginHorizontal: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    padding: theme.spacing.l,
    ...theme.shadows.medium,
  },
  goalHeader: {
    flexDirection: "row",
    marginBottom: theme.spacing.l,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  goalDetails: {
    flex: 1,
  },
  goalLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  savedSection: {
    alignItems: "flex-end",
  },
  savedAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.status.success,
  },
  datesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.m,
  },
  dateLabel: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  dateValue: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "500",
    marginTop: 2,
  },
  successBar: {
    height: 8,
    backgroundColor: theme.colors.status.success,
    borderRadius: 4,
    marginBottom: theme.spacing.l,
  },
  completeBadge: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: theme.spacing.l,
  },
  completeText: {
    color: theme.colors.status.success,
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },
  shareRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.m,
  },
  avatarsGroup: {
    flexDirection: "row",
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    borderWidth: 2,
    borderColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -10, // Overlap
  },
  avatarText: {
    fontSize: 10,
    color: theme.colors.secondary,
    fontWeight: "600",
  },
  shareBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  shareBtnText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
  },
});
