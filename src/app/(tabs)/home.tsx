import { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGlobalContext } from '@/src/context/GlobalProvider';
import { EmptyListState } from '@/src/components/EmptyListState';
import { SearchInput } from '@/src/components/SearchInput';
import { Trending } from '@/src/components/Trending';
import { api } from '@/src/services/http/api';
import { useApi } from '@/src/services/http/hooks/useApi';
import { Post } from '@/src/services/http/models/post';
import { VideoCard } from '@/src/components/VideoCard';
import { images } from '@/constants';

export default function Home() {
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useApi(api.posts.getAllPosts);

  const { data: latestPosts } = useApi(api.posts.getLatestPosts);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as Post[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Wellcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>

            <SearchInput initialQuery="" />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending posts={(latestPosts as Post[]) ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyListState
            title="No Videos Found"
            subtitle="Be the first one to upload a video."
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      ></FlatList>
    </SafeAreaView>
  );
}
