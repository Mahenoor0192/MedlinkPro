import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const prescriptions = [
  {
    id: "1",
    title: "General Checkup",
    doctor: "Dr. Robert Smith • Cardiologist",
    date: "15 June 2023",
  },
  {
    id: "2",
    title: "Fever & Cold",
    doctor: "Dr. Emily Johnson • General Physician",
    date: "23 May 2023",
  },
  {
    id: "3",
    title: "Annual Checkup",
    doctor: "Dr. Michael Brown • Internal Medicine",
    date: "10 March 2023",
  },
];

const labReports = [
  {
    id: "1",
    title: "Complete Blood Count",
    doctor: "Requested by: Dr. Sarah Johnson",
    date: "15 June 2023",
    facility: "City Medical Lab",
    status: "Normal",
  },
  {
    id: "2",
    title: "Lipid Profile",
    doctor: "Requested by: Dr. Mark Williams",
    date: "03 May 2023",
    facility: "HealthFirst Diagnostics",
    status: "Attention",
  },
  {
    id: "3",
    title: "Liver Function Test",
    doctor: "Requested by: Dr. James Miller",
    date: "22 Apr 2023",
    facility: "City Medical Lab",
    status: "Abnormal",
  },
];

export default function MedicalRecordsScreen() {
  const [activeTab, setActiveTab] = useState("prescriptions");
  const [search, setSearch] = useState("");

  const data =
    activeTab === "prescriptions"
      ? prescriptions.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase())
        )
      : labReports.filter((r) =>
          r.title.toLowerCase().includes(search.toLowerCase())
        );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.title}</Text>
        {item.status && (
          <LinearGradient
            colors={
              item.status === "Normal"
                ? ["#34D399", "#10B981"]
                : item.status === "Attention"
                ? ["#FBBF24", "#F59E0B"]
                : ["#EF4444", "#DC2626"]
            }
            style={styles.statusChip}
          >
            <Text style={styles.statusTxt}>{item.status}</Text>
          </LinearGradient>
        )}
      </View>

      <Text style={styles.subtitle}>{item.doctor}</Text>
      <Text style={styles.date}>
        <Ionicons name="calendar-outline" size={14} color="#6B7280" />{" "}
        {item.date}{" "}
        {item.facility && (
          <>
            {"  "}
            <Ionicons name="location-outline" size={14} color="#6B7280" />{" "}
            {item.facility}
          </>
        )}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewBtn}>
          <Ionicons name="eye-outline" size={16} color="#0284C7" />
          <Text style={styles.viewTxt}>View</Text>
        </TouchableOpacity>
        <LinearGradient
          colors={["#0DB1E8", "#11C0B2"]}
          style={styles.downloadBtn}
        >
          <Ionicons name="download-outline" size={16} color="#fff" />
          <Text style={styles.downloadTxt}>Download</Text>
        </LinearGradient>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Gradient Header with Back + Title + Bell + Search */}
      <LinearGradient colors={["#0DB1E8", "#11C0B2"]} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTxt}>Medical Records</Text>

          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#6B7280" />
          <TextInput
            placeholder={`Search ${activeTab}...`}
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="calendar-clear-outline" size={20} color="#6B7280" />
        </View>
      </LinearGradient>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "prescriptions" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("prescriptions")}
        >
          <MaterialCommunityIcons
            name="pill"
            size={16}
            color={activeTab === "prescriptions" ? "#0DB1E8" : "#6B7280"}
          />
          <Text
            style={[
              styles.tabTxt,
              activeTab === "prescriptions" && styles.activeTabTxt,
            ]}
          >
            Prescriptions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "labs" && styles.activeTab]}
          onPress={() => setActiveTab("labs")}
        >
          <MaterialCommunityIcons
            name="flask"
            size={16}
            color={activeTab === "labs" ? "#0DB1E8" : "#6B7280"}
          />
          <Text
            style={[styles.tabTxt, activeTab === "labs" && styles.activeTabTxt]}
          >
            Lab Reports
          </Text>
        </TouchableOpacity>
      </View>

      {/* Records List */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTxt: { fontSize: 18, fontWeight: "700", color: "#fff" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#111827" },

  tabs: {
    flexDirection: "row",
    margin: 16,
    backgroundColor: "#E5E7EB",
    borderRadius: 14,
    overflow: "hidden",
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
  },
  activeTab: { backgroundColor: "#fff", elevation: 3, borderRadius: 14 },
  tabTxt: { fontSize: 14, fontWeight: "600", color: "#6B7280" },
  activeTabTxt: { color: "#0DB1E8", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 16, fontWeight: "700", color: "#111" },
  subtitle: { fontSize: 13, color: "#6B7280", marginVertical: 4 },
  date: { fontSize: 12, color: "#6B7280", marginBottom: 8 },

  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTxt: { color: "#fff", fontSize: 12, fontWeight: "600" },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  viewBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
    backgroundColor: "#E0F2FE",
    borderRadius: 10,
    paddingVertical: 10,
  },
  viewTxt: { color: "#0284C7", fontWeight: "700" },
  downloadBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 10,
  },
  downloadTxt: { color: "#fff", fontWeight: "700" },
});
