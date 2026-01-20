import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Very light gray bg
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.m,
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

  // Hero Text
  heroContainer: {
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },

  // Upload Box
  uploadCard: {
    marginHorizontal: theme.spacing.l,
    backgroundColor: theme.colors.surface,
    borderRadius: 32,
    padding: theme.spacing.xl,
    alignItems: "center",
    marginBottom: theme.spacing.xl,
    ...theme.shadows.medium,
  },
  cloudCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.l,
    ...theme.shadows.large, // Glow effect
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 4,
  },
  uploadDesc: {
    fontSize: 14,
    color: theme.colors.text.light,
    marginBottom: theme.spacing.xl,
  },
  browseButton: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  browseText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 12,
  },

  // Security Badges
  securityRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: theme.spacing.xl,
  },
  badgeItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: theme.colors.text.secondary,
    marginLeft: 6,
    textTransform: "uppercase",
  },

  // Recent List
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },

  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    marginHorizontal: theme.spacing.l,
    marginBottom: theme.spacing.m,
    borderRadius: 20,
    ...theme.shadows.small,
  },
  fileIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing.m,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginBottom: 2,
  },
  fileMeta: {
    fontSize: 12,
    color: theme.colors.text.light,
  },
  fileFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
  },
  tagContainer: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
  },
  progressContainer: {
    width: 80,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#3B82F6",
    borderRadius: 2,
    marginBottom: 2,
  },
});
