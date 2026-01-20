import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Clear all AsyncStorage data
 * Use this to reset the app to initial state for testing
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
    return false;
  }
};

/**
 * Clear only authentication data
 */
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("hasSeenOnboarding");
    console.log("Auth data cleared successfully");
    return true;
  } catch (error) {
    console.error("Error clearing auth data:", error);
    return false;
  }
};

/**
 * View all stored data (for debugging)
 */
export const viewStorageData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);

    console.log("AsyncStorage Contents:");
    items.forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });

    return items;
  } catch (error) {
    console.error("Error viewing storage:", error);
    return [];
  }
};
