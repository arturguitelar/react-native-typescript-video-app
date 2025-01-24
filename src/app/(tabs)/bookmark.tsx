import { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyListState } from '@/src/components/EmptyListState';
import { SearchInput } from '@/src/components/SearchInput';
import { useApi } from '@/src/services/http/hooks/useApi';
import { Post } from '@/src/services/http/models/post';
import { VideoCard } from '@/src/components/VideoCard';
import { api } from '@/src/services/http/api';

export default function Bookmarks() {
  const { data: posts, refetch } = useApi(api.posts.getSavedPosts);

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
          <View className="mt-6 mb-10 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-2xl font-psemibold text-white">
                  Saved Videos
                </Text>
              </View>
            </View>

            <SearchInput placeholder="Search your saved videos" />
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
