import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // ✅ import gradient

export default function LogoScreen() {
  const router = useRouter();

  const handleNext = () => {
    // router.push('/onboarding/Onboarding_1');
    router.push('/(tabs)/AppointmentsScreen');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* ✅ Gradient Button */}
      <Pressable style={styles.buttonWrapper} onPress={handleNext}>
        <LinearGradient
          colors={['#0284C5', '#11C0B2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.nextButton}
        >
          <Text style={styles.nextText}>
            Next <AntDesign name="arrowright" size={18} color="#fff" />
          </Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f8ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 30,
    overflow: 'hidden', // 🧼 necessary for gradient border radius
  },
  nextButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
