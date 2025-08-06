// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Timeout ensures router is mounted
    const timer = setTimeout(() => {
      router.replace("/SplashScreen");
    }, 100); // 100ms delay is enough

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
