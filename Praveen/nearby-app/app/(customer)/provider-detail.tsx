import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bell, Star, ShieldCheck, MapPin, Phone, Home, Clock, User } from 'lucide-react-native';

const PROVIDER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0kMDcEpNLiW5VVNuBLaefVbVpb5vKo-enrU3jt-xLBA50c8kIVG7hAZ00DBqOwm0js3oqbdzOYXijtKR23fSWfBhZSw01kg-JwBsg9UoNBsExITTHgGXtjr-ef6_nOYn2C2ZUa9GPnEuYKSOvjWLQwUC-h2Gjuk3WT8WpiB51DFDJ40Rwkp2oIAmspEtaHDyMa5meds_xRtGLWKZLOt6PhLyb0VVDC_Ad_4wkZWV1etp3gNhLHkowSXpVbbpmYOtl4VFlN5y9P2E';
const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqoH1LzQXyW77fG0hnveAWCi0lJp0HvUGNbHkqoR3dg7TisG8BQBL_XBPGwLZgVzSY_TxeIFSAMjQqeiyjK_12GfmlJBMh7Ejmol-cRal9Pyx_8IZefnG1huxXUSJsTzskVgu666DVa_Zt9SEStzGjPQ8ul6fq-v6J6CTcx21ZqE95nN83oZ7Y4b0cPA2by79oYqyKUTwan9mILa-OC9pZOFmfAH-mTVSmM5DjfY2BGjo12pUviGbN0eKV2AAUOLJNYmbdxpKcLFY';

export default function ProviderDetail() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-bold">Service Provider Details</Text>
        <TouchableOpacity className="p-2">
          <Bell size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}>
        {/* Provider Identity Card */}
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex-row items-center mb-4"
          style={{ gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
          <Image source={{ uri: PROVIDER_IMG }} style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#fff' }} resizeMode="cover" />

          <View className="flex-1">
            <Text className="text-base font-semibold text-text-primary">Vikram Sharma</Text>
            <Text className="text-sm text-text-secondary mt-1">Plumber - 4 Skills{'\n'}10yrs Experience</Text>
            <View className="flex-row items-center mt-2 border border-outline-variant rounded px-2 py-1 self-start" style={{ gap: 4 }}>
              <Star size={16} color="#FF4500" fill="#FF4500" />
              <Text className="text-xs font-bold text-text-primary">4.8</Text>
              <Text className="text-xs text-text-secondary">(215 Jobs)</Text>
            </View>
          </View>

          <View className="bg-surface-container-highest rounded-full p-2">
            <ShieldCheck size={22} color="#FF4500" />
          </View>
        </View>

        {/* Address Card */}
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-4"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
          <View className="flex-row items-center mb-3" style={{ gap: 8 }}>
            <MapPin size={20} color="#FF4500" />
            <Text className="text-base font-semibold text-text-primary">Address</Text>
          </View>

          <View style={{ borderLeftWidth: 2, borderLeftColor: '#fddbd3', marginLeft: 8, paddingLeft: 12, marginBottom: 12 }}>
            <Text className="text-sm text-text-secondary">Plot No. 42, Sector 18{'\n'}Udyog Vihar Phase IV{'\n'}Gurugram, Haryana 122015</Text>
          </View>

          {/* Map */}
          <View className="rounded-xl overflow-hidden border border-outline-variant" style={{ height: 180 }}>
            <Image source={{ uri: MAP_IMG }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            {/* FIX: Orange pin, not green */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={40} color="#FF4500" fill="#FF4500" />
            </View>
            <View style={{ position: 'absolute', bottom: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: '#e7bdb2' }}>
              <Text className="text-xs font-medium text-text-primary">1.2 km away</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Call Button + Bottom Nav */}
      <View className="bg-surface-container-lowest border-t border-outline-variant">
        <View className="px-4 py-3">
          <TouchableOpacity
            className="w-full rounded-xl py-3.5 flex-row items-center justify-center"
            style={{ backgroundColor: '#FF4500', gap: 8, shadowColor: '#FF4500', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }}
            onPress={() => router.push('/(customer)/call')}
            activeOpacity={0.85}
          >
            <Phone size={18} color="#fff" fill="#fff" />
            <Text className="text-white text-sm font-bold">Call</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-around items-center h-14 px-4">
          <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/home')}>
            <Home size={22} color="#FF4500" fill="#FF4500" />
            <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/history')}>
            <Clock size={22} color="#5d4038" />
            <Text className="text-xs text-on-surface-variant">History</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/profile')}>
            <User size={22} color="#5d4038" />
            <Text className="text-xs text-on-surface-variant">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
