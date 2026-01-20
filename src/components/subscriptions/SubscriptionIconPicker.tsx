import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

const SUBSCRIPTION_ICONS = [
  // Streaming & Entertainment
  { name: "Netflix", icon: "netflix", color: "#E50914", category: "Streaming" },
  { name: "Spotify", icon: "spotify", color: "#1DB954", category: "Streaming" },
  { name: "YouTube", icon: "youtube", color: "#FF0000", category: "Streaming" },
  { name: "Twitch", icon: "twitch", color: "#9146FF", category: "Streaming" },
  { name: "Music", icon: "music", color: "#8B5CF6", category: "Streaming" },
  { name: "Video", icon: "video", color: "#F59E0B", category: "Streaming" },
  { name: "TV", icon: "television", color: "#EC4899", category: "Streaming" },

  // Tech & Software
  { name: "Apple", icon: "apple", color: "#000000", category: "Tech" },
  { name: "Microsoft", icon: "microsoft", color: "#00A4EF", category: "Tech" },
  { name: "Google", icon: "google", color: "#4285F4", category: "Tech" },
  {
    name: "Google Drive",
    icon: "google-drive",
    color: "#21a363",
    category: "Tech",
  },
  { name: "GitHub", icon: "github", color: "#181717", category: "Tech" },

  // Productivity
  {
    name: "Notion",
    icon: "notebook-outline",
    color: "#000000",
    category: "Productivity",
  },
  {
    name: "Evernote",
    icon: "evernote",
    color: "#00A82D",
    category: "Productivity",
  },
  {
    name: "Dropbox",
    icon: "dropbox",
    color: "#0061FF",
    category: "Productivity",
  },
  { name: "Slack", icon: "slack", color: "#4A154B", category: "Productivity" },
  {
    name: "LinkedIn",
    icon: "linkedin",
    color: "#0A66C2",
    category: "Productivity",
  },
  { name: "Email", icon: "email", color: "#0EA5E9", category: "Productivity" },

  // Communication
  {
    name: "Discord",
    icon: "message-text",
    color: "#5865F2",
    category: "Communication",
  },
  { name: "Phone", icon: "phone", color: "#14B8A6", category: "Communication" },
  {
    name: "Internet",
    icon: "wifi",
    color: "#06B6D4",
    category: "Communication",
  },
  {
    name: "VPN",
    icon: "shield-lock",
    color: "#DC2626",
    category: "Communication",
  },

  // Shopping & Delivery
  { name: "Amazon", icon: "shopping", color: "#FF9900", category: "Shopping" },
  {
    name: "Food Delivery",
    icon: "food",
    color: "#84CC16",
    category: "Shopping",
  },
  { name: "Shopping", icon: "cart", color: "#A855F7", category: "Shopping" },

  // Health & Fitness
  { name: "Gym", icon: "dumbbell", color: "#EF4444", category: "Health" },
  { name: "Health", icon: "heart-pulse", color: "#EF4444", category: "Health" },

  // Entertainment & Media
  {
    name: "Gaming",
    icon: "gamepad-variant",
    color: "#10B981",
    category: "Entertainment",
  },
  {
    name: "News",
    icon: "newspaper",
    color: "#6B7280",
    category: "Entertainment",
  },
  {
    name: "Magazine",
    icon: "book-open-variant",
    color: "#F97316",
    category: "Entertainment",
  },

  // AI & Technology
  { name: "ChatGPT", icon: "robot", color: "#10A37F", category: "AI" },

  // Education & Learning
  {
    name: "Education",
    icon: "school",
    color: "#7C3AED",
    category: "Education",
  },

  // Financial
  {
    name: "Insurance",
    icon: "shield-check",
    color: "#22C55E",
    category: "Financial",
  },

  // Cloud & Storage
  { name: "Cloud Storage", icon: "cloud", color: "#3B82F6", category: "Cloud" },

  // Other
  {
    name: "Other",
    icon: "dots-horizontal",
    color: "#6B7280",
    category: "Other",
  },
];

interface SubscriptionIconPickerProps {
  visible: boolean;
  selectedIcon: string;
  onSelect: (icon: string, color: string) => void;
  onClose: () => void;
}

export const SubscriptionIconPicker: React.FC<SubscriptionIconPickerProps> = ({
  visible,
  selectedIcon,
  onSelect,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = SUBSCRIPTION_ICONS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelect = (icon: string, color: string) => {
    onSelect(icon, color);
    setSearchQuery("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Select Icon</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Feather name="x" size={24} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color={theme.colors.text.secondary}
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search icons..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.colors.text.light}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.gridContainer}
          showsVerticalScrollIndicator={false}
        >
          {(() => {
            // Group icons by category
            const categorizedIcons: Record<string, typeof filteredIcons> = {};
            filteredIcons.forEach((item) => {
              const category = item.category || "Other";
              if (!categorizedIcons[category]) {
                categorizedIcons[category] = [];
              }
              categorizedIcons[category].push(item);
            });

            // Render categories with their icons
            return Object.entries(categorizedIcons).map(([category, icons]) => (
              <View key={category} style={{ width: "100%" }}>
                <Text style={styles.categoryHeader}>{category}</Text>
                <View style={styles.categoryGrid}>
                  {icons.map((item) => {
                    const isSelected = selectedIcon === item.icon;
                    return (
                      <TouchableOpacity
                        key={item.icon}
                        style={[
                          styles.iconCard,
                          isSelected && {
                            backgroundColor: theme.colors.primary + "15",
                            borderColor: theme.colors.primary,
                            borderWidth: 2,
                          },
                        ]}
                        onPress={() => handleSelect(item.icon, item.color)}
                      >
                        <View
                          style={[
                            styles.iconCircle,
                            { backgroundColor: item.color + "20" },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name={item.icon as any}
                            size={28}
                            color={item.color}
                          />
                        </View>
                        <Text
                          style={[
                            styles.iconName,
                            isSelected && { color: theme.colors.primary },
                          ]}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ));
          })()}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: theme.spacing.s,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: theme.spacing.l,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
  },
  gridContainer: {
    padding: theme.spacing.m,
    paddingBottom: 40,
  },
  categoryHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: theme.colors.text.primary,
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
    marginLeft: theme.spacing.xs,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconCard: {
    width: "31%",
    aspectRatio: 1,
    margin: "1%",
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.s,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.xs,
  },
  iconName: {
    fontSize: 11,
    fontWeight: "500",
    color: theme.colors.text.secondary,
    textAlign: "center",
  },
});
