import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    ...theme.typography.h3, // Now 700, 20px
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.inputBg,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },
  filterButton: {
    padding: 8,
    backgroundColor: theme.colors.surface,
    borderRadius: 10,
    marginLeft: 12,
    ...theme.shadows.small,
  },
  filtersRow: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.l,
    paddingVertical: 16,
    alignItems: "center",
    maxHeight: 70,
  },
  activeFilterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    ...theme.shadows.small,
  },
  activeFilterText: {
    color: theme.colors.text.white,
    fontSize: 13,
    fontWeight: "600",
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterPillText: {
    color: theme.colors.text.secondary,
    fontWeight: "500",
    fontSize: 13,
    marginLeft: 6,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.l,
    marginBottom: 12,
    marginTop: 4,
  },
  resultsCount: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  resultsCountBold: {
    color: theme.colors.text.primary,
    fontWeight: "800", // Bolder
  },
  clearButtonText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors.text.light,
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 16,
    paddingHorizontal: theme.spacing.l,
    textTransform: "uppercase",
  },
  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.l,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    ...theme.shadows.small,
    borderWidth: 1,
    borderColor: theme.colors.background,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    backgroundColor: theme.colors.secondary,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700", // Increased from 600
    color: theme.colors.text.primary,
    marginBottom: 6,
  },
  itemTags: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagContainer: {
    backgroundColor: "#FFF7ED", // Specific tag color kept inline for now
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 8,
  },
  tagText: {
    fontSize: 10,
    color: "#EA580C",
    fontWeight: "700", // Bolder
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.text.light,
    fontWeight: "500",
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "800", // Increased from 700
    color: theme.colors.text.primary,
  },
});
