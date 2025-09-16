// // import { StyleSheet, Text, View } from "react-native";
// // import React from "react";

// // const ProfileScreen = () => {
// //   return (
// //     <View>
// //       <Text>ProfileScreen</Text>
// //     </View>
// //   );
// // };

// // export default ProfileScreen;

// // const styles = StyleSheet.create({
// //   container: { flex: 1, justifyContent: "center", alignItems: "center" },
// //   text: { fontSize: 20 },
// // });

// import { View, Text, TouchableOpacity } from "react-native";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import { useRouter } from "expo-router";

// export default function ProfileScreen() {
//   // const router = useRouter();

//   // const handleLogout = async () => {
//   //   await AsyncStorage.removeItem("token");
//   //   router.replace("/auth/LoginScreen");
//   // };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text style={{ fontSize: 18, marginBottom: 20 }}>Profile Screen</Text>
//       <TouchableOpacity
//         // onPress={handleLogout}
//         style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}
//       >
//         <Text style={{ color: "#fff", fontWeight: "700" }}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// app/profile/patient.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatientProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#0DB1E8", "#11C0B2"]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Patient Profile</Text>
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
          style={styles.avatar}
        />
        <View style={styles.nameRow}>
          <Text style={styles.name}>Sarah Johnson</Text>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color="#10B981"
            style={{ marginLeft: 6 }}
          />
        </View>
        <Text style={styles.patientId}>Patient ID: #PT-2024-001</Text>
      </View>

      {/* Basic Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-circle-outline" size={18} color="#0284C7" />
          <Text style={styles.sectionTitle}>Basic Information</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>sarah.johnson@email.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>March 15, 1985</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>39 years</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Blood Group</Text>
          <Text style={[styles.value, { color: "#DC2626", fontWeight: "700" }]}>
            O+
          </Text>
        </View>
      </View>

      {/* Physical Measurements */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="barbell-outline" size={18} color="#0284C7" />
          <Text style={styles.sectionTitle}>Physical Measurements</Text>
        </View>
        <View style={styles.measureRow}>
          <View style={[styles.measureBox, { backgroundColor: "#E0F2FE" }]}>
            <Text style={styles.measureValue}>165</Text>
            <Text style={styles.measureLabel}>Height (cm)</Text>
          </View>
          <View style={[styles.measureBox, { backgroundColor: "#DCFCE7" }]}>
            <Text style={styles.measureValue}>68</Text>
            <Text style={styles.measureLabel}>Weight (kg)</Text>
          </View>
        </View>
      </View>

      {/* Medical Information */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialCommunityIcons
            name="heart-pulse"
            size={18}
            color="#0284C7"
          />
          <Text style={styles.sectionTitle}>Medical Information</Text>
        </View>
        <Text style={styles.label}>Chronic Diseases</Text>
        <View style={styles.tagsRow}>
          <View style={[styles.tag, { backgroundColor: "#FEE2E2" }]}>
            <Text style={[styles.tagTxt, { color: "#DC2626" }]}>
              Hypertension
            </Text>
          </View>
          <View style={[styles.tag, { backgroundColor: "#FEF3C7" }]}>
            <Text style={[styles.tagTxt, { color: "#D97706" }]}>
              Type 2 Diabetes
            </Text>
          </View>
        </View>
        <View style={[styles.infoRow, { marginTop: 12 }]}>
          <Text style={styles.label}>Last Visit</Text>
          <Text style={styles.value}>Jan 20, 2024</Text>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.btn}>
        <LinearGradient
          colors={["#0DB1E8", "#11C0B2"]}
          style={styles.btnGradient}
        >
          <Text style={styles.btnTxt}>View Medical Records</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },

  profileCard: {
    alignItems: "center",
    marginTop: -40,
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  name: { fontSize: 18, fontWeight: "700", color: "#111" },
  patientId: { fontSize: 13, color: "#6B7280", marginTop: 4 },

  section: {
    backgroundColor: "#fff",
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: { fontSize: 13, color: "#6B7280" },
  value: { fontSize: 13, color: "#111827", fontWeight: "600" },

  measureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  measureBox: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  measureValue: { fontSize: 20, fontWeight: "800", color: "#111" },
  measureLabel: { fontSize: 12, color: "#6B7280", marginTop: 4 },

  tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagTxt: { fontSize: 12, fontWeight: "600" },

  btn: { marginHorizontal: 20, marginVertical: 24 },
  btnGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnTxt: { color: "#fff", fontWeight: "700", fontSize: 15 },
});
