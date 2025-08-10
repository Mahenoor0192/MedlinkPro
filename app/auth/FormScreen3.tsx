import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef } from "react";
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { FormDataContext } from "../../Context/FormDataContext";

const commonDiseases = [
  "Diabetes",
  "Hypertension",
  "Asthma",
  "Heart Disease",
  "Arthritis",
  "Thyroid",
];

export default function FormScreen4() {
  const router = useRouter();
  const { formData, setFormData } = useContext(FormDataContext);
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

  const toggleDisease = (disease) => {
    let updated = [...(formData.chronicDiseases || [])];
    if (updated.includes(disease)) {
      updated = updated.filter((d) => d !== disease);
    } else {
      updated.push(disease);
    }
    setFormData({ ...formData, chronicDiseases: updated });
  };

  const handleOthersChange = (text) => {
    setFormData({ ...formData, otherDisease: text });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTextRow}>
          <Text style={styles.stepText}>Step 3 of 4</Text>
          <Text style={styles.percentText}>75%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <LinearGradient
            colors={["#0DB1E8", "#11C0B2"]}
            style={[styles.progressBarFill, { width: "75%" }]}
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
          <AntDesign name="hearto" size={28} color="#fff" />
        </LinearGradient>
      </Animated.View>

      {/* Heading */}
      <Text style={styles.title}>Health Snapshot</Text>
      <Text style={styles.subtitle}>Select any existing health conditions</Text>

      {/* Diseases selection */}
      <View style={styles.glassCard}>
        <Text style={styles.label}>Chronic Diseases</Text>
        <View style={styles.badgeGrid}>
          {commonDiseases.map((disease) => {
            const isSelected =
              formData.chronicDiseases?.includes(disease) || false;
            return (
              <TouchableOpacity
                key={disease}
                activeOpacity={0.8}
                onPress={() => toggleDisease(disease)}
                style={styles.badgeWrapper}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={["#0DB1E8", "#11C0B2"]}
                    style={[styles.badge, styles.badgeSelected]}
                  >
                    <Text style={[styles.badgeText, { color: "#fff" }]}>
                      {disease}
                    </Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{disease}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}

          {/* Others field */}
          <View style={styles.othersWrapper}>
            <TextInput
              placeholder="Others..."
              placeholderTextColor="#888"
              style={styles.othersInput}
              value={formData.otherDisease || ""}
              onChangeText={handleOthersChange}
            />
          </View>
        </View>

        {(!formData.chronicDiseases || formData.chronicDiseases.length === 0) &&
          !formData.otherDisease && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🎉</Text>
              <Text style={styles.emptyText}>
                Great! No chronic conditions selected
              </Text>
            </View>
          )}
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
          onPress={() => router.push("/auth/FromScreen4")}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
  },
  progressContainer: { marginBottom: 40 },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  stepText: { color: "#0284C5", fontWeight: "600", fontSize: 14 },
  percentText: { color: "#999", fontSize: 12 },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressBarFill: { width: "100%", height: 6, borderRadius: 20 },
  animatedIconWrapper: { alignItems: "center", marginBottom: 20 },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0284C5",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: { textAlign: "center", color: "#888", marginBottom: 30 },
  glassCard: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 16,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  badgeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  badgeWrapper: { borderRadius: 20, overflow: "hidden" },
  badge: {
    borderWidth: 1,
    borderColor: "#0DB1E8",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  badgeSelected: { borderWidth: 0 },
  badgeText: {
    color: "#0DB1E8",
    fontWeight: "500",
    fontSize: 15,
    textAlign: "center",
  },
  othersWrapper: { width: "100%", marginTop: 15 },
  othersInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  emptyState: { alignItems: "center", paddingVertical: 20 },
  emptyEmoji: { fontSize: 40, marginBottom: 5 },
  emptyText: { color: "#888" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  prevButton: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },
  prevText: { color: "#888", fontWeight: "600" },
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
