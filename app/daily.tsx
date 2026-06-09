import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { commands } from '../data/commands';

function getDailyCommand() {
    const today = new Date();
    const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    return commands[dayOfYear % commands.length];
}

export default function Daily() {
    const cmd = getDailyCommand();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await Clipboard.setStringAsync(cmd.example);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar style="light" />

            <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>

                {/* Date badge */}
                <View style={{ alignItems: 'center', marginBottom: 32 }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', gap: 6,
                        backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1,
                        borderColor: 'rgba(34,197,94,0.3)', paddingHorizontal: 14,
                        paddingVertical: 6, borderRadius: 999,
                    }}>
                        <Ionicons name="calendar-outline" size={14} color="#22c55e" />
                        <Text style={{ color: '#22c55e', fontSize: 12 }}>{today}</Text>
                    </View>
                </View>

                {/* Title */}
                <Text style={{
                    color: '#fff', fontSize: 22, fontWeight: 'bold',
                    textAlign: 'center', marginBottom: 4,
                }}>
                    Command of the Day
                </Text>
                <Text style={{ color: '#6b7280', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
                    One command a day keeps the confusion away 🐧
                </Text>

                {/* Command card */}
                <View style={{
                    backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#27272a',
                    borderRadius: 24, padding: 24, marginBottom: 16,
                }}>
                    {/* Top accent */}
                    <View style={{ height: 2, backgroundColor: '#22c55e', borderRadius: 999, marginBottom: 20, width: 40 }} />

                    {/* Category badge */}
                    <View style={{
                        alignSelf: 'flex-start', backgroundColor: '#18181b', borderRadius: 999,
                        paddingHorizontal: 10, paddingVertical: 3, marginBottom: 16,
                        borderWidth: 1, borderColor: '#3f3f46',
                    }}>
                        <Text style={{ color: '#9ca3af', fontSize: 11 }}>{cmd.category}</Text>
                    </View>

                    {/* Command name */}
                    <Text style={{
                        color: '#22c55e', fontFamily: 'monospace', fontSize: 28,
                        fontWeight: 'bold', marginBottom: 12,
                    }}>
                        {cmd.command}
                    </Text>

                    {/* Description */}
                    <Text style={{ color: '#d1d5db', fontSize: 15, lineHeight: 22, marginBottom: 24 }}>
                        {cmd.description}
                    </Text>

                    {/* Example block */}
                    <View style={{
                        backgroundColor: '#000', borderWidth: 1, borderColor: '#27272a',
                        borderRadius: 14, padding: 16, marginBottom: 20,
                    }}>
                        <Text style={{ color: '#6b7280', fontFamily: 'monospace', fontSize: 11, marginBottom: 6 }}>
                            EXAMPLE
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                            <Text style={{ color: '#16a34a', fontFamily: 'monospace', fontSize: 14 }}>$</Text>
                            <Text style={{ color: '#86efac', fontFamily: 'monospace', fontSize: 14, flex: 1 }}>
                                {cmd.example}
                            </Text>
                        </View>
                    </View>

                    {/* Copy button */}
                    <TouchableOpacity
                        onPress={handleCopy}
                        style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
                            gap: 8, height: 48, borderRadius: 14, borderWidth: 1,
                            borderColor: copied ? '#22c55e' : '#3f3f46',
                            backgroundColor: copied ? 'rgba(34,197,94,0.1)' : '#18181b',
                        }}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={copied ? 'checkmark-circle' : 'copy-outline'}
                            size={18}
                            color={copied ? '#22c55e' : '#9ca3af'}
                        />
                        <Text style={{ color: copied ? '#22c55e' : '#9ca3af', fontSize: 14, fontWeight: '500' }}>
                            {copied ? 'Copied!' : 'Copy Command'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Come back tomorrow hint */}
                <Text style={{ color: '#3f3f46', fontSize: 12, textAlign: 'center' }}>
                    🔄 New command drops every day
                </Text>
            </View>

            <Navbar />
        </SafeAreaView>
    );
}