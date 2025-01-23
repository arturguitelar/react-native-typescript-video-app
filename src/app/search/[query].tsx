import { useEffect } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useLocalSearchParams } from 'expo-router';

import { images } from '@/constants';
import { EmptyListState } from '@/src/components/EmptyListState';
import { SearchInput } from '@/src/components/SearchInput';
import { api } from '@/src/services/http/api';
import { useApi } from '@/src/services/http/hooks/useApi';
import { Post } from '@/src/services/http/models/post';
import { VideoCard } from '@/src/components/VideoCard';

export default function Search() {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useApi(() =>
    api.posts.searchPosts(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as Post[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
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

            <View className="m-t6 mb-8">
              <SearchInput initialQuery={query as string} />
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

      <View className="items-center">
        <Link className="text-white font-psemibold py-4" href="/">
          Go to home screen
        </Link>
      </View>
    </SafeAreaView>
  );
}
