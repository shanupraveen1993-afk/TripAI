import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';

const PROVIDER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJa70jY63mIgEBPm4D07seU-TjsYTXx5blGGFPE7zr_ZfKVBMNhpBmAk3AupeI2QxsugauKROSqlJRbjTDXrnvm6Tq1JEkg-h2sJZyxoSJk2DIWuSzYg5w7kjc3EoynW49SMjp5g6QCH-zwtVvtaivxxIy6oFQWZqE6XCCeAOpO4bSx452CtFOfWHhxK_yGLKS6IdYl_7MdEqSBD1wKg6YDK5-DI2DiwXEPLX5mQAZbwtgD2LB-4VAp_0PPxUhWgv0vj0Zc46acbU';
const OUTCOMES = ['Job Completed', 'No Show', 'Rescheduled'];

export default function RatingScreen() {
  const router = useRouter();
  const [outcome, setOutcome] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity style={{ position: 'absolute', left: 8 }} onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Rate Service</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        <View className="bg-surface-container-lowest rounded-xl border border-secondary-fixed-dim p-5"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, gap: 20 }}>

          {/* Provider */}
          <View className="items-center" style={{ gap: 8 }}>
            <Image source={{ uri: PROVIDER_IMG }} style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#fddbd3' }} resizeMode="cover" />
            <Text className="text-xl font-bold text-text-primary">Ram</Text>
            <Text className="text-sm text-text-secondary">Professional Service Provider</Text>
          </View>

          {/* Outcome pills */}
          <View style={{ gap: 8 }}>
            <Text className="text-base font-semibold text-text-primary text-center">How Was Your Service?</Text>
            <View className="flex-row flex-wrap justify-center" style={{ gap: 8, marginTop: 8 }}>
              {OUTCOMES.map(o => (
                <TouchableOpacity
                  key={o}
                  style={{
                    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999,
                    borderWidth: 1,
                    borderColor: outcome === o ? '#FF4500' : '#926f66',
                    backgroundColor: outcome === o ? 'rgba(255,69,0,0.1)' : 'transparent',
                  }}
                  onPress={() => setOutcome(o)}
                  activeOpacity={0.8}
                >
                  <Text style={{ fontSize: 14, fontWeight: '600', color: outcome === o ? '#FF4500' : '#1A1A1A' }}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#e7bdb2' }} />

          {/* Stars */}
          <View className="items-center" style={{ gap: 12 }}>
            <Text className="text-base font-semibold text-text-primary">Rate Your Experience</Text>
            <View className="flex-row" style={{ gap: 8 }}>
              {[1, 2, 3, 4, 5].map(i => (
                <TouchableOpacity key={i} onPress={() => setRating(i)} activeOpacity={0.8}>
                  <Star size={44} color={i <= rating ? '#FF4500' : '#e7bdb2'} fill={i <= rating ? '#FF4500' : 'none'} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Review text */}
            <TextInput
              className="w-full border border-outline-variant rounded-xl p-4 text-sm text-text-primary bg-surface-container-lowest"
              placeholder="Add A Review (Optional)"
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              style={{ height: 108, textAlignVertical: 'top' }}
              value={review}
              onChangeText={setReview}
            />
          </View>

          {/* Submit */}
          <TouchableOpacity
            className="w-full rounded-full py-3.5 items-center"
            style={{ backgroundColor: '#FF4500', shadowColor: '#FF4500', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 }}
            onPress={() => router.replace('/(customer)/history')}
            activeOpacity={0.85}
          >
            <Text className="text-white text-sm font-bold">Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
