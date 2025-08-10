import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef } from "react";

import { FormDataContext } from "@/Context/FormDataContext";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FormScreen2() {
  const router = useRouter();

  const { formData, setFormData } = useContext(FormDataContext);
  const { height = 170, weight = 70 } = formData;

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const calculateBMI = () => {
    const heightInM = (formData.height || 170) / 100;
    const bmi = (formData.weight || 70) / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
    else if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    else return "Obese";
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : undefined}
    //   style={{ flex: 1 }}
    // >
    <ScrollView
      contentContainerStyle={{
        flexGrow: 10,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTextRow}>
            <Text style={styles.stepText}>Step 2 of 4</Text>
            <Text style={styles.percentText}>50%</Text>
          </View>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={["#0DB1E8", "#11C0B2"]}
              style={styles.progressBarFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          </View>
        </View>

        {/* Animated icon */}
        <Animated.View
          style={[
            styles.animatedIconWrapper,
            { transform: [{ translateY: animatedValue }] },
          ]}
        >
          <LinearGradient
            colors={["#0DB1E8", "#11C0B2"]}
            style={styles.iconCircle}
          >
            <Image
              source={require("../../assets/images/ruler.png")}
              style={styles.iconImage}
            />
          </LinearGradient>
        </Animated.View>

        {/* Heading */}
        <Text style={styles.title}>Body Blueprint</Text>
        <Text style={styles.subtitle}>
          Help us understand your physical measurements
        </Text>

        {/* Height Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}> Height: {height} cm</Text>
          <Slider
            minimumValue={120}
            maximumValue={220}
            value={height}
            step={1}
            onValueChange={(value) =>
              setFormData({ ...formData, height: value })
            }
            minimumTrackTintColor="#0DB1E8"
            maximumTrackTintColor="#11C0B2"
            thumbTintColor="#0284C5"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>120 cm</Text>
            <Text style={styles.sliderLabel}>220 cm</Text>
          </View>
        </View>

        {/* Weight Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}> Weight: {weight} kg</Text>
          <Slider
            minimumValue={30}
            maximumValue={200}
            value={weight}
            step={1}
            onValueChange={(value) =>
              setFormData({ ...formData, weight: value })
            }
            minimumTrackTintColor="#0DB1E8"
            maximumTrackTintColor="#11C0B2"
            thumbTintColor="#0284C5"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>30 kg</Text>
            <Text style={styles.sliderLabel}>200 kg</Text>
          </View>
        </View>

        {/* BMI Preview */}
        <View style={styles.bmiCard}>
          <Text style={styles.bmiLabel}>BMI Preview</Text>
          <Text style={styles.bmiValue}>{calculateBMI()}</Text>
          <Text style={styles.bmiCategory}>{getBMICategory()}</Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.prevButton}
            onPress={() => router.back()}
          >
            <Text style={styles.prevText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/auth/FormScreen3")}
            style={{ borderRadius: 30 }}
          >
            <LinearGradient
              colors={["#0DB1E8", "#11C0B2"]}
              style={styles.nextButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.navButtonText}>Next Step</Text>
              <AntDesign name="arrowright" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  stepText: {
    color: "#0284C5",
    fontWeight: "600",
    fontSize: 14,
  },
  percentText: {
    color: "#999",
    fontSize: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "50%",
    height: 6,
    borderRadius: 20,
  },
  animatedIconWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0284C5",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#888",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 16,
    elevation: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  cardLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    marginBottom: 20,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 15,
    color: "#777",
  },
  bmiCard: {
    backgroundColor: "#f1f5ff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
  },
  bmiLabel: {
    color: "#888",
    marginBottom: 5,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0284C5",
  },
  bmiCategory: {
    color: "#888",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  prevButton: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },
  prevText: {
    color: "#888",
    fontWeight: "600",
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 8,
  },
});
