import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Post } from '../services/http/models/post';
import { icons } from '@/constants';
import { VideoPlayer } from './VideoPlayer';

interface Props {
  video: Post;
}

export function VideoCard({ video }: Props) {
  const { title, thumbnail, videoUrl, creator } = video;
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flew-row gap-3 items-start">
        <View className="flex flex-row justify-center items-center">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={creator.avatar}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator.username}
            </Text>
          </View>

          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {play ? (
        <VideoPlayer
          videoPath={{ uri: videoUrl }}
          containerStyles="relative justify-center items-center w-full h-60 rounded-xl bg-white/10 mt-3"
          videoStyles="w-full h-60 rounded-xl"
          onPlaybackStatusUpdate={(status) => {
            // if(status.didJustFinish) todo: find another way
            if (status.isLoaded) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={thumbnail}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
