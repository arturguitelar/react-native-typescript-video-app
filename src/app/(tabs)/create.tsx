import { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '@/src/components/FormField';
import { VideoPlayer } from '@/src/components/VideoPlayer';
import { icons } from '@/constants';
import { AVPlaybackSource } from 'expo-av';
import { CustomButton } from '@/src/components/CustomButton';

interface FormProps {
  title: string;
  video: AVPlaybackSource | any;
  thumbnail: ImageSourcePropType | undefined | any;
  prompt: string;
}

export default function Create() {
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<FormProps>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectType: 'video' | 'image') => {};

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('video')}
            className="mt-2"
          >
            {form.video ? (
              <VideoPlayer
                source={{ uri: 'form.video.uri' }}
                containerStyles="w-full h-64 rounded-2xl bg-white/10"
                videoStyles="w-full h-full rounded-2xl"
                // TODO: isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity
            className="mt-2"
            onPress={() => openPicker('image')}
          >
            {form.thumbnail ? (
              <Image
                source={form.thumbnail.uri}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2 gap-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video"
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
