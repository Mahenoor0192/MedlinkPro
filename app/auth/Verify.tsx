import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Verify() {
  const [otp, setOtp] = useState("");
  const { phone } = useLocalSearchParams();

  const handleVerify = () => {
    console.log(`Verifying OTP: ${otp} for phone: ${phone}`);
    router.push('/auth/FormScreen');
  };

  return (
    <LinearGradient
      colors={['#0284C5', '#11C0B2']} // ✅ Screen gradient background
      style={styles.container}
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
        <Text style={styles.title}>Verify Phone Number</Text>
        <Text style={styles.subtitle}>Enter the OTP sent to +91 {phone}</Text>
        <TextInput
          style={styles.otpInput}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
          maxLength={6}
        />

        {/* ✅ Gradient Verify Button */}
        <Pressable style={styles.buttonWrapper} onPress={handleVerify}>
          <LinearGradient
            colors={['#0284C5', '#11C0B2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.verifyButton}
          >
            <Text style={styles.buttonText}>Verify</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: "hidden",
  },
  verifyButton: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
