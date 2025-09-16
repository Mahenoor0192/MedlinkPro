// // app/dashboard/index.tsx
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useState } from "react";
// import {
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// export default function DashboardScreen() {
//   const [search, setSearch] = useState("");

//   const medicines = [
//     {
//       id: "1",
//       name: "Amoxicillin",
//       note: "Take with breakfast",
//       time: "8:00 AM",
//       status: "Safe",
//     },
//     {
//       id: "2",
//       name: "Omega-3",
//       note: "Take with lunch",
//       time: "12:30 PM",
//       status: "Pending",
//     },
//     {
//       id: "3",
//       name: "Vitamin D3",
//       note: "Take with dinner",
//       time: "8:00 PM",
//       status: "Scheduled",
//     },
//   ];

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ paddingBottom: 80 }}
//     >
//       {/* Gradient Header */}
//       <LinearGradient colors={["#0DB1E8", "#11C0B2"]} style={styles.header}>
//         <Text style={styles.greeting}>Good morning, John!</Text>
//         <Text style={styles.subGreeting}>How are you feeling today?</Text>

//         <View style={styles.searchBox}>
//           <Ionicons name="search-outline" size={20} color="#6B7280" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search medicines, appointments..."
//             placeholderTextColor="#9CA3AF"
//             value={search}
//             onChangeText={setSearch}
//           />
//           <Ionicons name="person-circle-outline" size={24} color="#0284C7" />
//         </View>
//       </LinearGradient>

//       {/* Medicines Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Today's Medicines</Text>
//         {medicines.map((med) => (
//           <View key={med.id} style={styles.card}>
//             <View style={{ flex: 1 }}>
//               <Text style={styles.medName}>{med.name}</Text>
//               <Text style={styles.medNote}>{med.note}</Text>
//               <Text style={styles.medTime}>{med.time}</Text>
//             </View>
//             <View
//               style={[
//                 styles.statusChip,
//                 med.status === "Safe"
//                   ? { backgroundColor: "#DCFCE7" }
//                   : med.status === "Pending"
//                   ? { backgroundColor: "#FEF3C7" }
//                   : { backgroundColor: "#E0F2FE" },
//               ]}
//             >
//               <Text
//                 style={[
//                   styles.statusTxt,
//                   med.status === "Safe"
//                     ? { color: "#16A34A" }
//                     : med.status === "Pending"
//                     ? { color: "#D97706" }
//                     : { color: "#0284C7" },
//                 ]}
//               >
//                 {med.status}
//               </Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       {/* Appointment Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Next Appointment</Text>
//         <View style={styles.appointmentCard}>
//           <Image
//             source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
//             style={styles.docImg}
//           />
//           <View style={{ flex: 1, marginLeft: 10 }}>
//             <Text style={styles.docName}>Dr. Sarah Wilson</Text>
//             <Text style={styles.docSpec}>Cardiologist</Text>
//             <Text style={styles.docTime}>Tomorrow • 2:00 PM</Text>
//           </View>
//           <TouchableOpacity style={styles.rescheduleBtn}>
//             <Text style={styles.rescheduleTxt}>Reschedule</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Quick Actions */}
//       <View style={styles.quickActions}>
//         <TouchableOpacity
//           style={[styles.actionCard, { backgroundColor: "#60A5FA" }]}
//         >
//           <MaterialCommunityIcons name="heart-pulse" size={28} color="#fff" />
//           <Text style={styles.actionTxt}>Health Monitoring</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.actionCard, { backgroundColor: "#34D399" }]}
//         >
//           <MaterialCommunityIcons name="flask" size={28} color="#fff" />
//           <Text style={styles.actionTxt}>Re-Test</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F9FAFB" },
//   header: {
//     paddingVertical: 30,
//     paddingHorizontal: 16,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greeting: { fontSize: 20, fontWeight: "800", color: "#fff" },
//   subGreeting: { fontSize: 14, color: "#E0F2FE", marginBottom: 12 },
//   searchBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     elevation: 3,
//   },
//   searchInput: {
//     flex: 1,
//     paddingVertical: 10,
//     marginLeft: 6,
//     fontSize: 14,
//     color: "#111",
//   },

//   section: { marginTop: 20, paddingHorizontal: 16 },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111",
//     marginBottom: 10,
//   },

//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 14,
//     padding: 14,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     elevation: 2,
//   },
//   medName: { fontSize: 15, fontWeight: "700", color: "#111" },
//   medNote: { fontSize: 12, color: "#6B7280", marginVertical: 2 },
//   medTime: { fontSize: 12, color: "#374151" },
//   statusChip: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//   },
//   statusTxt: { fontSize: 12, fontWeight: "600" },

//   appointmentCard: {
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 14,
//     elevation: 3,
//   },
//   docImg: { width: 56, height: 56, borderRadius: 28 },
//   docName: { fontSize: 15, fontWeight: "700", color: "#111" },
//   docSpec: { fontSize: 13, color: "#6B7280" },
//   docTime: { fontSize: 12, color: "#0284C7", marginTop: 4 },
//   rescheduleBtn: {
//     backgroundColor: "#0DB1E8",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//   },
//   rescheduleTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },

