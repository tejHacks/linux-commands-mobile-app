import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Navbar() {
  return (
    <View className="flex-row justify-around items-center w-full bg-blue-900 p-3 h-16 border-t border-blue-700">
      <TouchableOpacity 
        className="flex-1 items-center"
        onPress={() => router.push('/')}
      >
        <Ionicons name="home" size={24} color="white" />
        <Text className="text-white text-center text-sm mt-1">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="flex-1 items-center"
        onPress={() => router.push('/features')}
      >
        <Ionicons name="bulb-outline" size={24} color="white" />
        <Text className="text-white text-center text-sm mt-1">Features</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="flex-1 items-center"
        onPress={() => router.push('/contact')}
      >
        <Ionicons name="mail" size={24} color="white" />
        <Text className="text-white text-center text-sm mt-1">Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        className="flex-1 items-center"
        onPress={() => router.push('/services')}
      >
        <Ionicons name="construct" size={24} color="white" />
        <Text className="text-white text-center text-sm mt-1">Services</Text>
      </TouchableOpacity>
    </View>
  );
}