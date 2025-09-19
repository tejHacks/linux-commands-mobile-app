import { View, Text, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Contact() {
  const [message, setMessage] = useState('');

  const sendEmail = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message first!');
      return;
    }
    const emailUrl = `mailto:olateju202@gmail.com?subject=Contact from eLearn Linux App&body=${encodeURIComponent(message)}`;
    Linking.openURL(emailUrl).catch((error) => Alert.alert('Error', 'Unable to open email app.'));
  };

  const sendWhatsApp = () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message first!');
      return;
    }
    const whatsappUrl = `whatsapp://send?phone=2348086976247&text=${encodeURIComponent(`Contact from eLearn Linux App:\n\n${message}`)}`;
    Linking.openURL(whatsappUrl).catch((error) => Alert.alert('Error', 'WhatsApp not installed.'));
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 items-center justify-center px-4">
        <Text className="text-white text-3xl font-bold mb-6">Contact Us</Text>
        <View className="w-full max-w-md space-y-2 mb-6">
          <Text className="text-white text-lg">📧 olateju202@gmail.com</Text>
          <Text className="text-white text-lg">🌐 Portfolio: tejuthedev.vercel.app</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://x.com/OlatejuOlamid10')}>
            <Text className="text-blue-300 text-lg underline">🐦 Twitter: @OlatejuOlamid10</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg">📝 Medium: @olateju202</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/olateju-olamide-22314a292/')}>
            <Text className="text-blue-300 text-lg underline">LinkedIn: Olateju Olamide</Text>
          </TouchableOpacity>
          <Text className="text-white text-lg">WhatsApp: 08086976247</Text>
        </View>
        <TextInput
          className="bg-white text-black w-full max-w-md h-32 px-6 py-4 rounded-lg mb-6 text-xl"
          placeholder="Your message..."
          placeholderTextColor="#6b7280"
          multiline
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity 
          className="bg-blue-700 w-full max-w-md h-14 px-6 py-4 rounded-lg mb-4"
          onPress={sendEmail}
        >
          <Text className="text-white text-xl font-semibold text-center">Send Email</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-green-600 w-full max-w-md h-14 px-6 py-4 rounded-lg"
          onPress={sendWhatsApp}
        >
          <Text className="text-white text-xl font-semibold text-center">Send WhatsApp</Text>
        </TouchableOpacity>
        <StatusBar style="light" />
      </View>
      <Navbar />
    </SafeAreaView>
  );
}