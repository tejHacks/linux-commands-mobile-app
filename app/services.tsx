import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/Navbar';

export default function Services() {
  const [serviceRequest, setServiceRequest] = useState('');

  const sendEmail = () => {
    if (!serviceRequest.trim()) {
      Alert.alert('Error', 'Please enter a service request first!');
      return;
    }
    const emailUrl = `mailto:olateju202@gmail.com?subject=Service Request from eLearn Linux App&body=${encodeURIComponent(`Service Request:\n\n${serviceRequest}\n\nRequested Service Type: ${serviceRequest}`)}`;
    Linking.openURL(emailUrl).catch(() => Alert.alert('Error', 'Unable to open email app. Please copy the request and email manually.'));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      {/* 
        This View acts as the main container with a flex-direction: column.
        It holds the ScrollView and the fixed Navbar.
      */}
      <View className="flex-1">
        
        {/* The ScrollView is now the only flex-1 child, allowing it to take
            up all available space between the top and the Navbar at the bottom. */}
        <ScrollView className="flex-1 px-4">
          <View className="items-center px-4">
            <Text className="text-white text-3xl font-bold mb-4 mt-6">Request Service</Text>
            <Text className="text-white text-lg mb-6">I do frontend, backend, and training! Here&apos;s what I offer:</Text>
            <View className="w-full max-w-md mb-6 space-y-2">
              <Text className="text-white text-lg font-bold">Frontend:</Text>
              <Text className="text-white text-md ml-4">• React</Text>
              <Text className="text-white text-md ml-4">• HTML</Text>
              <Text className="text-white text-md ml-4">• CSS</Text>
              <Text className="text-white text-md ml-4">• JavaScript</Text>
              <Text className="text-white text-lg mt-4 font-bold">Backend:</Text>
              <Text className="text-white text-md ml-4">• Node.js</Text>
              <Text className="text-white text-md ml-4">• Laravel</Text>
              <Text className="text-white text-md ml-4">• PHP</Text>
              <Text className="text-white text-lg mt-4 font-bold">Databases:</Text>
              <Text className="text-white text-md ml-4">• MySQL</Text>
              <Text className="text-white text-md ml-4">• MongoDB</Text>
              <Text className="text-white text-md ml-4">• SQLite</Text>
              <Text className="text-white text-md ml-4">• PostgreSQL</Text>
              <Text className="text-white text-lg mt-4">Training: Yes, I train too!</Text>
            </View>
            <Text className="text-white text-lg mb-6">Request Service (Website, Web App, Train Code, Consultant, Mobile App Development):</Text>
            <TextInput
              className="bg-white text-black w-full max-w-md h-32 px-6 py-4 rounded-lg mb-6 text-xl"
              placeholder="Describe your service request (e.g., 'Build a React website')..."
              placeholderTextColor="#6b7280"
              multiline
              value={serviceRequest}
              onChangeText={setServiceRequest}
            />
            <TouchableOpacity 
              className="bg-blue-700 w-full max-w-md h-14 px-10 rounded-lg mb-10 items-center justify-center"
              onPress={sendEmail}
            >
              <Text className="text-white text-xl font-semibold">Send Request to olateju202@gmail.com</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* The Navbar is now a sibling of the ScrollView, not a child.
            It will stay in a fixed position at the bottom. */}
        <Navbar />

      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
