import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <View className="flex flex-1 items-center justify-center">
      <Text className="text-3xl font-pblack">:D</Text>
      <Link href={{ pathname: '/(tabs)/home' }} style={{ color: 'blue' }}>
        Go to Home
      </Link>
    </View>
  );
}
