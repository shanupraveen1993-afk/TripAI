import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Clock, MapPin, Wrench, ShieldCheck, Star, Phone } from 'lucide-react-native';

const AVATAR_URI = 'https://lh3.googleusercontent.com/aida-public/AB6AXuA06-ocMgP-b_ZIj1t4mCO8bMJXFXvUpfhZw3iv073CUcvdlVn1aeYTGIfIWSswxR12pQ9Al5NePymqSzhjhdTxysBXh-Do0HYiJjz5IWR98p3msDMRsfbOd9ZPmXdkbgXfJuEr63eir3sd428vpxQnj7BZjfRF12amYGnVWXQ3MARzev0Zzbr49MenrqHaPtkG9dmB3xxuVqJP8Ax10GFAusSWz_aZbFQFKkauAVa-l2VqCZxciFjP2Jv9w7Tnfy0tSoJHEjCarE8';
const SKILLS = ['Tap Fixing', 'Leakage Repair', 'Pipe Fitting', 'Drain Cleaning'];

export default function ProviderPreview() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>Technician Profile</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}>
        <View style={{ gap: 12 }}>
          {/* Identity Card */}
          <View className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 items-center"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, gap: 8, overflow: 'hidden' }}>
            {/* Gradient tint */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 96, backgroundColor: 'rgba(255,69,0,0.1)' }} />

            <View style={{ position: 'relative' }}>
              <Image source={{ uri: AVATAR_URI }} style={{ width: 96, height: 96, borderRadius: 48, borderWidth: 4, borderColor: '#fff' }} resizeMode="cover" />
              <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#FF4500', borderRadius: 999, padding: 4, borderWidth: 2, borderColor: '#fff' }}>
                <ShieldCheck size={12} color="#fff" />
              </View>
            </View>

            <Text className="text-xl font-bold text-text-primary">Alex Rodriguez</Text>
            <View className="flex-row items-center" style={{ gap: 4 }}>
              <Star size={16} color="#FFB400" fill="#FFB400" />
              <Text className="text-lg font-semibold text-text-primary">4.5</Text>
              <Text className="text-sm text-text-secondary">(128 reviews)</Text>
            </View>
            <View className="flex-row items-center rounded-full px-3 py-1" style={{ gap: 4, backgroundColor: 'rgba(255,181,160,0.3)' }}>
              <ShieldCheck size={13} color="#872000" />
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#872000' }}>Verified Pro</Text>
            </View>
          </View>

          {/* Experience & Location */}
          <View className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4"
            style={{ gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
            <View style={{ gap: 4 }}>
              <View className="flex-row items-center" style={{ gap: 6 }}>
                <Clock size={16} color="#757575" />
                <Text className="text-xs font-semibold text-text-secondary">Experience</Text>
              </View>
              <Text className="text-base text-text-primary">8 Years Experience</Text>
            </View>
            <View style={{ height: 1, backgroundColor: 'rgba(231,189,178,0.2)' }} />
            <View style={{ gap: 4 }}>
              <View className="flex-row items-center" style={{ gap: 6 }}>
                <MapPin size={16} color="#757575" />
                <Text className="text-xs font-semibold text-text-secondary">Service Location</Text>
              </View>
              <Text className="text-base text-text-primary">123 Main St, Salem</Text>
            </View>
          </View>

          {/* Skills */}
          <View className="bg-surface-container-lowest rounded-xl border border-outline-variant p-4"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, gap: 12 }}>
            <View className="flex-row items-center" style={{ gap: 6 }}>
              <Wrench size={16} color="#757575" />
              <Text className="text-xs font-semibold text-text-secondary">Specialized Skills</Text>
            </View>
            <View className="flex-row flex-wrap" style={{ gap: 8 }}>
              {SKILLS.map(s => (
                <View key={s} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6, borderWidth: 1, borderColor: '#FF4500', backgroundColor: 'rgba(255,69,0,0.05)' }}>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: '#FF4500' }}>{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Call CTA */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-8 bg-surface-off-white pt-4">
        <TouchableOpacity
          className="w-full rounded-xl py-4 flex-row items-center justify-center"
          style={{ backgroundColor: '#FF4500', gap: 8, shadowColor: '#FF4500', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }}
          onPress={() => router.replace('/(provider)/dashboard')}
          activeOpacity={0.85}
        >
          <Phone size={18} color="#fff" />
          <Text className="text-white text-base font-bold">Call Technician</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
