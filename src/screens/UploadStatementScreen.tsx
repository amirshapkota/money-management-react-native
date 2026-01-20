import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from "@expo/vector-icons";
import { styles } from "@/styles/uploadStatement.styles";
import { theme } from "@/constants/theme";

export default function UploadStatementScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: "transparent" }]}
          >
            <MaterialIcons
              name="more-horiz"
              size={24}
              color={theme.colors.text.light}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heroContainer}>
            <Text style={styles.heroTitle}>Upload {"\n"}Statement</Text>
            <Text style={styles.heroSubtitle}>
              Import your monthly transaction history for personalized financial
              insights.
            </Text>
          </View>

          <View style={styles.uploadCard}>
            <View style={styles.cloudCircle}>
              <Ionicons name="cloud-upload-outline" size={32} color="#FFF" />
            </View>
            <Text style={styles.uploadTitle}>Drag or Select File</Text>
            <Text style={styles.uploadDesc}>PDF, CSV, Excel • Max 10MB</Text>

            <TouchableOpacity style={styles.browseButton}>
              <Feather name="folder" size={20} color="#FFF" />
              <Text style={styles.browseText}>Browse Files</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.securityRow}>
            <View style={styles.badgeItem}>
              <MaterialIcons
                name="lock"
                size={16}
                color={theme.colors.status.success}
              />
              <Text style={styles.badgeText}>ENCRYPTED</Text>
            </View>
            <View style={styles.badgeItem}>
              <MaterialIcons name="auto-awesome" size={16} color="#A855F7" />
              <Text style={styles.badgeText}>AI PARSING</Text>
            </View>
            <View style={styles.badgeItem}>
              <MaterialIcons name="flash-on" size={16} color="#F97316" />
              <Text style={styles.badgeText}>INSTANT</Text>
            </View>
          </View>

          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent Analysis</Text>
            <TouchableOpacity>
              <MaterialIcons
                name="history"
                size={20}
                color={theme.colors.text.light}
              />
            </TouchableOpacity>
          </View>

          {/* Recent Item 1 */}
          <TouchableOpacity style={styles.recentItem}>
            <View style={styles.fileIconBox}>
              <FontAwesome5 name="file-pdf" size={24} color="#F43F5E" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>Chase_Oct_2023.pdf</Text>
              <View style={styles.fileFooter}>
                <Text style={styles.fileMeta}>Today, 10:23 AM</Text>
                <Text
                  style={[
                    styles.fileMeta,
                    { color: theme.colors.text.primary, fontWeight: "600" },
                  ]}
                >
                  243 Transactions
                </Text>
              </View>
            </View>
            <View style={styles.tagContainer}>
              <View
                style={[styles.statusBadge, { backgroundColor: "#DCFCE7" }]}
              >
                <Text style={[styles.statusText, { color: "#16A34A" }]}>
                  DONE
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Recent Item 2 */}
          <TouchableOpacity style={styles.recentItem}>
            <View style={styles.fileIconBox}>
              <FontAwesome5 name="file-csv" size={24} color="#10B981" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>Venmo_Export.csv</Text>
              <Text style={styles.fileMeta}>Yesterday</Text>
            </View>
            <View style={styles.tagContainer}>
              <View
                style={[styles.statusBadge, { backgroundColor: "#DBEAFE" }]}
              >
                <Text style={[styles.statusText, { color: "#3B82F6" }]}>
                  PARSING
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Recent Item 3 */}
          <TouchableOpacity style={styles.recentItem}>
            <View style={styles.fileIconBox}>
              <FontAwesome5 name="file-alt" size={24} color="#94A3B8" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName}>WellsFargo_Sep.pdf</Text>
              <View style={styles.fileFooter}>
                <Text style={styles.fileMeta}>Sep 30, 2023</Text>
                <Text style={styles.fileMeta}>1.2 MB</Text>
              </View>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={theme.colors.text.light}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
