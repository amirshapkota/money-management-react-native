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
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: theme.colors.text.primary,
    fontFamily: "Inter_700Bold",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    ...theme.shadows.small,
  },

  // Profile Section
  profileCard: {
    backgroundColor: "#FFFFFF",
    margin: theme.spacing.l,
    borderRadius: 24,
    padding: theme.spacing.l,
    alignItems: "center",
    ...theme.shadows.medium,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 16,
  },
  proBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: "#EFF6FF",
    borderRadius: 20,
  },
  proText: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.primary,
  },

  // Section
  section: {
    marginTop: theme.spacing.l,
    paddingHorizontal: theme.spacing.l,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: theme.spacing.m,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: theme.spacing.s,
    ...theme.shadows.small,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },

  // Theme Selector
  themeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.m,
  },
  themeOption: {
    alignItems: "center",
    width: "30%",
  },
  themePreview: {
    width: "100%",
    aspectRatio: 1.5,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 8,
  },
  themeLabel: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },

  // General Controls
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing.m,
  },
  controlLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  controlSubtext: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    marginTop: 2,
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  // Logout
  logoutButton: {
    margin: theme.spacing.xl,
    padding: theme.spacing.l,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FECACA",
    backgroundColor: "#FEF2F2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
    marginLeft: 8,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#CBD5E1",
    marginBottom: 40,
  },
});
