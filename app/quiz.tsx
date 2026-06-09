import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import { commands } from '../data/commands';

type Option = { label: string; isCorrect: boolean };
type Question = { question: string; options: Option[]; explanation: string };

function generateQuestions(): Question[] {
    const shuffled = [...commands].sort(() => Math.random() - 0.5).slice(0, 10);
    return shuffled.map((cmd) => {
        const wrongPool = commands
            .filter((c) => c.id !== cmd.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((c) => ({ label: c.command, isCorrect: false }));

        const options = [...wrongPool, { label: cmd.command, isCorrect: true }].sort(
            () => Math.random() - 0.5
        );

        return {
            question: `Which command is used to: "${cmd.description}"?`,
            options,
            explanation: `${cmd.command} — Example: ${cmd.example}`,
        };
    });
}

export default function Quiz() {
    const [questions, setQuestions] = useState<Question[]>(generateQuestions);
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const question = questions[current];
    const isAnswered = selected !== null;

    const handleSelect = (option: Option) => {
        if (isAnswered) return;
        setSelected(option.label);
        if (option.isCorrect) setScore((s) => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) {
            setFinished(true);
        } else {
            setCurrent((c) => c + 1);
            setSelected(null);
        }
    };

    const handleRestart = useCallback(() => {
        setQuestions(generateQuestions());
        setCurrent(0);
        setSelected(null);
        setScore(0);
        setFinished(false);
    }, []);

    const getOptionStyle = (option: Option) => {
        if (!isAnswered) return { borderColor: '#3f3f46', backgroundColor: 'transparent' };
        if (option.isCorrect) return { borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)' };
        if (option.label === selected && !option.isCorrect)
            return { borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)' };
        return { borderColor: '#3f3f46', backgroundColor: 'transparent' };
    };

    const getOptionTextColor = (option: Option) => {
        if (!isAnswered) return '#d1d5db';
        if (option.isCorrect) return '#22c55e';
        if (option.label === selected && !option.isCorrect) return '#ef4444';
        return '#6b7280';
    };

    // Results screen
    if (finished) {
        const percentage = Math.round((score / questions.length) * 100);
        const isPerfect = score === questions.length;
        const isGood = percentage >= 70;

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
                <StatusBar style="light" />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>

                    <View style={{
                        width: 100, height: 100, borderRadius: 50,
                        borderWidth: 2, borderColor: isGood ? '#22c55e' : '#ef4444',
                        alignItems: 'center', justifyContent: 'center', marginBottom: 24,
                        backgroundColor: isGood ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                    }}>
                        <Text style={{ fontSize: 32, fontWeight: 'bold', color: isGood ? '#22c55e' : '#ef4444' }}>
                            {percentage}%
                        </Text>
                    </View>

                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>
                        {isPerfect ? 'Perfect Score! 🔥' : isGood ? 'Nice Work! 💪' : 'Keep Practicing 📚'}
                    </Text>
                    <Text style={{ color: '#6b7280', fontSize: 15, marginBottom: 8 }}>
                        You got {score} out of {questions.length} correct
                    </Text>

                    <View style={{
                        width: '100%', backgroundColor: '#18181b', borderRadius: 16,
                        borderWidth: 1, borderColor: '#27272a', padding: 20, marginTop: 16, marginBottom: 32,
                    }}>
                        {[
                            { label: 'Score', value: `${score}/${questions.length}` },
                            { label: 'Accuracy', value: `${percentage}%` },
                            { label: 'Questions', value: `${questions.length}` },
                        ].map((stat) => (
                            <View key={stat.label} style={{
                                flexDirection: 'row', justifyContent: 'space-between',
                                paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#27272a',
                            }}>
                                <Text style={{ color: '#6b7280', fontSize: 14 }}>{stat.label}</Text>
                                <Text style={{ color: '#22c55e', fontSize: 14, fontWeight: '600' }}>{stat.value}</Text>
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        onPress={handleRestart}
                        style={{
                            width: '100%', backgroundColor: '#22c55e', height: 52,
                            borderRadius: 14, alignItems: 'center', justifyContent: 'center',
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>Try Again</Text>
                    </TouchableOpacity>
                </View>
                <Navbar />
            </SafeAreaView>
        );
    }

    // Quiz screen
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar style="light" />

            <View style={{ flex: 1, padding: 20 }}>

                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Text style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: 12 }}>~/quiz</Text>
                    <View style={{
                        backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 1,
                        borderColor: 'rgba(34,197,94,0.3)', paddingHorizontal: 12,
                        paddingVertical: 4, borderRadius: 999,
                    }}>
                        <Text style={{ color: '#22c55e', fontSize: 12 }}>{current + 1} / {questions.length}</Text>
                    </View>
                </View>

                {/* Progress bar */}
                <View style={{ height: 4, backgroundColor: '#18181b', borderRadius: 999, marginBottom: 28 }}>
                    <View style={{
                        height: 4, borderRadius: 999, backgroundColor: '#22c55e',
                        width: `${((current + 1) / questions.length) * 100}%`,
                    }} />
                </View>

                {/* Score pill */}
                <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center', gap: 4,
                        backgroundColor: 'rgba(34,197,94,0.1)', paddingHorizontal: 10,
                        paddingVertical: 4, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(34,197,94,0.2)',
                    }}>
                        <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
                        <Text style={{ color: '#22c55e', fontSize: 12 }}>{score} correct</Text>
                    </View>
                </View>

                {/* Question */}
                <View style={{
                    backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#27272a',
                    borderRadius: 20, padding: 20, marginBottom: 24,
                }}>
                    <Text style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8, fontFamily: 'monospace' }}>
                        Question {current + 1}
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 16, lineHeight: 24, fontWeight: '500' }}>
                        {question.question}
                    </Text>
                </View>

                {/* Options */}
                <View style={{ gap: 10 }}>
                    {question.options.map((option, idx) => (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => handleSelect(option)}
                            style={{
                                borderWidth: 1, borderRadius: 14, padding: 16,
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                ...getOptionStyle(option),
                            }}
                            activeOpacity={isAnswered ? 1 : 0.7}
                        >
                            <Text style={{
                                fontFamily: 'monospace', fontSize: 14, fontWeight: '600',
                                color: getOptionTextColor(option),
                            }}>
                                {option.label}
                            </Text>
                            {isAnswered && option.isCorrect && (
                                <Ionicons name="checkmark-circle" size={18} color="#22c55e" />
                            )}
                            {isAnswered && option.label === selected && !option.isCorrect && (
                                <Ionicons name="close-circle" size={18} color="#ef4444" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Explanation after answer */}
                {isAnswered && (
                    <View style={{
                        marginTop: 16, backgroundColor: '#0a0a0a', borderWidth: 1,
                        borderColor: '#27272a', borderRadius: 14, padding: 14,
                    }}>
                        <Text style={{ color: '#22c55e', fontFamily: 'monospace', fontSize: 12 }}>
                            $ {question.explanation}
                        </Text>
                    </View>
                )}

                {/* Next button */}
                {isAnswered && (
                    <TouchableOpacity
                        onPress={handleNext}
                        style={{
                            marginTop: 20, backgroundColor: '#22c55e', height: 50,
                            borderRadius: 14, alignItems: 'center', justifyContent: 'center',
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
                            {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            <Navbar />
        </SafeAreaView>
    );
}