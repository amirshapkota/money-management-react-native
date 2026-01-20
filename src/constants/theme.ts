export const theme = {
  colors: {
    primary: "#3B82F6", // Blue
    secondary: "#111827", // Dark Blue/Black
    background: "#F9FAFB", // Light Gray BG
    surface: "#FFFFFF", // White Surface (Cards)

    text: {
      primary: "#111827",
      secondary: "#6B7280",
      light: "#9CA3AF",
      white: "#FFFFFF",
      success: "#10B981",
      error: "#EF4444",
    },

    border: "#F3F4F6", // Light border
    inputBg: "#F3F4F6",

    status: {
      success: "#10B981",
      successBg: "#ECFDF5",
      error: "#EF4444",
      errorBg: "#FEF2F2",
      warning: "#F59E0B",
      info: "#3B82F6",
    },
  },

  typography: {
    display: {
      fontSize: 36,
      fontWeight: "800" as "800",
      lineHeight: 44,
      color: "#111827",
    },
    h1: {
      fontSize: 28,
      fontWeight: "800" as "800", // Increased to 800 to match user preference for bolder
      lineHeight: 34,
      color: "#111827",
    },
    h2: {
      fontSize: 24,
      fontWeight: "700" as "700",
      lineHeight: 29,
      color: "#111827",
    },
    h3: {
      fontSize: 20,
      fontWeight: "700" as "700",
      lineHeight: 24,
      color: "#111827",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "700" as "700", // Increased from 600
      color: "#111827",
    },
    body: {
      fontSize: 14,
      color: "#6B7280",
      lineHeight: 20,
      fontWeight: "500" as "500", // Base weight
    },
    caption: {
      fontSize: 12,
      color: "#9CA3AF",
      fontWeight: "500" as "500",
    },
    button: {
      fontSize: 16,
      fontWeight: "700" as "700", // Bolder buttons
      color: "#FFFFFF",
    },
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
  },

  borderRadius: {
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
    circle: 999,
  },

  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 8,
    },
  },
};
