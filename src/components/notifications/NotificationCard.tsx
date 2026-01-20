import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/styles/notifications.styles";

interface NotificationCardProps {
  type: "attention" | "achievement" | "small";
  icon: string;
  iconColor: string;
  iconBgColor: string;
  title: string;
  time: string;
  description: string;
  sideStripColor?: string;
  highlightText?: string;
  highlightColor?: string;
  progress?: number;
  progressColor?: string;
  progressBgColor?: string;
  primaryAction?: {
    label: string;
    onPress: () => void;
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  textAction?: {
    label: string;
    onPress: () => void;
    color: string;
  };
}

export const NotificationCard = ({
  type,
  icon,
  iconColor,
  iconBgColor,
  title,
  time,
  description,
  sideStripColor,
  highlightText,
  highlightColor,
  progress,
  progressColor,
  progressBgColor,
  primaryAction,
  secondaryAction,
  textAction,
}: NotificationCardProps) => {
  if (type === "small") {
    return (
      <View style={styles.smallCard}>
        <View style={[styles.smallIcon, { backgroundColor: iconBgColor }]}>
          <Ionicons name={icon as any} size={20} color={iconColor} />
        </View>
        <View style={styles.smallContent}>
          <Text style={styles.smallTitle}>{title}</Text>
          <Text style={styles.smallDesc}>{description}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontSize: 11, color: "#94A3B8" }}>{time}</Text>
          {textAction && (
            <Ionicons
              name="chevron-forward"
              size={14}
              color="#CBD5E1"
              style={{ marginTop: 4 }}
            />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {sideStripColor && (
        <View style={[styles.sideStrip, { backgroundColor: sideStripColor }]} />
      )}

      <View style={{ paddingLeft: sideStripColor ? 8 : 0 }}>
        <View style={styles.cardHeader}>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.cardIcon, { backgroundColor: iconBgColor }]}>
              <Ionicons name={icon as any} size={24} color={iconColor} />
            </View>
            <View>
              <Text style={styles.cardTitle}>{title}</Text>
              <Text style={styles.cardTime}>{time}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.cardDescription}>
          {description.split(highlightText || "")[0]}
          {highlightText && (
            <Text
              style={[
                styles.highlightText,
                highlightColor ? { color: highlightColor } : {},
              ]}
            >
              {highlightText}
            </Text>
          )}
          {description.split(highlightText || "")[1]}
        </Text>

        {progress !== undefined && progressColor && progressBgColor && (
          <View
            style={[
              styles.progressContainer,
              { backgroundColor: progressBgColor },
            ]}
          >
            <View
              style={[
                styles.progressBar,
                { width: `${progress}%`, backgroundColor: progressColor },
              ]}
            />
          </View>
        )}

        {(primaryAction || secondaryAction) && (
          <View style={styles.actionRow}>
            {primaryAction && (
              <TouchableOpacity
                style={styles.primaryAction}
                onPress={primaryAction.onPress}
              >
                <Text style={styles.primaryActionText}>
                  {primaryAction.label}
                </Text>
              </TouchableOpacity>
            )}
            {secondaryAction && (
              <TouchableOpacity
                style={styles.secondaryAction}
                onPress={secondaryAction.onPress}
              >
                <Text style={styles.secondaryActionText}>
                  {secondaryAction.label}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {textAction && (
          <TouchableOpacity
            style={styles.textAction}
            onPress={textAction.onPress}
          >
            <Text style={styles.textActionLabel}>{textAction.label}</Text>
            <Ionicons name="arrow-forward" size={14} color={textAction.color} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
