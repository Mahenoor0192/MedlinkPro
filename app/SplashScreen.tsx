// app/SplashScreen.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { router } from 'expo-router';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/splash.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => router.replace('/LogoScreen')}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Match your theme
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 300,
    height: 300,
  },
});
