import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { Tabs, Redirect } from 'expo-router';

import { icons } from '@/constants';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 pt-12">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#131322',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          },
        }}
      >
        {tabsScreens.map((item, index) => (
          <Tabs.Screen
            key={index}
            name={item.screenName}
            options={{
              title: item.title,
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={item.icon}
                  color={color}
                  name={item.title}
                  focused={focused}
                />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
}

const tabsScreens = [
  {
    screenName: 'home',
    title: 'Home',
    icon: icons.home,
  },
  {
    screenName: 'create',
    title: 'Create',
    icon: icons.plus,
  },
  {
    screenName: 'profile',
    title: 'Profile',
    icon: icons.profile,
  },
  {
    screenName: 'bookmark',
    title: 'Saved',
    icon: icons.bookmark,
  },
];
