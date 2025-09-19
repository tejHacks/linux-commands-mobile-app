import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
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
    Linking.openURL(emailUrl).catch((error) => Alert.alert('Error', 'Unable to open email app. Please copy the request and email manually.'));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-white text-3xl font-bold mb-6">Request Service</Text>
        <Text className="text-white text-lg mb-6">I do frontend, backend, and training! Here&apos;s what I offer:</Text>
        <View className="w-full max-w-md mb-6 space-y-2">
          <Text className="text-white text-lg">Frontend:</Text>
          <Text className="text-white text-md ml-4">• React</Text>
          <Text className="text-white text-md ml-4">• HTML</Text>
          <Text className="text-white text-md ml-4">• CSS</Text>
          <Text className="text-white text-md ml-4">• JavaScript</Text>
          <Text className="text-white text-lg mt-4">Backend:</Text>
          <Text className="text-white text-md ml-4">• Node.js</Text>
          <Text className="text-white text-md ml-4">• Laravel</Text>
          <Text className="text-white text-md ml-4">• PHP</Text>
          <Text className="text-white text-lg mt-4">Databases:</Text>
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
          className="bg-blue-700 w-full max-w-md h-14 px-6 py-4 rounded-lg"
          onPress={sendEmail}
        >
          <Text className="text-white text-xl font-semibold text-center">Send Request to olateju202@gmail.com</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
      <Navbar />
    </SafeAreaView>
  );
}