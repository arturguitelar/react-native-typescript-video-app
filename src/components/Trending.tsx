import { Text, FlatList } from 'react-native';
import React from 'react';

export function Trending({ posts }: any) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    ></FlatList>
  );
}
