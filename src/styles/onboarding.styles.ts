import { StyleSheet, Dimensions } from "react-native";
import { theme } from "@/constants/theme";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  skipText: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    fontWeight: "600", // Bolder
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: width * 0.85,
    height: height * 0.45,
    marginTop: 120,
    marginBottom: 40,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: theme.colors.inputBg,
    ...theme.shadows.medium,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "800", // Bolder 800 weight
    color: theme.colors.text.primary,
    textAlign: "center",
    marginBottom: theme.spacing.m,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 17,
    color: theme.colors.text.secondary,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 10,
    fontWeight: "500", // Slightly bolder body text
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.border,
    marginHorizontal: 6,
  },
  paginationDotActive: {
    backgroundColor: theme.colors.primary,
    width: 24,
    borderRadius: 5,
  },
  bottomContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: theme.borderRadius.l,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: theme.colors.text.white,
    fontSize: 18,
    fontWeight: "700", // Bolder button text
    letterSpacing: 0.5,
  },
});
