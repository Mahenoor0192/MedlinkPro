// app/onboarding/Onboarding_1.tsx
import React from 'react';
import { View, StyleSheet, Image, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Onboarding_1() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/Onboarding_3');
  };

  return (
    <View
      style={styles.container}
    >
    
      <Image
        source={require('../../assets/images/onboarding_2.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Pressable style={styles.arrowWrapper} onPress={handleNext}>
        <LinearGradient
          colors={['#0284C5', '#11C0B2']}
          style={styles.arrowButton}
        >
          <AntDesign name="arrowright" size={24} color="#fff" />
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 500,
    marginBottom: 30,
  },
  arrowWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  arrowButton: {
    padding: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
