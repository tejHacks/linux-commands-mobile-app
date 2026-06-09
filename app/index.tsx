import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

const TYPED_TEXT = 'terminal-master';

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const [typedIndex, setTypedIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Typing effect
  useEffect(() => {
    if (typedIndex < TYPED_TEXT.length) {
      const timeout = setTimeout(() => setTypedIndex((i) => i + 1), 80);
      return () => clearTimeout(timeout);
    }
  }, [typedIndex]);

  // Fade + slide in after typing done
  useEffect(() => {
    if (typedIndex === TYPED_TEXT.length) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]).start();
    }
  }, [fadeAnim, slideAnim, typedIndex]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 500);
    return () => clearInterval(interval);
  }, []);

  const isDoneTyping = typedIndex === TYPED_TEXT.length;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" />
      <View className="absolute top-0 left-0 right-0 h-0.5 bg-green-500" />

      <View className="flex-1 items-center justify-center px-6">

        {/* Terminal typing block */}
        <View className="w-full bg-zinc-950 border border-green-500/30 rounded-2xl px-5 py-5 mb-10">
          {/* Fake terminal top bar */}
          <View className="flex-row items-center gap-2 mb-4">
            <View className="w-3 h-3 rounded-full bg-red-500" />
            <View className="w-3 h-3 rounded-full bg-yellow-500" />
            <View className="w-3 h-3 rounded-full bg-green-500" />
            <Text className="text-gray-500 text-xs ml-2 font-mono">bash</Text>
          </View>

          {/* Typed line */}
          <View className="flex-row items-center flex-wrap">
            <Text className="text-green-400 font-mono text-sm">$ cd ~/</Text>
            <Text className="text-white font-mono text-sm">
              {TYPED_TEXT.slice(0, typedIndex)}
            </Text>
            {showCursor && (
              <View className="w-2 h-4 bg-green-400 ml-0.5 rounded-sm" />
            )}
          </View>

          {/* Second line appears after typing */}
          {isDoneTyping && (
            <Text className="text-green-500 font-mono text-sm mt-2">
              ✓ Loaded commands. Ready.
            </Text>
          )}
        </View>

        {/* Main content fades in */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="items-center w-full"
        >
          <Text className="text-white text-5xl font-bold text-center mb-2">
            Terminal
          </Text>
          <Text className="text-green-500 text-5xl font-bold text-center mb-5">
            Master
          </Text>

          <Text className="text-gray-400 text-base text-center leading-6 mb-10 px-2">
            Master Linux commands with examples,{'\n'}quizzes, and daily challenges.
          </Text>

          <TouchableOpacity
            className="w-full bg-green-500 h-14 rounded-xl items-center justify-center mb-4"
            onPress={() => router.push('/commands')}
            activeOpacity={0.8}
          >
            <Text className="text-black text-lg font-bold tracking-wide">
              Get Started
            </Text>
          </TouchableOpacity>

          <Text className="text-gray-600 text-xs mt-3">v1.0.0 · Offline Ready</Text>
        </Animated.View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500/20" />
    </SafeAreaView>
  );
}