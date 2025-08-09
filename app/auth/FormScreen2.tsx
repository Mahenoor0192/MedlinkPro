// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';
// import Slider from '@react-native-community/slider';
// import { FontAwesome5 } from '@expo/vector-icons';

// export default function FormScreen2() {
//   const router = useRouter();
//   const [height, setHeight] = useState(170);
//   const [weight, setWeight] = useState(70);

//   const calculateBMI = () => {
//     const heightInMeters = height / 100;
//     const bmi = weight / (heightInMeters * heightInMeters);
//     return bmi.toFixed(1);
//   };

//   const getBMICategory = (bmi: number) => {
//     if (bmi < 18.5) return 'Underweight';
//     else if (bmi < 25) return 'Normal weight';
//     else if (bmi < 30) return 'Overweight';
//     else return 'Obese';
//   };

//   const bmi = parseFloat(calculateBMI());
//   const bmiCategory = getBMICategory(bmi);

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Progress bar */}
//       <View style={styles.progressContainer}>
//         <View style={styles.progressTextRow}>
//           <Text style={styles.stepText}>Step 2 of 4</Text>
//           <Text style={styles.percentText}>50%</Text>
//         </View>
//         <View style={styles.progressBarBackground}>
//           <LinearGradient
//             colors={['#0284C5', '#11C0B2']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.progressBarFill}
//           />
//         </View>
//       </View>

//       {/* Icon and title */}
//       <View style={styles.iconCircle}>
//         <FontAwesome5 name="ruler" size={28} color="#fff" />
//       </View>

//       <Text style={styles.title}>Body Blueprint</Text>
//       <Text style={styles.subtitle}>Help us understand your physical measurements</Text>

//       {/* Height Slider */}
//       <View style={styles.card}>
//         <Text style={styles.cardLabel}>
//           <FontAwesome5 name="ruler" size={14} color="#00bcd4" /> Height: <Text style={{ fontWeight: 'bold' }}>{height} cm</Text>
//         </Text>
//         <Slider
//           style={{ width: '100%' }}
//           minimumValue={120}
//           maximumValue={220}
//           step={1}
//           minimumTrackTintColor="#11C0B2"
//           maximumTrackTintColor="#ccc"
//           thumbTintColor="#11C0B2"
//           value={height}
//           onValueChange={setHeight}
//         />
//         <View style={styles.rangeLabelRow}>
//           <Text style={styles.rangeLabel}>120 cm</Text>
//           <Text style={styles.rangeLabel}>220 cm</Text>
//         </View>
//       </View>

//       {/* Weight Slider */}
//       <View style={styles.card}>
//         <Text style={styles.cardLabel}>
//           <FontAwesome5 name="weight" size={14} color="#00bcd4" /> Weight: <Text style={{ fontWeight: 'bold' }}>{weight} kg</Text>
//         </Text>
//         <Slider
//           style={{ width: '100%' }}
//           minimumValue={30}
//           maximumValue={200}
//           step={1}
//           minimumTrackTintColor="#11C0B2"
//           maximumTrackTintColor="#ccc"
//           thumbTintColor="#11C0B2"
//           value={weight}
//           onValueChange={setWeight}
//         />
//         <View style={styles.rangeLabelRow}>
//           <Text style={styles.rangeLabel}>30 kg</Text>
//           <Text style={styles.rangeLabel}>200 kg</Text>
//         </View>
//       </View>

//       {/* BMI Card */}
//       <View style={styles.bmiCard}>
//         <Text style={styles.bmiTitle}>BMI Preview</Text>
//         <Text style={styles.bmiValue}>{bmi}</Text>
//         <Text style={styles.bmiCategory}>{bmiCategory}</Text>
//       </View>

