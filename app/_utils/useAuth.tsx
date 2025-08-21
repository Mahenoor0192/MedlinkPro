// app/_utils/useAuth.ts
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export function useAuth() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync("token");

        if (token) {
          const decoded: any = jwtDecode(token);

          // Example JWT fields: { id, username, role, email }
          setUser({
            id: decoded?.id,
            username: decoded?.username,
            role: decoded?.role?.toLowerCase(),
          });
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  return { checkingAuth, user };
}
