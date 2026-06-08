import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { CATEGORIES, Command, commands } from '../data/commands';

export default function Commands() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = commands.filter((cmd) => {
    const matchesSearch =
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || cmd.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (cmd: Command) => {
    try {
      await Clipboard.setStringAsync(cmd.example);
      setCopiedId(cmd.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      Alert.alert('Copy Failed', 'Unable to copy command to clipboard');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />

      <View className="flex-1 px-4 pt-4">

        {/* Search */}
        <View className="flex-row items-center bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 mb-4 mt-10">
          <Ionicons name="search" size={18} color="#22c55e" />
          <TextInput
            className="flex-1 ml-2 text-white text-sm"
            placeholder="Search commands..."
            placeholderTextColor="#4b5563"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#4b5563" />
            </TouchableOpacity>
          )}
        </View>

        {/* Category tabs */}
        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4 flex-grow-0"
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: isActive ? '#22c55e' : '#3f3f46',
                  backgroundColor: isActive ? '#22c55e' : 'transparent',
                }}
                activeOpacity={0.7}
              >
                <Text style={{
                  fontSize: 12,
                  fontWeight: '500',
                  color: isActive ? '#000' : '#9ca3af',
                }}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView> */}

        {/* Category tabs */}
        <View style={{ height: 40, marginBottom: 16 }}>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item}
            contentContainerStyle={{ gap: 8, paddingRight: 16 }}
            renderItem={({ item: cat }) => {
              const isActive = activeCategory === cat;
              return (
                <TouchableOpacity
                  onPress={() => setActiveCategory(cat)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 7,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: isActive ? '#22c55e' : '#3f3f46',
                    backgroundColor: isActive ? '#22c55e' : 'transparent',
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: isActive ? '#000' : '#9ca3af',
                  }}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* Command list */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const isCopied = copiedId === item.id;
            return (
              <View className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 mb-3">
                {/* Top row */}
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-2">
                    <View className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <Text className="text-green-400 font-mono text-base font-bold">
                      {item.command}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleCopy(item)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: isCopied ? 'rgba(34,197,94,0.5)' : '#3f3f46',
                      backgroundColor: isCopied ? 'rgba(34,197,94,0.1)' : '#27272a',
                    }}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isCopied ? 'checkmark' : 'copy-outline'}
                      size={14}
                      color={isCopied ? '#22c55e' : '#9ca3af'}
                    />
                    <Text style={{ fontSize: 12, color: isCopied ? '#22c55e' : '#9ca3af' }}>
                      {isCopied ? 'Copied!' : 'Copy'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Description */}
                <Text className="text-gray-300 text-sm mb-3 leading-5">
                  {item.description}
                </Text>

                {/* Example block */}
                <View className="bg-black border border-zinc-800 rounded-xl px-4 py-3">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-green-600 font-mono text-xs">$</Text>
                    <Text className="text-green-300 font-mono text-xs flex-1">
                      {item.example}
                    </Text>
                  </View>
                </View>

                {/* Category badge */}
                <View className="mt-3 self-start bg-zinc-800 px-2.5 py-0.5 rounded-full">
                  <Text className="text-zinc-400 text-xs">{item.category}</Text>
                </View>
              </View>
            );
          }}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Ionicons name="terminal-outline" size={48} color="#22c55e" />
              <Text className="text-gray-500 text-sm mt-3 text-center">
                No commands found{'\n'}Try a different search
              </Text>
            </View>
          }
          contentContainerStyle={{ paddingBottom: 160 }}
        />
      </View>

      <Navbar />
    </SafeAreaView>
  );
}