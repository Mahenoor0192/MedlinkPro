// context/FormDataContext.tsx
import React, { createContext, useContext, useState } from "react";

export const FormDataContext = createContext(null);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Screen 1
    name: "",
    email: "",
    dob: null, // Date or null
    gender: "",
    bloodGroup: "",
    // Screen 2
    height: 170,
    weight: 70,
    // Screen 3
    chronicDiseases: [], // array of strings
    otherDisease: "",
  });

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const ctx = useContext(FormDataContext);
  if (!ctx) throw new Error("useFormData must be used inside FormDataProvider");
  return ctx;
};
