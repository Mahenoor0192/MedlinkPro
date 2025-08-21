// app/_utils/auth.ts
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";

// Save
export const saveToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (err) {
    console.error("Error saving token:", err);
  }
};

// Get
export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error("Error retrieving token:", err);
    return null;
  }
};

// Delete
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (err) {
    console.error("Error deleting token:", err);
  }
};
