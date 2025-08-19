// // app/appointments/doctor/[id].tsx  (or wherever your DoctorBooking file lives)
// import { AntDesign } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import React, { useMemo, useState } from "react";
// import {
//   Alert,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { HOSPITALS } from "../../appointments/data/appointments"; // <-- adjust path if needed

// const daysAhead = 7;
// const times = [
//   "9:00 AM",
//   "10:00 AM",
//   "11:00 AM",
//   "2:00 PM",
//   "3:00 PM",
//   "4:00 PM",
//   "5:00 PM",
//   "6:00 PM",
// ];
// function getNextDays(numDays: number) {
//   const today = new Date();
//   const days = [];

//   for (let i = 0; i < numDays; i++) {
//     const date = new Date(today);
//     date.setDate(today.getDate() + i);

//     days.push({
//       key: i.toString(),
//       day: date.toLocaleDateString("en-US", { weekday: "short" }),
//       dateNum: date.getDate(),
//       month: date.toLocaleDateString("en-US", { month: "short" }),
//       date,
//     });
//   }

//   return days;
// }
// export default function DoctorBooking() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();

//   // Debug: show what we received and HOSPITALS content
//   // console.log("DoctorBooking got id:", id);
//   // console.log(
//   //   "HOSPITALS count:",
//   //   Array.isArray(HOSPITALS) ? HOSPITALS.length : typeof HOSPITALS
//   // );

//   if (Array.isArray(HOSPITALS)) {
//     console.log(
//       "All doctor ids:",
//       HOSPITALS.flatMap((h) => h.doctors.map((d) => d.id))
//     );
//   }

//   const { doctor, hospital } = useMemo(() => {
//     if (!Array.isArray(HOSPITALS))
//       return { doctor: undefined, hospital: undefined };

//     // flatten doctors and match
//     const allDoctors = HOSPITALS.flatMap((h) => h.doctors || []);
//     const foundDoctor = allDoctors.find((doc) => String(doc.id) === String(id));
//     const foundHospital = foundDoctor
//       ? HOSPITALS.find((h) => h.id === foundDoctor.hospitalId)
//       : undefined;
//     console.log("foundDoctor:", foundDoctor);
//     console.log("foundHospital:", foundHospital?.id);
//     return { doctor: foundDoctor, hospital: foundHospital };
//   }, [id]);

//   const [dateIdx, setDateIdx] = useState(2);
//   const [time, setTime] = useState(times[1]);
//   const [patientName, setPatientName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [symptoms, setSymptoms] = useState("");

//   // Friendly fallback while debugging
//   if (!Array.isArray(HOSPITALS)) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ marginBottom: 12 }}>
//           Data not loaded. Check import path for HOSPITALS.
//         </Text>
//         <Text style={{ color: "#666" }}>
//           Import path in DoctorBooking must point to the file that exports
//           HOSPITALS.
//         </Text>
//       </View>
//     );
//   }

//   if (!doctor || !hospital) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.notFoundTitle}>Doctor not found</Text>
//         <Text style={styles.notFoundText}>
//           We couldn't find a doctor for id:{" "}
//           <Text style={{ fontWeight: "700" }}>{String(id)}</Text>
//         </Text>
//         <Text style={{ marginTop: 12, color: "#666" }}>Make sure:</Text>
//         <Text style={{ color: "#666" }}>
//           • Route file is app/appointments/doctor/[id].tsx
//         </Text>
//         <Text style={{ color: "#666" }}>
//           • You're navigating with router.push(`/appointments/doctor/$
//           {String(id)}`)
//         </Text>
//         <TouchableOpacity
//           style={styles.debugBtn}
//           onPress={() => {
//             console.log("All hospitals:", HOSPITALS);
//             Alert.alert("Debug", `See console logs for HOSPITALS and doctors.`);
//           }}
//         >
//           <Text style={{ color: "#fff" }}>Show debug logs</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const handleBook = () => {
//     if (!patientName.trim() || mobile.trim().length < 8) {
//       Alert.alert(
//         "Missing info",
//         "Please enter patient name and a valid mobile number."
//       );
//       return;
//     }
//     const d = new Date();
//     d.setDate(d.getDate() + dateIdx);
//     router.push({
//       pathname: "/appointments/success",
//       params: {
//         hid: hospital.id,
//         did: doctor.id,
//         date: d.toDateString(),
//         time,
//       },
//     });
//   };

//   const dayBoxes = Array.from({ length: daysAhead }, (_, i) => {
//     const d = new Date();
//     d.setDate(d.getDate() + i);
//     return {
//       key: i,
//       day: d.toLocaleDateString("en-US", { weekday: "short" }),
//       date: d.getDate(),
//     };
//   });

