import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { HOSPITALS, SPECIALTIES, RECENT_DOCTORS, type SpecialtyId } from "../appointments/data/appointments";

type FilterKey = "nearest" | "top" | "available";

export default function HospitalSelection() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState<SpecialtyId | null>(null);
  const [filter, setFilter] = useState<FilterKey>("nearest");

  const hospitals = useMemo(() => {
    let list = HOSPITALS.filter(h =>
      !activeSpecialty ? true : h.specialties.includes(activeSpecialty)
    );

    if (q.trim()) list = list.filter(h => h.name.toLowerCase().includes(q.trim().toLowerCase()));

    if (filter === "nearest") list = [...list].sort((a,b) => a.distanceKm - b.distanceKm);
    if (filter === "top")     list = [...list].sort((a,b) => b.rating - a.rating);
    if (filter === "available") list = [...list].filter(h => h.isOpen);

    return list;
  }, [q, activeSpecialty, filter]);

  return (
    <View style={styles.screen}>
      {/* Top app bar */}
      <LinearGradient colors={["#0DB1E8", "#11C0B2"]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity activeOpacity={0.8}><AntDesign name="arrowleft" size={20} color="#fff" /></TouchableOpacity>
          <Text style={styles.headerTitle}>Select Hospital</Text>
          <Ionicons name="notifications-outline" size={20} color="#fff" />
        </View>
        <View style={styles.searchBar}>
          <Feather name="search" size={16} color="#6b7280" />
          <TextInput
            placeholder="Search hospitals, doctors…"
            value={q}
            onChangeText={setQ}
            style={styles.searchInput}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </LinearGradient>

      <FlatList
        contentContainerStyle={{ padding: 16, paddingBottom: 28 }}
        ListHeaderComponent={
          <>
            {/* Specialties grid (non-horizontal) */}
            <Text style={styles.sectionTitle}>Select Specialty</Text>
            <View style={styles.grid}>
              {SPECIALTIES.map(s => {
                const active = activeSpecialty === s.id;
                return (
                  <TouchableOpacity key={s.id} style={[styles.specCard, active && styles.specCardActive]} onPress={() => setActiveSpecialty(active ? null : s.id)}>
                    <LinearGradient colors={active ? ["#0DB1E8","#11C0B2"] : ["#ecfeff","#f0f9ff"]} style={styles.specIconWrap}>
                      <MaterialCommunityIcons name={s.icon as any} size={20} color={active ? "#fff" : "#0284C5"} />
                    </LinearGradient>
                    <Text style={[styles.specLabel, active && { color:"#0284C5", fontWeight:"700"}]}>{s.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Recent doctors (small horizontal strip) */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Your Recent Doctors</Text>
            <View style={styles.recentRow}>
              {RECENT_DOCTORS.map(d => (
                <TouchableOpacity key={d.id} style={styles.recentDoc} onPress={() => router.push({ pathname: "/(tabs)/appointments/doctor/[id]", params: { id: d.id } })}>
                  <Image source={{ uri: `https://i.pravatar.cc/100?u=${d.id}` }} style={styles.avatar} />
                  <Text numberOfLines={1} style={styles.recentName}>{d.name}</Text>
                  <Text style={styles.recentMeta}>{cap(d.specialty)}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Filters */}
            <View style={styles.filterRow}>
              {(["nearest","top","available"] as FilterKey[]).map(k => {
                const active = filter === k;
                return (
                  <TouchableOpacity key={k} onPress={() => setFilter(k)} style={[styles.chip, active && styles.chipActive]}>
                    <Text style={[styles.chipText, active && styles.chipTextActive]}>
                      {k === "nearest" ? "Nearest" : k === "top" ? "Top Rated" : "Available"}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity onPress={() => setActiveSpecialty(null)} style={styles.clearFilter}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 8, marginBottom: 8 }]}>Nearby Hospitals</Text>
          </>
        }
        data={hospitals}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.hospitalName}>{item.name}</Text>
              <Text style={styles.hospitalMeta}>⭐ {item.rating.toFixed(1)} ({item.reviews} reviews)</Text>
              <Text style={styles.hospitalMeta}>📍 {item.address}</Text>
              <Text style={[styles.status, { color: item.isOpen ? "#059669" : "#EA580C" }]}>{item.openInfo}</Text>
            </View>
            <View style={{ alignItems:"flex-end", gap: 8 }}>
              <Text style={styles.distance}>{item.distanceKm.toFixed(1)} km</Text>
              <TouchableOpacity
                style={styles.selectBtnWrap}
                onPress={() => router.push({ pathname: "/(tabs)/appointments/hospital/[id]", params: { id: item.id } })}
              >
                <LinearGradient colors={["#0DB1E8","#11C0B2"]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.selectBtn}>
                  <Text style={styles.selectBtnText}>Select</Text>
                </LinearGradient>
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
  screen: { flex: 1, backgroundColor: "#F7FAFC" },
  header: { paddingTop: 54, paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  headerRow: { flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom: 12 },
  headerTitle: { color:"#fff", fontWeight:"700", fontSize:16 },
  searchBar: { flexDirection:"row", alignItems:"center", gap:8, backgroundColor:"#fff", borderRadius:12, paddingHorizontal:12, height:42, elevation:8, shadowColor:"#00000033" },
  searchInput: { flex:1, fontSize:14, color:"#111827" },

  sectionTitle: { fontSize:14, fontWeight:"700", color:"#111827", marginBottom:8 },
  grid: { flexDirection:"row", flexWrap:"wrap", justifyContent:"space-between" },
  specCard: { width:"32.5%", backgroundColor:"#fff", borderRadius:12, paddingVertical:12, paddingHorizontal:8, marginBottom:10, alignItems:"center", elevation:2 },
  specCardActive: { borderWidth:1.5, borderColor:"#0DB1E8", backgroundColor:"#F0FDFF" },
  specIconWrap: { width:36, height:36, borderRadius:18, alignItems:"center", justifyContent:"center", marginBottom:6 },
  specLabel: { fontSize:12, color:"#374151" },

  recentRow: { flexDirection:"row", gap:12, marginBottom:12 },
  recentDoc: { width:88, backgroundColor:"#fff", borderRadius:12, padding:10, alignItems:"center", elevation:2 },
  avatar: { width:42, height:42, borderRadius:21, marginBottom:6 },
  recentName: { fontSize:11, fontWeight:"700", color:"#111827" },
  recentMeta: { fontSize:10, color:"#6B7280" },

  filterRow: { flexDirection:"row", alignItems:"center", gap:8, marginTop:6, marginBottom:4 },
  chip: { borderWidth:1, borderColor:"#D1D5DB", paddingVertical:6, paddingHorizontal:12, borderRadius:16, backgroundColor:"#fff" },
  chipActive: { borderColor:"#0DB1E8", backgroundColor:"#E0F7FD" },
  chipText: { fontSize:12, color:"#374151", fontWeight:"600" },
  chipTextActive: { color:"#0284C5" },
  clearFilter: { marginLeft:"auto" },
  clearText: { color:"#6B7280", fontSize:12 },

  card: { flexDirection:"row", alignItems:"center", gap:14, backgroundColor:"#fff", padding:14, borderRadius:16, elevation:4, marginBottom:12 },
  hospitalName: { fontSize:14, fontWeight:"700", color:"#111827" },
  hospitalMeta: { fontSize:12, color:"#6B7280", marginTop:2 },
  status: { fontSize:12, marginTop:6, fontWeight:"600" },
  distance: { fontSize:12, color:"#6B7280" },
  selectBtnWrap: { borderRadius:22, overflow:"hidden" },
  selectBtn: { paddingHorizontal:16, paddingVertical:8, borderRadius:22 },
  selectBtnText: { color:"#fff", fontWeight:"700", fontSize:12 },
});
