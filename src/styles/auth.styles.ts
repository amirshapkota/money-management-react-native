import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.l,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: theme.spacing.m,
    marginTop: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "800", // Using bolder weight as per new theme
    color: theme.colors.text.white,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800", // Using bolder weight
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.s,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    fontWeight: "500",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.inputBg,
    borderRadius: theme.borderRadius.m,
    padding: 4,
    marginBottom: 32,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: theme.colors.surface,
    ...theme.shadows.small,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text.secondary,
  },
  tabTextActive: {
    color: theme.colors.text.primary,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "700", // Bolder labels
    color: "#374151", // Keep specific gray or use text.primary? Keeping slightly lighter for label
    marginBottom: theme.spacing.s,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.m,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: 14,
    fontSize: 16,
    color: theme.colors.text.primary,
    fontWeight: "500",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: "600",
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: theme.borderRadius.m,
    alignItems: "center",
    marginTop: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: theme.colors.text.white,
    fontSize: 17,
    fontWeight: "700", // Bolder button text
    letterSpacing: 0.3,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 28,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    fontSize: 14,
    color: theme.colors.text.light,
    marginHorizontal: theme.spacing.m,
    fontWeight: "500",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    ...theme.shadows.small,
  },

  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },

  googleText: {
    fontSize: 16,
    fontWeight: "600",
    color: theme.colors.text.primary,
    letterSpacing: 0.2,
  },

  termsText: {
    fontSize: 13,
    color: theme.colors.text.secondary,
    textAlign: "center",
    marginTop: 24,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  termsLink: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
});