//   quickActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//     paddingHorizontal: 16,
//     gap: 12,
//   },
//   actionCard: {
//     flex: 1,
//     height: 100,
//     borderRadius: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     elevation: 3,
//   },
//   actionTxt: {
//     color: "#fff",
//     fontWeight: "700",
//     marginTop: 6,
//     fontSize: 13,
//     textAlign: "center",
//   },
// });


// app/dashboard/index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function DashboardScreen() {
  const [search, setSearch] = useState("");

  const medicines = [
    { id: "1", name: "Amoxicillin", note: "Take with breakfast", time: "8:00 AM", status: "Taken" },
    { id: "2", name: "Omega-3", note: "Take before lunch", time: "12:30 PM", status: "Pending" },
    { id: "3", name: "Vitamin D3", note: "Take with dinner", time: "8:00 PM", status: "Scheduled" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 80 }}>
      {/* Gradient Header */}
      <LinearGradient colors={["#0DB1E8", "#11C0B2"]} style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Good morning, John 👋</Text>
            <Text style={styles.subGreeting}>How are you feeling today?</Text>
          </View>
          <Ionicons name="notifications-outline" size={26} color="#fff" />
        </View>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search medicines, appointments..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="person-circle-outline" size={28} color="#0284C7" />
        </View>
      </LinearGradient>

      {/* Medicines Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Medicines</Text>
        {medicines.map((med) => (
          <View key={med.id} style={styles.medicineCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.medName}>{med.name}</Text>
              <Text style={styles.medNote}>{med.note}</Text>
              <Text style={styles.medTime}>
                <Ionicons name="time-outline" size={14} color="#6B7280" /> {med.time}
              </Text>
            </View>
            <View
              style={[
                styles.statusChip,
                med.status === "Safe"
                  ? { backgroundColor: "#DCFCE7" }
                  : med.status === "Pending"
                  ? { backgroundColor: "#FEF3C7" }
                  : { backgroundColor: "#E0F2FE" },
              ]}
            >
              <Text
                style={[
                  styles.statusTxt,
                  med.status === "Safe"
                    ? { color: "#16A34A" }
                    : med.status === "Pending"
                    ? { color: "#D97706" }
                    : { color: "#0284C7" },
                ]}
              >
                {med.status}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Next Appointment */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next Appointment</Text>
        <LinearGradient colors={["#F9FAFB", "#F3F4F6"]} style={styles.appointmentCard}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.docImg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.docName}>Dr. Sarah Wilson</Text>
            <Text style={styles.docSpec}>Cardiologist</Text>
            <Text style={styles.docTime}>
              <Ionicons name="calendar-outline" size={14} color="#0284C7" /> Tomorrow • 2:00 PM
            </Text>
          </View>
          <TouchableOpacity style={styles.rescheduleBtn}>
            <LinearGradient colors={["#0DB1E8", "#11C0B2"]} style={styles.rescheduleGradient}>
              <Text style={styles.rescheduleTxt}>Reschedule</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity activeOpacity={0.8} style={styles.actionCard}>
          <LinearGradient colors={["#3B82F6", "#2563EB"]} style={styles.actionGradient}>
            <MaterialCommunityIcons name="heart-pulse" size={30} color="#fff" />
            <Text style={styles.actionTxt}>Health Monitoring</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.actionCard}>
          <LinearGradient colors={["#34D399", "#059669"]} style={styles.actionGradient}>
            <MaterialCommunityIcons name="flask" size={30} color="#fff" />
            <Text style={styles.actionTxt}>Re-Test</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  // Header
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: { fontSize: 20, fontWeight: "800", color: "#fff" },
  subGreeting: { fontSize: 14, color: "#E0F2FE" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 3,
  },
  searchInput: { flex: 1, paddingVertical: 10, marginLeft: 6, fontSize: 14, color: "#111" },

  // Sections
  section: { marginTop: 20, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: "#111", marginBottom: 10 },

  // Medicine cards
  medicineCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  medName: { fontSize: 15, fontWeight: "700", color: "#111" },
  medNote: { fontSize: 13, color: "#6B7280", marginVertical: 2 },
  medTime: { fontSize: 12, color: "#374151", marginTop: 4 },
  statusChip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 12 },
  statusTxt: { fontSize: 12, fontWeight: "700" },

  // Appointment
  appointmentCard: {
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    elevation: 3,
  },
  docImg: { width: 56, height: 56, borderRadius: 28 },
  docName: { fontSize: 15, fontWeight: "700", color: "#111" },
  docSpec: { fontSize: 13, color: "#6B7280", marginTop: 2 },
  docTime: { fontSize: 12, color: "#0284C7", marginTop: 6 },
  rescheduleBtn: { borderRadius: 8, overflow: "hidden" },
  rescheduleGradient: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  rescheduleTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },

  // Quick Actions
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: { flex: 1, borderRadius: 18, overflow: "hidden" },
  actionGradient: {
    height: 110,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  actionTxt: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 8,
    fontSize: 13,
    textAlign: "center",
  },
});
