import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/Navbar';
import { Ionicons } from '@expo/vector-icons';

export default function Features() {
  const [suggestion, setSuggestion] = useState('');

  const sendEmail = () => {
    if (!suggestion.trim()) {
      Alert.alert('Error', 'Please enter a suggestion first!');
      return;
    }
    const emailUrl = `mailto:olateju202@gmail.com?subject=Feature Suggestion for eLearn Linux&body=${encodeURIComponent(suggestion)}`;
    Linking.openURL(emailUrl).catch((error) => Alert.alert('Error', 'Unable to open email app. Please copy the suggestion and email manually.'));
  };

  const sendWhatsApp = () => {
    if (!suggestion.trim()) {
      Alert.alert('Error', 'Please enter a suggestion first!');
      return;
    }
    const whatsappUrl = `whatsapp://send?phone=2348086976247&text=${encodeURIComponent(`Feature Suggestion for eLearn Linux App:\n\n${suggestion}`)}`;
    Linking.openURL(whatsappUrl).catch((error) => Alert.alert('Error', 'WhatsApp not installed or unable to open. Please copy the suggestion and message manually.'));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="pb-20">
          <Text className="text-white text-3xl font-bold mt-6 mb-4">App Features</Text>

          <Text className="text-white text-2xl font-bold mb-4">eLearn Linux</Text>
          <Text className="text-white text-lg mb-6">Aim is to help you learn or have access to basic linux commands that you can use anywhere on any device at all... that&apos;s my basic idea for this app though...</Text>

          <Text className="text-white text-2xl font-bold mb-4">Current Features</Text>
          <View className="space-y-3 mb-6">
            <Text className="text-white text-lg">• Over 200 Linux commands with descriptions and examples</Text>
            <Text className="text-white text-lg">• Real-time search by command name or description</Text>
            <Text className="text-white text-lg">• Categorized commands (System Info, File Management, Networking, etc.)</Text>
            <Text className="text-white text-lg">• Dark theme with responsive design for all screens</Text>
            <Text className="text-white text-lg">• Bottom navigation for easy access to Home, Features, Contact, and Services</Text>
          </View>

          <Text className="text-white text-2xl font-bold mb-4">Coming Soon</Text>
          <View className="space-y-3 mb-6">
            <Text className="text-white text-lg">• Offline mode for all commands (no internet needed)</Text>
            <Text className="text-white text-lg">• Interactive quizzes to test command knowledge</Text>
            <Text className="text-white text-lg">• Syntax highlighting for code examples</Text>
            <Text className="text-white text-lg">• Favorites list to save useful commands</Text>
            <Text className="text-white text-lg">• Command categories with filters (e.g., Beginner/Advanced)</Text>
            <Text className="text-white text-lg">• Terminal emulator integration for practicing commands</Text>
            <Text className="text-white text-lg">• Man pages and detailed tutorials for each command</Text>
            <Text className="text-white text-lg">• Sync commands across devices</Text>
          </View>

          <Text className="text-white text-2xl font-bold mb-4">Suggest a Feature</Text>
          <TextInput
            className="bg-gray-800 text-white w-full max-w-md h-32 px-6 py-4 rounded-lg mb-6 text-xl"
            placeholder="Enter your feature suggestion here..."
            placeholderTextColor="#6b7280"
            multiline
            numberOfLines={4}
            value={suggestion}
            onChangeText={setSuggestion}
          />
          <TouchableOpacity 
            className="bg-blue-700 w-full max-w-md h-14 justify-center items-center rounded-lg mb-4"
            onPress={sendEmail}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-xl font-semibold mr-2">Send via Email</Text>
              <Ionicons name='mail' size={24} color="#fff" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            className="bg-green-600 w-full max-w-md h-14 justify-center items-center rounded-lg mb-6"
            onPress={sendWhatsApp}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-xl font-semibold mr-2">WhatsApp</Text>
              <Ionicons name='logo-whatsapp' size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Navbar />
      <StatusBar style="light" />
    </SafeAreaView>
  );
}