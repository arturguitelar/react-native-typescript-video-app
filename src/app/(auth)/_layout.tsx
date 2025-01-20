import React from 'react';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function AuthLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack>
    </>
  );
}
