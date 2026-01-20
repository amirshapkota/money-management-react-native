import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/insights.styles";

interface TimeRangeSelectorProps {
  activeSegment: string;
  onSegmentChange: (segment: string) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  activeSegment,
  onSegmentChange,
}) => {
  return (
    <View style={styles.segmentContainer}>
      {["This Month", "Last Month"].map((segment) => (
        <TouchableOpacity
          key={segment}
          style={[
            styles.segmentButton,
            activeSegment === segment && styles.segmentButtonActive,
          ]}
          onPress={() => onSegmentChange(segment)}
        >
          <Text
            style={[
              styles.segmentText,
              activeSegment === segment && styles.segmentTextActive,
            ]}
          >
            {segment}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
