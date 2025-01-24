import { View, Text } from 'react-native';
import React from 'react';
import { AVPlaybackSource, ResizeMode, Video } from 'expo-av';

interface Props {
  source: AVPlaybackSource | undefined;
  containerStyles?: string;
  videoStyles?: string;
  resizeMode?: any;
  onPlaybackStatusUpdate?: (status: any) => void;
}

export function VideoPlayer({
  source,
  containerStyles,
  videoStyles,
  resizeMode,
  onPlaybackStatusUpdate,
}: Props) {
  const cS =
    containerStyles ??
    'relative justify-center items-center w-52 h-72 rounded-[35px] mt-3 bg-white/10';

  const vS = videoStyles ?? 'w-full h-full rounded-[35px]';

  return (
    <View className={cS}>
      <Video
        source={source}
        className={vS}
        resizeMode={resizeMode ?? ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
}
