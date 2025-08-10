// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import { FormDataProvider } from "../Context/FormDataContext"; // <-- make sure this path is correct

export default function RootLayout() {
  return (
    <FormDataProvider>
      <Stack
        screenOptions={{
          headerShown: false, // hides headers for all screens
        }}
      />
    </FormDataProvider>
  );
}
