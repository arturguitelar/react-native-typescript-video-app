import { useState } from 'react';
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AVPlaybackSource } from 'expo-av';

import * as DocumentPicker from 'expo-document-picker';

import { FormField } from '@/src/components/FormField';
import { VideoPlayer } from '@/src/components/VideoPlayer';
import { CustomButton } from '@/src/components/CustomButton';
import { icons } from '@/constants';
import { router } from 'expo-router';
import { api } from '@/src/services/http/api';
import { useGlobalContext } from '@/src/context/GlobalProvider';

interface FormProps {
  title: string;
  video: AVPlaybackSource | any;
  thumbnail: ImageSourcePropType | undefined | any;
  prompt: string;
}

export default function Create() {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState<FormProps>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectType: 'video' | 'image') => {
    const type =
      selectType === 'image'
        ? ['image/png', 'image/jpg']
        : ['video/mp4', 'video/gif'];

    const result = await DocumentPicker.getDocumentAsync({
      type,
    });

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    /** fake data just for test */
    // setForm({
    //   title: 'Fake title',
    //   video: { data: 'data video here' },
    //   thumbnail: { data: 'data thumbail here' },
    //   prompt: 'some funny prompt here',
    // });

    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert('Please fill in all the fields');
    }

    setUploading(true);

    try {
      await api.posts.createPost({ ...form, userId: user?.id });

      Alert.alert('Success', 'Post uploaded successfully');
      router.push('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setForm({ title: '', video: null, thumbnail: null, prompt: '' });

      setUploading(false);
    }
  };

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
