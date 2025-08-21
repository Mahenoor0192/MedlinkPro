import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { registerUser } from "../api/auth";


export default function UserInfoScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
//   const router = useRouter();

//   const handleRegister = async () => {
//     try {
//       const data = await registerUser(username, password, address);
//       await AsyncStorage.setItem("token", data.token);
//       console.log("✅ Registered & token saved:", data.token);
//       router.replace("/(tabs)/HomeScreen");
//     } catch (error: any) {
//       alert("Register failed: " + (error.response?.data?.detail || error.message));
//     }
//   };

  const handleContinue = () => {
    if (!username.trim() || !password.trim() || !address.trim()) {
      alert("Please fill all fields");
      return;
    }
    router.push("/auth/FormScreen");
  };

  return (
    <LinearGradient colors={["#0DB1E8", "#11C0B2"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1, justifyContent: "center" }}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3209/3209265.png" }}
            style={styles.heroIcon}
          />
          <Text style={styles.title}>Create Your Profile</Text>
          <Text style={styles.subtitle}>
            Enter your details to continue booking appointments
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.form}>
          <View style={styles.inputBox}>
            <Ionicons name="person-circle-outline" size={20} color="#0284C5" />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={20} color="#0284C5" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputBox}>
            <Ionicons name="location-outline" size={20} color="#0284C5" />
            <TextInput
              placeholder="Address"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={address}
              onChangeText={setAddress}
            />
          </View>

          {/* Continue Button */}
          <TouchableOpacity onPress={handleContinue} activeOpacity={0.9}>
            <LinearGradient
              colors={["#0284C5", "#0DB1E8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.ctaBtn}
            >
              <Text style={styles.ctaText}>Continue</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 24,
  },
  heroIcon: { width: 90, height: 90, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "800", color: "#fff" },
  subtitle: {
    fontSize: 14,
    color: "#E0F7FD",
    textAlign: "center",
    marginTop: 6,
  },

  form: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 14,
    height: 50,
    backgroundColor: "#F9FAFB",
  },
  input: { flex: 1, marginLeft: 10, fontSize: 14, color: "#111827" },

  ctaBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    gap: 6,
    shadowColor: "#0284C5",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
