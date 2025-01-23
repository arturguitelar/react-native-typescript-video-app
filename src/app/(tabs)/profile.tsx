import { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams } from 'expo-router';

import { useGlobalContext } from '@/src/context/GlobalProvider';
import { useApi } from '@/src/services/http/hooks/useApi';
import { api } from '@/src/services/http/api';
import { EmptyListState } from '@/src/components/EmptyListState';
import { SearchInput } from '@/src/components/SearchInput';
import { Post } from '@/src/services/http/models/post';
import { VideoCard } from '@/src/components/VideoCard';
import { icons, images } from '@/constants';
import { InfoBox } from '@/src/components/InfoBox';

export default function Profile() {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useApi(() =>
    api.posts.getUserPosts(user?.id as string)
  );

  const logout = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as Post[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={user?.avatar}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />

              <InfoBox
                title="1.5k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyListState
            title="No Videos Found"
            subtitle="No videos found for this search query."
          />
        )}
      ></FlatList>
    </SafeAreaView>
  );
}
