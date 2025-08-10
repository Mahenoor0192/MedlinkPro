import { AntDesign, Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { FormDataContext } from "../../Context/FormDataContext";

export default function FormScreen4() {
  const router = useRouter();
  const { formData, setFormData } = useContext(FormDataContext);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTextRow}>
          <Text style={styles.stepText}>Step 4 of 4</Text>
          <Text style={styles.percentText}>100%</Text>
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
          <AntDesign name="checkcircleo" size={36} color="#fff" />
        </LinearGradient>
      </Animated.View>

      {/* Title */}
      <Text style={styles.title}>Almost Done!</Text>
      <Text style={styles.subtitle}>Complete Your Profile</Text>

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.dateInputWrapper}
        onPress={() => setShowDatePicker(true)}
      >
        <Entypo name="calendar" size={16} color="#0284C5" style={styles.icon} />
        <Text style={styles.dateText}>
          {formData.lastVisit
            ? formData.lastVisit.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : " Select your last visit date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={formData.lastVisit || new Date()}
          maximumDate={new Date()}
          onChange={(_, date) => {
            setShowDatePicker(false);
            if (date) setFormData({ ...formData, lastVisit: date });
          }}
        />
      )}

      {/* Navigation Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.prevButton}
          onPress={() => router.back()}
        >
          <Text style={styles.prevText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => console.log("Final Data:", formData)}
          style={{ borderRadius: 30 }}
        >
          <LinearGradient
            colors={["#0DB1E8", "#11C0B2"]}
            style={styles.nextButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.navButtonText}>Start</Text>
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
  progressContainer: { marginBottom: 30 },
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
  animatedIconWrapper: { alignItems: "center", marginBottom: 15 },
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
    marginBottom: 4,
  },
  subtitle: { textAlign: "center", color: "#888", marginBottom: 50 },
  dateInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  icon: { marginRight: 8 },
  dateText: { color: "#555", fontSize: 14 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 350,
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
