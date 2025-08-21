import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { loginUser } from "../api/auth";

export default function Login() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const [error, setError] = useState('');
  // const router = useRouter();

  // const handleLogin = async () => {
  //   try {
  //     const data = await loginUser(username, password);
  //     await AsyncStorage.setItem("token", data.token);
  //     console.log("✅ Token saved:", data.token);
  //     router.replace("/(tabs)/HomeScreen");
  //   } catch (error: any) {
  //     alert("Login failed: " + (error.response?.data?.detail || error.message));
  //   }
  // };

  const handleContinue = () => {
    const cleanedPhone = phone.replace(/\D/g, ""); // Remove non-digit characters

    if (!isValidPhone(cleanedPhone)) {
      setError("Enter a valid 10-digit mobile number!");
      return;
    }
    setError("");
    router.push({ pathname: "/auth/Verify", params: { phone: cleanedPhone } });
  };
  const isValidPhone = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and has exactly 10 digits
    return phoneRegex.test(number);
  };

  return (
    <LinearGradient
      colors={["#0284C5", "#11C0B2"]} // Gradient background
      style={styles.gradientBackground}
    >
      <Image
        source={require("../../assets/images/doctor.png")}
        style={styles.doctorimage}
      />
      <Image
        source={require("../../assets/images/star.png")}
        style={styles.starimage}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Welcome to MedlinkPro</Text>
        <Text style={styles.subtitle}>
          Enter your phone number below to create your account or login
        </Text>

        <View
          style={[styles.inputContainer, error ? styles.errorBorder : null]}
        >
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="0000-000-000"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {/* Gradient Button */}
        <Pressable style={styles.buttonWrapper} onPress={handleContinue}>
          <LinearGradient
            colors={["#0284C5", "#11C0B2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButton}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  doctorimage: {
    width: 160,
    height: 233,
    marginTop: 80,
    right: 0,
    top: 10,
  },
  starimage: {
    width: 360,
    height: 360,
    top: -100,
    right: -100,
    position: "absolute",
  },
  card: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 50,
    marginTop: 0,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 5,
  },
  countryCode: {
    fontWeight: "bold",
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  continueButton: {
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  or: {
    textAlign: "center",
    color: "#aaa",
    marginVertical: 12,
  },
  googleButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 30,
  },
  googleText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
