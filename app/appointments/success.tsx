import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { HOSPITALS } from "../appointments/data/appointments";

export default function Success() {
  const { hid, did, date, time } = useLocalSearchParams<{
    hid: string; did: string; date: string; time: string;
  }>();
  const router = useRouter();

  const { hospital, doctor } = useMemo(() => {
    const h = HOSPITALS.find(x => x.id === hid);
    const d = h?.doctors.find(x => x.id === did);
    return { hospital: h, doctor: d };
  }, [hid, did]);

  return (
    <View style={{ flex:1, backgroundColor:"#F7FAFC", padding:16, justifyContent:"center" }}>
      <View style={styles.card}>
        <LinearGradient colors={["#0DB1E8","#11C0B2"]} style={styles.iconWrap}>
          <AntDesign name="check" size={28} color="#fff" />
        </LinearGradient>

        <Text style={styles.title}>Appointment Confirmed!</Text>
        <Text style={styles.sub}>Your appointment has been successfully booked</Text>

        <View style={styles.detailBox}>
          <Text style={styles.label}>Hospital</Text>
          <Text style={styles.value}>{hospital?.name}</Text>

          <Text style={[styles.label,{ marginTop:8 }]}>Doctor</Text>
          <Text style={styles.value}>{doctor?.name}</Text>

          <Text style={[styles.label,{ marginTop:8 }]}>Date</Text>
          <Text style={styles.value}>{date}</Text>

          <Text style={[styles.label,{ marginTop:8 }]}>Time</Text>
          <Text style={styles.value}>{time}</Text>
        </View>

        <TouchableOpacity onPress={() => router.replace("/(tabs)/appointments")} style={{ borderRadius:28, overflow:"hidden", marginTop:10 }}>
          <LinearGradient colors={["#0DB1E8","#11C0B2"]} start={{x:0,y:0}} end={{x:1,y:0}} style={styles.ctaBtn}>
            <Text style={styles.ctaTxt}>Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card:{ backgroundColor:"#fff", borderRadius:16, padding:20, alignItems:"center", elevation:4 },
  iconWrap:{ width:70, height:70, borderRadius:35, alignItems:"center", justifyContent:"center", marginBottom:10 },
  title:{ fontSize:18, fontWeight:"800", color:"#111827" },
  sub:{ color:"#6B7280", textAlign:"center", marginTop:6, marginBottom:12 },
  detailBox:{ width:"100%", backgroundColor:"#F9FAFB", borderRadius:12, padding:14, marginTop:4 },
  label:{ color:"#6B7280", fontSize:12 },
  value:{ color:"#111827", fontWeight:"700", marginTop:2 },
  ctaBtn:{ height:48, borderRadius:28, alignItems:"center", justifyContent:"center", paddingHorizontal:18 },
  ctaTxt:{ color:"#fff", fontWeight:"800" },
});
