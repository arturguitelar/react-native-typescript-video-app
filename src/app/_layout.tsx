import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import '../styles/global.css';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
