import { StyleSheet, Dimensions, Platform } from "react-native";
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
    paddingTop: Platform.OS === "android" ? 40 : theme.spacing.xl,
    paddingBottom: theme.spacing.m,
    // Removed background color as requested
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },

  // Groups List
  groupListContent: {
    padding: theme.spacing.l,
    paddingBottom: 100,
  },
  groupCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    ...theme.shadows.small,
  },
  groupIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  groupArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  // FAB
  fab: {
    position: "absolute",
    right: 24,
    bottom: 34,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.medium,
  },

  // Create/Add Screens
  formContainer: {
    padding: theme.spacing.l,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.text.secondary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: theme.colors.text.primary,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  memberInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderStyle: "dashed",
    marginTop: 8,
  },
  addText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors.primary,
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 24,
    ...theme.shadows.medium,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Detail Screen
  netBalanceCard: {
    margin: theme.spacing.l,
    padding: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    alignItems: "center",
    ...theme.shadows.large,
  },
  avatarsRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginHorizontal: -8,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.text.secondary,
  },
  netBalanceLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  netBalanceValue: {
    fontSize: 40,
    fontWeight: "800",
    color: theme.colors.text.primary,
    marginBottom: 12,
    letterSpacing: -1,
  },
  oweBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
  },
  oweText: {
    fontSize: 12,
    fontWeight: "700",
  },
  actionButtonsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 16,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  settleButton: {
    backgroundColor: "#111827",
  },
  totalsButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },

  // Sections
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginRight: 10,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontSize: 10,
    fontWeight: "700",
  },

  // Cards
  personCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 24,
    marginHorizontal: theme.spacing.l,
    marginBottom: 12,
    ...theme.shadows.small,
  },
  personAvatar: {
    width: 50,
    height: 50,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  lastActivity: {
    fontSize: 12,
    color: theme.colors.text.light,
    textTransform: "uppercase",
    // Fix for lint error: lastActivity prop exists in View but not Text style?
    // Actually this is a Text style.
  },
  amountBlock: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  actionTextSmall: {
    fontSize: 11,
    fontWeight: "600",
    color: theme.colors.text.light,
  },

  // Recent Activity
  activityTopper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginTop: 24,
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.primary,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 24,
    marginHorizontal: theme.spacing.l,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
  activityLabel: {
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  activityAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  // Re-adding activityAmountBlock as it was used in Detail Screen and flagged by linter
  activityAmountBlock: {
    alignItems: "flex-end",
  },
});
