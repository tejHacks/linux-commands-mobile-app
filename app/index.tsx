import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import Navbar from '../components/Navbar';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 items-center justify-center px-4">
        <Image
          source={require('../assets/images/download.png')}
          className="w-40 h-40 mb-6"
          resizeMode="contain"
        />
        <Text className="text-white text-4xl font-bold mb-4">Learn Linux Commands</Text>
        <Text className="text-white text-lg text-center mb-6">
          Learn Linux command basics easily with code-examples and practice.
        </Text>
        <TouchableOpacity
          className="bg-blue-700 w-full max-w-md h-14 px-6 py-4 rounded-lg mb-4"
          onPress={() => router.push('/commands')}
        >
          <Text className="text-white text-xl font-semibold text-center">Get Started</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
      <Navbar />
    </SafeAreaView>
  );
}