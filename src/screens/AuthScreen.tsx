import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Image,
} from "react-native";
import { styles } from "@/styles/auth.styles";
import { GoogleIcon } from "@/assets";

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

type AuthMode = "login" | "signup";

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = new Animated.Value(1);

  const handleModeSwitch = (mode: AuthMode) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setAuthMode(mode);
    // Clear form fields when switching
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
  };

  const handleAuth = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess();
    }, 1500);
  };

  const isSignupMode = authMode === "signup";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>$</Text>
            </View>
          </View>
          <Text style={styles.appName}>MoneyMaster</Text>
          <Text style={styles.tagline}>
            {isSignupMode
              ? "Start your financial journey"
              : "Manage your money with ease!"}
          </Text>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, authMode === "login" && styles.tabActive]}
            onPress={() => handleModeSwitch("login")}
          >
            <Text
              style={[
                styles.tabText,
                authMode === "login" && styles.tabTextActive,
              ]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, authMode === "signup" && styles.tabActive]}
            onPress={() => handleModeSwitch("signup")}
          >
            <Text
              style={[
                styles.tabText,
                authMode === "signup" && styles.tabTextActive,
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          {isSignupMode && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="student@university.edu"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          {isSignupMode && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
          )}

          {!isSignupMode && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              isLoading && styles.submitButtonDisabled,
            ]}
            onPress={handleAuth}
            disabled={isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading
                ? "Please wait..."
                : isSignupMode
                ? "Create Account"
                : "Sign In"}
            </Text>
          </TouchableOpacity>

          {/* Social Login Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.googleButton}>
              <Image source={GoogleIcon} style={styles.googleIcon} />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          {isSignupMode && (
            <Text style={styles.termsText}>
              By signing up, you agree to our{" "}
              <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          )}
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;
