import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function AppointmentsScreen() {
  const categories = [
    { id: 1, name: "Cardiology", icon: "heart" },
    { id: 2, name: "Neurology", icon: "brain" },
    { id: 3, name: "Orthopedics", icon: "walk" },
    { id: 4, name: "Pediatrics", icon: "happy" },
    { id: 5, name: "Dermatology", icon: "leaf" },
  ];

  const doctors = [
    { id: 1, name: "Dr. Sarah Lee", specialty: "Cardiologist", rating: 4.9, image: require("../../assets/images/doctor1.png") },
    { id: 2, name: "Dr. Michael Chen", specialty: "Neurologist", rating: 4.8, image: require("../../assets/images/doctor2.png") },
    { id: 3, name: "Dr. Priya Singh", specialty: "Orthopedic", rating: 4.7, image: require("../../assets/images/doctor3.png") },
  ];

  const filters = ["Top Rated", "Nearest", "Available"];

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Top Rated");

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [selectedCategory, selectedFilter]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Title */}
      <Text style={styles.pageTitle}>Book Appointments</Text>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => setSelectedCategory(cat.id)}
            style={styles.categoryWrapper}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={
                selectedCategory === cat.id
                  ? ["#0DB1E8", "#11C0B2"]
                  : ["#f1f1f1", "#f1f1f1"]
              }
              style={[
                styles.categoryCard,
                selectedCategory === cat.id && styles.categorySelected,
              ]}
            >
              <Ionicons
                name={cat.icon}
                size={24}
                color={selectedCategory === cat.id ? "#fff" : "#0DB1E8"}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.id && { color: "#fff" },
                ]}
              >
                {cat.name}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Doctors list */}
      <Text style={styles.sectionTitle}>Recent Doctors</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {doctors.map((doc) => (
            <View key={doc.id} style={styles.doctorCard}>
              <Image source={doc.image} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{doc.name}</Text>
              <Text style={styles.doctorSpecialty}>{doc.specialty}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{doc.rating}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Filters */}
      <Text style={styles.sectionTitle}>Filters</Text>
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => setSelectedFilter(filter)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={
                selectedFilter === filter
                  ? ["#0DB1E8", "#11C0B2"]
                  : ["#f1f1f1", "#f1f1f1"]
              }
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterSelected,
              ]}
            >
              <Text
                style={{
                  color: selectedFilter === filter ? "#fff" : "#0DB1E8",
                  fontWeight: "600",
                }}
              >
                {filter}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  pageTitle: { fontSize: 22, fontWeight: "bold", color: "#0284C5", marginBottom: 15 },
  categoryWrapper: { marginRight: 12 },
  categoryCard: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
  },
  categoryText: { marginLeft: 8, fontWeight: "500", color: "#0DB1E8" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginVertical: 15, color: "#333" },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    alignItems: "center",
    elevation: 5,
    width: 130,
  },
  doctorImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  doctorName: { fontSize: 14, fontWeight: "600", textAlign: "center" },
  doctorSpecialty: { fontSize: 12, color: "#888", textAlign: "center" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratingText: { fontSize: 12, marginLeft: 4, color: "#555" },
  filterRow: { flexDirection: "row", justifyContent: "space-between" },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    elevation: 3,
  },
});