//   return (
//     <View style={{ flex: 1, backgroundColor: "#F7FAFC" }}>
//       <LinearGradient
//         colors={["#0DB1E8", "#11C0B2"]}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}
//       >
//         <View style={styles.headerRow}>
//           <TouchableOpacity onPress={() => router.back()}>
//             <AntDesign name="arrowleft" size={20} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>Book Appointment</Text>
//           <AntDesign name="hearto" size={20} color="#fff" />
//         </View>

//         <View style={styles.docCard}>
//           <Image
//             source={{ uri: `https://i.pravatar.cc/100?u=${doctor.id}` }}
//             style={styles.docAvatarTop}
//           />
//           <View style={{ flex: 1, marginLeft: 12 }}>
//             <Text style={styles.docNameTop}>{doctor.name}</Text>
//             <Text style={styles.docMetaTop}>
//               {String(doctor.specialty)} • {doctor.years} years
//             </Text>
//             <Text style={styles.docMetaTop}>
//               {hospital.name} • ⭐ {Number(doctor.rating || 0).toFixed(1)} (
//               {doctor.reviews || 0})
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>

//       <View style={{ padding: 16, gap: 12 }}>
//         <Text style={styles.sectionTitle}>Select Date</Text>
//         <FlatList
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           data={days}
//           contentContainerStyle={{ gap: 12 }}
//           renderItem={({ item, index }) => {
//             const isSelected = selectedDate === index;
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   setSelectedDate(index);
//                   setSelectedTime(null);
//                 }}
//                 style={[styles.dayCard, isSelected && styles.dayCardSelected]}
//               >
//                 <Text
//                   style={[styles.dayText, isSelected && styles.dayTextSelected]}
//                 >
//                   {item.day}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.dateText,
//                     isSelected && styles.dayTextSelected,
//                   ]}
//                 >
//                   {item.dateNum}
//                 </Text>
//                 <Text
//                   style={[
//                     styles.monthText,
//                     isSelected && styles.dayTextSelected,
//                   ]}
//                 >
//                   {item.month}
//                 </Text>
//               </TouchableOpacity>
//             );
//           }}
//           keyExtractor={(item) => item.key}
//         />
//         <Text style={styles.sectionTitle}>Available Time</Text>
//         <View style={styles.timeGrid}>
//           {times.map((t) => {
//             const active = time === t;
//             return (
//               <TouchableOpacity
//                 key={t}
//                 onPress={() => setTime(t)}
//                 style={[styles.timeChip, active && styles.timeChipActive]}
//               >
//                 <Text style={[styles.timeTxt, active && styles.timeTxtActive]}>
//                   {t}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>

//         <Text style={styles.sectionTitle}>Patient Information</Text>
//         <View style={styles.input}>
//           <TextInput
//             placeholder="Patient Name"
//             value={patientName}
//             onChangeText={setPatientName}
//           />
//         </View>
//         <View style={styles.input}>
//           <TextInput
//             placeholder="Mobile Number"
//             keyboardType="phone-pad"
//             value={mobile}
//             onChangeText={setMobile}
//           />
//         </View>
//         <View style={styles.input}>
//           <TextInput
//             placeholder="Symptoms"
//             value={symptoms}
//             onChangeText={setSymptoms}
//           />
//         </View>
//       </View>

//       <View style={{ padding: 16 }}>
//         <TouchableOpacity
//           onPress={handleBook}
//           style={{ borderRadius: 28, overflow: "hidden" }}
//         >
//           <LinearGradient
//             colors={["#0DB1E8", "#11C0B2"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.ctaBtn}
//           >
//             <AntDesign name="arrowright" size={18} color="#fff" />
//             <Text style={styles.ctaTxt}>Book Appointment</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

// const styles = StyleSheet.create({
//   title: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#111" },
//   dayCard: {
//     width: 70,
//     borderRadius: 12,
//     paddingVertical: 8,
//     alignItems: "center",
//     backgroundColor: "#f3f4f6",
//   },
//   dayCardSelected: {
//     backgroundColor: "#0DB1E8",
//   },
//   dayText: { fontSize: 12, fontWeight: "600", color: "#374151" },
//   dateText: { fontSize: 18, fontWeight: "700", color: "#111" },
//   monthText: { fontSize: 12, color: "#6B7280" },
//   dayTextSelected: { color: "#fff" },

