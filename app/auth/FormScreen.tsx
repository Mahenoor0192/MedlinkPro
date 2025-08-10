import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import validator from "validator";

export default function FormScreen1() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState<Date | undefined>();
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [emailError, setEmailError] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;

  // Email validation
  const isValidEmail = (email: string) => {
    return validator.isEmail(email.trim(), {
      domain_specific_validation: true, // Checks popular domains like gmail, yahoo
      allow_utf8_local_part: false, // Restricts weird unicode characters
    });
  };

  // Form validation
  const isFormValid =
    name.trim() && isValidEmail(email) && dob && gender && bloodGroup;

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

  const handleNext = () => {
    router.push("/auth/FormScreen2");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.stepText}>Step 1 of 4</Text>
              <Text style={styles.percentText}>25%</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <LinearGradient
                colors={["#0DB1E8", "#11C0B2"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressBarFill}
              />
            </View>
          </View>

          {/* Avatar */}
          <Animated.View
            style={[
              styles.avatarWrapper,
              { transform: [{ translateY: animatedValue }] },
            ]}
          >
            <Image
              source={require("../../assets/images/doctor-avatar.jpg")}
              style={styles.avatar}
            />
            <View style={styles.wave}>
              <Text style={styles.waveEmoji}>👋</Text>
            </View>
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Let's Get to Know You</Text>
          <Text style={styles.subtitle}>
            Tell us about yourself to personalize your health journey
          </Text>

          {/* Name Input */}
          <View
            style={[
              styles.inputWrapper,
              focusedField === "name" && styles.inputFocused,
            ]}
          >
            <FontAwesome
              name="user"
              size={16}
              color="#0284C5"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter your full name"
              style={styles.input}
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField("")}
            />
          </View>

          {/* Email Input */}
          <View
            style={[
              styles.inputWrapper,
              focusedField === "email" && styles.inputFocused,
              emailError && { borderColor: "red" },
            ]}
          >
            <Feather
              name="mail"
              size={16}
              color="#0284C5"
              style={styles.icon}
            />
            <TextInput
              placeholder="Enter your email address"
              style={styles.input}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError(
                  text && !isValidEmail(text)
                    ? "Please enter a valid email"
                    : ""
                );
              }}
              keyboardType="email-address"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField("")}
              autoCapitalize="none"
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          {/* Date of Birth */}
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <Entypo
              name="calendar"
              size={16}
              color="#0284C5"
              style={styles.icon}
            />
            <Text style={[styles.input, { alignItems: "center" }]}>
              {dob
                ? dob.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : " Pick your birth date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={dob || new Date()}
              maximumDate={new Date()}
              onChange={(_, date) => {
                setShowDatePicker(false);
                if (date) setDob(date);
              }}
            />
          )}

          {/* Gender & Blood Group */}
          <View style={styles.pickerRow}>
            <View style={styles.pickerWrapper}>
              <Feather
                name="users"
                size={16}
                color="#0284C5"
                style={styles.icon}
              />
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={[styles.picker, gender ? styles.pickerSelected : null]}
                dropdownIconColor="#0284C5"
              >
                <Picker.Item label="Select gender" value="" color="#888" />
                <Picker.Item
                  label="Male"
                  value="male"
                  color={gender === "male" ? "#0284C5" : "#333"}
                />
                <Picker.Item
                  label="Female"
                  value="female"
                  color={gender === "female" ? "#0284C5" : "#333"}
                />
                <Picker.Item
                  label="Other"
                  value="other"
                  color={gender === "other" ? "#0284C5" : "#333"}
                />
              </Picker>
            </View>

            <View style={styles.pickerWrapper}>
              <MaterialIcons
                name="favorite"
                size={16}
                color="#e63946"
                style={styles.icon}
              />
              <Picker
                selectedValue={bloodGroup}
                onValueChange={(itemValue) => setBloodGroup(itemValue)}
                style={[
                  styles.picker,
                  bloodGroup ? styles.pickerSelected : null,
                ]}
                dropdownIconColor="#0284C5"
              >
                <Picker.Item label="Blood type" value="" color="#888" />
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (type) => (
                    <Picker.Item
                      key={type}
                      label={type}
                      value={type}
                      color={bloodGroup === type ? "#0284C5" : "#333"}
                    />
                  )
                )}
              </Picker>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              disabled
              style={[styles.navButton, styles.disabledButton]}
            >
              <Text style={[styles.navButtonText, { color: "#cccbcbff" }]}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={isFormValid ? handleNext : null}
              style={{ borderRadius: 30 }}
              disabled={!isFormValid}
            >
              <LinearGradient
                colors={
                  isFormValid
                    ? ["#0DB1E8", "#11C0B2"]
                    : ["#abd7e6ff", "#abe6e2ff"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.nextButton}
              >
                <Text style={styles.navButtonText}>Next Step</Text>
                <AntDesign name="arrowright" size={18} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 60,
    flexGrow: 1,
  },
  progressContainer: { marginBottom: 80 },
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
  progressBarFill: { width: "25%", height: 6, borderRadius: 20 },
  avatarWrapper: {
    alignSelf: "center",
    marginBottom: 20,
    position: "relative",
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  wave: {
    position: "absolute",
    right: 0,
    // top: -10,
    backgroundColor: "#0284C5",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  waveEmoji: { fontSize: 18, color: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0284C5",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: { textAlign: "center", color: "#888", marginBottom: 20 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 50,
  },
  inputFocused: { borderColor: "#0DB1E8", borderWidth: 1.5 },
  icon: { marginRight: 8 },
  input: { flex: 1, fontSize: 16, color: "#333" },
  errorText: { color: "red", fontSize: 12, marginBottom: 8 },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 30,
  },
  pickerWrapper: {
    flex: 1,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 50,
  },
  picker: {
    flex: 1,
    color: "#333",
    // backgroundColor: "#fff",
  },

  pickerSelected: {
    fontWeight: "bold",
    color: "#0284C5",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  disabledButton: { backgroundColor: "#f0f0f0" },
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
