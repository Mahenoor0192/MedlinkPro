// import { StyleSheet, Text, View } from "react-native";
// import React from "react";

// const ProfileScreen = () => {
//   return (
//     <View>
//       <Text>ProfileScreen</Text>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   text: { fontSize: 20 },
// });


import { View, Text, TouchableOpacity } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";

export default function ProfileScreen() {
  // const router = useRouter();

  // const handleLogout = async () => {
  //   await AsyncStorage.removeItem("token");
  //   router.replace("/auth/LoginScreen");
  // };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Profile Screen</Text>
      <TouchableOpacity
        // onPress={handleLogout}
        style={{ backgroundColor: "red", padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