//   period: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#374151",
//     marginBottom: 6,
//   },
//   slotRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
//   slotCard: {
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     backgroundColor: "#fff",
//   },
//   slotSelected: {
//     backgroundColor: "#0DB1E8",
//     borderColor: "#0DB1E8",
//   },
//   slotText: { fontSize: 13, color: "#374151" },
//   slotTextSelected: { color: "#fff", fontWeight: "700" },
//   header: {
//     paddingTop: 54,
//     paddingHorizontal: 16,
//     paddingBottom: 14,
//     borderBottomLeftRadius: 16,
//     borderBottomRightRadius: 16,
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   headerTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },
//   docCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#ffffff22",
//     borderRadius: 12,
//     padding: 12,
//   },
//   docAvatarTop: { width: 56, height: 56, borderRadius: 12 },
//   docNameTop: { color: "#fff", fontWeight: "800", fontSize: 16 },
//   docMetaTop: { color: "#E5F6FF", marginTop: 4, fontSize: 12 },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 24,
//   },
//   notFoundTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
//   notFoundText: { color: "#666", textAlign: "center" },
//   debugBtn: {
//     marginTop: 16,
//     backgroundColor: "#0DB1E8",
//     padding: 10,
//     borderRadius: 8,
//   },

//   sectionTitle: {
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 6,
//     marginTop: 2,
//   },
//   dateRow: { flexDirection: "row", justifyContent: "space-between" },
//   dateBox: {
//     width: "13.5%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingVertical: 8,
//     alignItems: "center",
//     elevation: 2,
//     borderWidth: 0,
//     borderColor: "transparent",
//   },
//   dateActive: {
//     borderWidth: 1.6,
//     borderColor: "#0DB1E8",
//     backgroundColor: "#F0FDFF",
//   },
//   dateDay: { fontSize: 10, color: "#6B7280" },
//   dateNum: { fontSize: 14, fontWeight: "800", color: "#111827" },

//   timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
//   timeChip: {
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     backgroundColor: "#fff",
//   },
//   timeChipActive: { borderColor: "#0DB1E8", backgroundColor: "#E0F7FD" },
//   timeTxt: { color: "#374151", fontWeight: "600" },
//   timeTxtActive: { color: "#0284C5" },

//   input: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingHorizontal: 12,
//     height: 46,
//     justifyContent: "center",
//     borderWidth: 1,
//     borderColor: "#E5E7EB",
//     marginTop: 8,
//   },

//   ctaBtn: {
//     height: 50,
//     borderRadius: 28,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     gap: 8,
//   },
//   ctaTxt: { color: "#fff", fontWeight: "800", fontSize: 15 },
// });

// app/appointments/doctor/[id].tsx
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { HOSPITALS } from "../../appointments/data/appointments";

const times = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

function getNextDays(numDays: number) {
  const today = new Date();
  const days = [];
  for (let i = 0; i < numDays; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      key: i.toString(),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      dateNum: date.getDate(),
      month: date.toLocaleDateString("en-US", { month: "short" }),
      date,
    });
  }
  return days;
}

