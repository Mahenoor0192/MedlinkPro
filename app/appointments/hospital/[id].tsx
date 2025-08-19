import { AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HOSPITALS } from "../data/appointments";

export default function HospitalDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const hospital = useMemo(() => HOSPITALS.find((h) => h.id === id), [id]);

  if (!hospital) return null;

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
          <Text style={styles.headerTitle}>Hospital Details</Text>
          <Feather name="bell" size={20} color="#fff" />
        </View>

        {/* New hospital card like DoctorBooking */}
        <View style={styles.hospitalCard}>
          <Image
            source={{ uri: `https://picsum.photos/seed/${hospital.id}/200` }}
            style={styles.hospitalImg}
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.hospitalName}>{hospital.name}</Text>
            <Text style={styles.hospitalMeta}>
              ⭐ {hospital.rating.toFixed(1)} ({hospital.reviews} reviews)
            </Text>
            <Text style={styles.hospitalMeta}>📍 View Location</Text>
          </View>
        </View>
      </LinearGradient>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        ListHeaderComponent={
          <>
            <View style={styles.aboutCard}>
              <Text style={styles.cardTitle}>About Hospital</Text>
              <Text style={styles.aboutText}>
                City General offers advanced medical care with expert doctors,
                modern facilities, and compassionate staff. Comprehensive
                services across specialties. {hospital.openInfo}.
              </Text>
              <View style={styles.pillRow}>
                <Text style={styles.pill}>24/7 Available</Text>
                <Text style={styles.pillOutline}>Accredited</Text>
              </View>
            </View>

            <Text style={[styles.cardTitle, { marginTop: 12 }]}>
              Our Doctors
            </Text>
          </>
        }
        data={hospital.doctors}
        keyExtractor={(d) => d.id}
        renderItem={({ item }) => (
          <View style={styles.docCard}>
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <Image
                source={{ uri: `https://i.pravatar.cc/100?u=${item.id}` }}
                style={styles.docAvatar}
              />
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={styles.docName}>{item.name}</Text>
                <Text style={styles.docMeta}>
                  {cap(item.specialty)} • {item.years} years
                </Text>
                <Text style={styles.docMeta}>
                  ⭐ {item.rating.toFixed(1)} ({item.reviews})
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/appointments/doctor/[id]",
                    params: { id: String(item.id) },
                  })
                }
                style={styles.bookNow}
              >
                <Text style={styles.bookNowTxt}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const styles = StyleSheet.create({
  header: {
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 18,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  headerTitle: { color: "#fff", fontWeight: "700", fontSize: 16 },
  // hTop: { flexDirection: "row", gap: 12, alignItems: "center" },
  // hAvatar: {
  //   width: 56,
  //   height: 56,
  //   borderRadius: 12,
  //   overflow: "hidden",
  //   backgroundColor: "#ffffff22",
  // },
  // hImg: { width: "100%", height: "100%" },
  // hName: { color: "#fff", fontWeight: "800", fontSize: 16 },
  // hMeta: { color: "#E5F6FF", marginTop: 4, fontSize: 12 },
  hospitalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff22",
    borderRadius: 12,
    padding: 12,
  },

  hospitalImg: {
    width: 56,
    height: 56,
    borderRadius: 12,
  },

  hospitalName: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  hospitalMeta: {
    color: "#E5F6FF",
    marginTop: 4,
    fontSize: 12,
  },

  link: {
    color: "#fff",
    textDecorationLine: "underline",
    marginTop: 2,
    fontSize: 12,
  },

  aboutCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  aboutText: { color: "#4B5563", fontSize: 12, lineHeight: 18 },
  pillRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  pill: {
    backgroundColor: "#E8FFF7",
    color: "#059669",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "700",
    fontSize: 11,
  },
  pillOutline: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    color: "#374151",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: "600",
    fontSize: 11,
  },

  docCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
  },

  docAvatar: { width: 44, height: 44, borderRadius: 22, margin: 10 },
  docName: { fontWeight: "700", color: "#111827" },
  docMeta: { color: "#6B7280", fontSize: 12, marginTop: 2 },
  bookNow: {
    backgroundColor: "#EEF9FF",
    borderRadius: 22,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  bookNowTxt: {
    color: "#0284C5",
    fontWeight: "700",
    fontSize: 12,
    alignItems: "",
  },
});
