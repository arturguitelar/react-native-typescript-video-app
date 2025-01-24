import React, { useState } from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';

import * as Animatable from 'react-native-animatable';

import { Post } from '../services/http/models/post';
import { icons } from '@/constants';
import { VideoPlayer } from './VideoPlayer';

const zoomIn: {} = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut: {} = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item }: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem.key === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoPlayer
          source={{ uri: item.videoUrl }}
          onPlaybackStatusUpdate={(status) => {
            // if(status.didJustFinish) setPlay(false); todo: find another way
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={item.thumbnail}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
          {/* <ImageBackground
            source={item.thumbnail}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
          /> */}
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export function Trending({ posts }: { posts: Post[] }) {
  const [activeItem, setActiveItem] = useState<Post>(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0] as Post);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    ></FlatList>
  );
}