export default function DoctorBooking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  // if (Array.isArray(HOSPITALS)) {
  //   console.log(
  //     "All doctor ids:",
  //     HOSPITALS.flatMap((h) => h.doctors.map((d) => d.id))
  //   );
  // }

  const { doctor, hospital } = useMemo(() => {
    if (!Array.isArray(HOSPITALS))
      return { doctor: undefined, hospital: undefined };
    const allDoctors = HOSPITALS.flatMap((h) => h.doctors || []);
    const foundDoctor = allDoctors.find((doc) => String(doc.id) === String(id));
    const foundHospital = foundDoctor
      ? HOSPITALS.find((h) => h.id === foundDoctor.hospitalId)
      : undefined;
    return { doctor: foundDoctor, hospital: foundHospital };
  }, [id]);

  const [dateIdx, setDateIdx] = useState(0); // <-- use this as the selected day index
  const [time, setTime] = useState(times[0]);
  const [patientName, setPatientName] = useState("");
  const [mobile, setMobile] = useState("");
  const [symptoms, setSymptoms] = useState("");

  // ✅ build the days list once
  const days = useMemo(() => getNextDays(60), []);

  if (!Array.isArray(HOSPITALS)) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 12 }}>
          Data not loaded. Check import path for HOSPITALS.
        </Text>
        <Text style={{ color: "#666" }}>
          Import path in DoctorBooking must point to the file that exports
          HOSPITALS.
        </Text>
      </View>
    );
  }

  if (!doctor || !hospital) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>Doctor not found</Text>
        <Text style={styles.notFoundText}>
          We couldn't find a doctor for id:{" "}
          <Text style={{ fontWeight: "700" }}>{String(id)}</Text>
        </Text>
        <TouchableOpacity
          style={styles.debugBtn}
          onPress={() => {
            console.log("All hospitals:", HOSPITALS);
            Alert.alert("Debug", `See console logs for HOSPITALS and doctors.`);
          }}
        >
          <Text style={{ color: "#fff" }}>Show debug logs</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBook = () => {
    if (!patientName.trim() || mobile.trim().length < 8) {
      Alert.alert(
        "Missing info",
        "Please enter patient name and a valid mobile number."
      );
      return;
    }
    const d = new Date();
    d.setDate(d.getDate() + dateIdx);
    router.push({
      pathname: "/appointments/success",
      params: {
        hid: hospital.id,
        did: doctor.id,
        date: d.toDateString(),
        time,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F7FAFC" }}>
      <LinearGradient
        colors={["#0DB1E8", "#11C0B2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <AntDesign name="hearto" size={20} color="#fff" />
        </View>

        <View style={styles.docCard}>
          <Image
            source={{ uri: `https://i.pravatar.cc/100?u=${doctor.id}` }}
            style={styles.docAvatarTop}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.docNameTop}>{doctor.name}</Text>
            <Text style={styles.docMetaTop}>
              {String(doctor.specialty)} • {doctor.years} years
            </Text>
            <Text style={styles.docMetaTop}>
              {hospital.name} • ⭐ {Number(doctor.rating || 0).toFixed(1)} (
              {doctor.reviews || 0})
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={{ padding: 16, gap: 12 }}>
        <Text style={styles.sectionTitle}>Select Date</Text>

        {/* ✅ Horizontal date list using the defined `days` and `dateIdx` */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={days}
          contentContainerStyle={{ gap: 12 }}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => {
            const isSelected = dateIdx === index;
            return (
              <TouchableOpacity
                onPress={() => setDateIdx(index)}
                style={[styles.dayCard, isSelected && styles.dayCardSelected]}
              >
                <Text
                  style={[styles.dayText, isSelected && styles.dayTextSelected]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.dayTextSelected,
                  ]}
                >
                  {item.dateNum}
                </Text>
                <Text
                  style={[
                    styles.monthText,
                    isSelected && styles.dayTextSelected,
                  ]}
                >
                  {item.month}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        <Text style={styles.sectionTitle}>Available Time</Text>
        <View style={styles.timeGrid}>
          {times.map((t) => {
            const active = time === t;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setTime(t)}
                style={[styles.timeChip, active && styles.timeChipActive]}
              >
                <Text style={[styles.timeTxt, active && styles.timeTxtActive]}>
                  {t}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Patient Information</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Patient Name"
            value={patientName}
            onChangeText={setPatientName}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            placeholder="Symptoms"
            value={symptoms}
            onChangeText={setSymptoms}
          />
        </View>
      </View>

      <View style={{ padding: 16 }}>
        <TouchableOpacity
          onPress={handleBook}
          style={{ borderRadius: 28, overflow: "hidden" }}
        >
          <LinearGradient
            colors={["#0DB1E8", "#11C0B2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaBtn}
          >
            <AntDesign name="arrowright" size={18} color="#fff" />
            <Text style={styles.ctaTxt}>Book Appointment</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },

  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff22",
    borderRadius: 12,
    padding: 12,
  },
  docAvatarTop: { width: 56, height: 56, borderRadius: 12 },
  docNameTop: { color: "#fff", fontWeight: "800", fontSize: 16 },
  docMetaTop: { color: "#E5F6FF", marginTop: 4, fontSize: 12 },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  notFoundText: { color: "#666", textAlign: "center" },
  debugBtn: {
    marginTop: 16,
    backgroundColor: "#0DB1E8",
    padding: 10,
    borderRadius: 8,
  },

  sectionTitle: {
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    marginTop: 2,
  },

  // Horizontal date cards
  dayCard: {
    width: 70,
    height: 75, // fixed height for consistency
    borderRadius: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dayCardSelected: {
    backgroundColor: "#0DB1E8",
    borderColor: "#0DB1E8",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  dayText: { fontSize: 12, fontWeight: "600", color: "#374151" },
  dateText: { fontSize: 18, fontWeight: "700", color: "#111" },
  monthText: { fontSize: 12, color: "#6B7280" },
  dayTextSelected: { color: "#fff" },

  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  timeChip: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  timeChipActive: { borderColor: "#0DB1E8", backgroundColor: "#E0F7FD" },
  timeTxt: { color: "#374151", fontWeight: "600" },
  timeTxtActive: { color: "#0284C5" },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 8,
  },

  ctaBtn: {
    height: 50,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  ctaTxt: { color: "#fff", fontWeight: "800", fontSize: 15 },
});
