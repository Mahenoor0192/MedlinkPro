// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
// import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';



// export default function Login() {
//   const [phone, setPhone] = useState('');
//   const router = useRouter();


//   const handleContinue = () => {
//     if (phone.length >= 10) {
//       router.push({ pathname: '/auth/Verify', params: { phone } });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../../assets/images/doctor.png')} style={styles.doctorimage} />
//       {/* <Image source={require('../../assets/circle.png')} style={styles.circleimage} /> */}
//       <Image source={require('../../assets/images/star.png')} style={styles.starimage} />
//       <View style={styles.card}>
//         <Text style={styles.title}>Welcome to MedlinkPro</Text>
//         <Text style={styles.subtitle}>Enter your phone number below to create your account or login</Text>
//         <View style={styles.inputContainer}>
//           <Text style={styles.countryCode}>+91</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="0000-000-000"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//         </View>
//         <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//           <Text style={styles.buttonText}>Continue</Text>
//         </TouchableOpacity>

//         <Text style={styles.or}>OR</Text>

//         <TouchableOpacity style={styles.googleButton}>
//           <Text style={styles.googleText}>Sign in with Google</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#0DB1E8' },
//   doctorimage: { width: 160, height: 233, marginTop: 80, right:0, top: 10 },
//   // circleimage: { width: 160, height: 233, marginTop: 80, right:0, top: 10, position: 'absolute' },
//   starimage: { width: 360, height: 360, top:-100, right: -100, position: 'absolute' },
//   card: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     padding: 50,
//     marginTop: 0,
//     flex: 1
//   },
//   title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
//   subtitle: { textAlign: 'center', color: '#666', marginBottom: 20 },
//   inputContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#eee',
//     borderRadius: 30,
//     padding: 10,
//     alignItems: 'center'
//   },
//   countryCode: { fontWeight: 'bold', marginRight: 8 },
//   input: { flex: 1, fontSize: 16 },
//   continueButton: {
//     backgroundColor: '#0DB1E8',
//     paddingVertical: 14,
//     borderRadius: 30,
//     marginTop: 20
//   },
//   buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
//   or: { textAlign: 'center', color: '#aaa', marginVertical: 12 },
//   googleButton: {
//     backgroundColor: '#eee',
//     paddingVertical: 14,
//     borderRadius: 30
//   },
//   googleText: { textAlign: 'center', fontWeight: 'bold' }
// });



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (phone.length >= 10) {
      router.push({ pathname: '/auth/Verify', params: { phone } });
    }
  };

  return (
    <LinearGradient
      colors={['#0284C5', '#11C0B2']} // Gradient background
      style={styles.gradientBackground}
    >
      <Image source={require('../../assets/images/doctor.png')} style={styles.doctorimage} />
      <Image source={require('../../assets/images/star.png')} style={styles.starimage} />

      <View style={styles.card}>
        <Text style={styles.title}>Welcome to MedlinkPro</Text>
        <Text style={styles.subtitle}>Enter your phone number below to create your account or login</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.input}
            placeholder="0000-000-000"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* Gradient Button */}
        <Pressable style={styles.buttonWrapper} onPress={handleContinue}>
          <LinearGradient
            colors={['#0284C5', '#11C0B2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.continueButton}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </LinearGradient>
        </Pressable>

        <Text style={styles.or}>OR</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  doctorimage: {
    width: 160,
    height: 233,
    marginTop: 80,
    right: 0,
    top: 10,
  },
  starimage: {
    width: 360,
    height: 360,
    top: -100,
    right: -100,
    position: 'absolute',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 50,
    marginTop: 0,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 30,
    padding: 10,
    alignItems: 'center',
  },
  countryCode: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonWrapper: {
    marginTop: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  continueButton: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  or: {
    textAlign: 'center',
    color: '#aaa',
    marginVertical: 12,
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 30,
  },
  googleText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