//       {/* Buttons */}
//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.prevButton} onPress={() => router.back()}>
//           <Text style={styles.prevText}>Previous</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => router.push('/auth/FormScreen3')}>
//           <LinearGradient
//             colors={['#0284C5', '#11C0B2']}
//             style={styles.nextButton}
//           >
//             <Text style={styles.nextText}>Next Step</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#f5f9ff',
//     padding: 20,
//     paddingTop: 60,
//     flexGrow: 1,
//   },
//   progressContainer: {
//     marginBottom: 20,
//   },
//   progressTextRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//   },
//   stepText: {
//     color: '#0284C5',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   percentText: {
//     color: '#999',
//     fontSize: 12,
//   },
//   progressBarBackground: {
//     height: 6,
//     backgroundColor: '#eee',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   progressBarFill: {
//     width: '50%',
//     height: 6,
//     borderRadius: 20,
//   },
//   iconCircle: {
//     alignSelf: 'center',
//     backgroundColor: '#11C0B2',
//     padding: 16,
//     borderRadius: 50,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#0284C5',
//     textAlign: 'center',
//   },
//   subtitle: {
//     textAlign: 'center',
//     color: '#888',
//     marginBottom: 30,
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   cardLabel: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#333',
//   },
//   rangeLabelRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 8,
//   },
//   rangeLabel: {
//     fontSize: 12,
//     color: '#999',
//   },
//   bmiCard: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.05,
//     shadowOffset: { width: 0, height: 4 },
//     shadowRadius: 10,
//     elevation: 4,
//     marginBottom: 30,
//   },
//   bmiTitle: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 8,
//   },
//   bmiValue: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#0284C5',
//   },
//   bmiCategory: {
//     fontSize: 14,
//     color: '#666',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   prevButton: {
//     backgroundColor: '#eee',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//   },
//   prevText: {
//     color: '#555',
//     fontWeight: 'bold',
//   },
//   nextButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 30,
//   },
//   nextText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import Slider from "@react-native-community/slider";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function FormScreen2() {
  const router = useRouter();

  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const calculateBMI = () => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    return bmi.toFixed(1);
  };

  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return "Underweight";
    else if (bmi >= 18.5 && bmi <= 24.9) return "Normal weight";
    else if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    else return "Obese";
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : undefined}
    //   style={{ flex: 1 }}
    // >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 10,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressTextRow}>
              <Text style={styles.stepText}>Step 2 of 4</Text>
              <Text style={styles.percentText}>50%</Text>
            </View>
            <View style={styles.progressBarBackground}>
              <LinearGradient
                colors={["#0284C5", "#11C0B2"]}
                style={styles.progressBarFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              />
            </View>
          </View>

          {/* Animated icon */}
          <Animated.View
            style={[
              styles.animatedIconWrapper,
              { transform: [{ translateY: animatedValue }] },
            ]}
          >
            <LinearGradient
              colors={["#0284C5", "#11C0B2"]}
              style={styles.iconCircle}
            >
              <Image
                source={require("../../assets/images/ruler.png")}
                style={styles.iconImage}
              />
            </LinearGradient>
          </Animated.View>

          {/* Heading */}
          <Text style={styles.title}>Body Blueprint</Text>
          <Text style={styles.subtitle}>
            Help us understand your physical measurements
          </Text>

          {/* Height Card */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}> Height: {height} cm</Text>
            <Slider
              minimumValue={120}
              maximumValue={220}
              value={height}
              step={1}
              onValueChange={(value) => setHeight(value)}
              minimumTrackTintColor="#11C0B2"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#0284C5"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>120 cm</Text>
              <Text style={styles.sliderLabel}>220 cm</Text>
            </View>
          </View>

          {/* Weight Card */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}> Weight: {weight} kg</Text>
            <Slider
              minimumValue={30}
              maximumValue={200}
              value={weight}
              step={1}
              onValueChange={(value) => setWeight(value)}
              minimumTrackTintColor="#11C0B2"
              maximumTrackTintColor="#ddd"
              thumbTintColor="#0284C5"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>30 kg</Text>
              <Text style={styles.sliderLabel}>200 kg</Text>
            </View>
          </View>

          {/* BMI Preview */}
          <View style={styles.bmiCard}>
            <Text style={styles.bmiLabel}>BMI Preview</Text>
            <Text style={styles.bmiValue}>{calculateBMI()}</Text>
            <Text style={styles.bmiCategory}>{getBMICategory()}</Text>
          </View>

          {/* Navigation Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.prevButton}
              onPress={() => router.back()}
            >
              <Text style={styles.prevText}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/auth/FormScreen3")}>
              <LinearGradient
                colors={["#0284C5", "#11C0B2"]}
                style={styles.nextButton}
              >
                <Text style={styles.nextText}>Next Step</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  stepText: {
    color: "#0284C5",
    fontWeight: "600",
    fontSize: 14,
  },
  percentText: {
    color: "#999",
    fontSize: 12,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 20,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "50%",
    height: 6,
    borderRadius: 20,
  },
  animatedIconWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 30,
    height: 30,
    tintColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0284C5",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#888",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    marginBottom: 50,
    marginTop: 20,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0284C5",
    marginBottom: 20,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#777",
  },
  bmiCard: {
    backgroundColor: "#f1f5ff",
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  bmiLabel: {
    color: "#888",
    marginBottom: 8,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0284C5",
  },
  bmiCategory: {
    color: "#888",
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  prevButton: {
    backgroundColor: "#eee",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },
  prevText: {
    color: "#888",
    fontWeight: "600",
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
