import { View, Text } from 'react-native';
import React from 'react';
import { ResizeMode, Video } from 'expo-av';

interface Props {
  videoPath: any;
  containerStyles?: string;
  videoStyles?: string;
  resizeMode?: any;
  onPlaybackStatusUpdate?: (status: any) => void;
}

export function VideoPlayer({
  videoPath,
  containerStyles,
  videoStyles,
  resizeMode,
  onPlaybackStatusUpdate,
}: Props) {
  const cS =
    containerStyles ??
    'relative justify-center items-center w-52 h-72 rounded-[35px] mt-3 bg-white/10';

  const vS = videoStyles ?? 'w-52 h-72 rounded-[35px] mt-3 bg-white/10';

  return (
    <View className={cS}>
      <Video
        source={{ uri: videoPath }}
        className={vS}
        resizeMode={resizeMode ?? ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      />
    </View>
  );
}
