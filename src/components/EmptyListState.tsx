import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';
import { CustomButton } from './CustomButton';
import { router } from 'expo-router';

interface Props {
  title: string;
  subtitle: string;
}

export function EmptyListState({ title, subtitle }: Props) {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push('/(tabs)/create')}
        containerStyles="w-full my-5"
      />
    </View>
  );
}
