import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Bell, MapPin, ImageIcon, Star, ShieldCheck, Home, Clock, User } from 'lucide-react-native';

const BANNER_URI = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWqTQ2gUZTRe2Dk3xJnfYe4a72j23nlti8J24cBOzAssyKipM1oegfEtsYMzfhmgIgoTkrb-i5-TCDzvKyNGHDNUU6zfN0VRV96AxfQ9Ghar5F4oFOwDtrfNWMjJ8USpTKLybUxakHxy1Jlm_HZuA6f49cW4XEeVb3DXYPbWAARZTZE-jINtCvIlYze0Zn81pwPZBIhC2bCO37Z4tVJBkZ8OzgdJjBHGckwpTkbCTbgxzjaQgCPnN2jeG0AbAv4VY3tfuAhr8aUXw';

const BOOST_CARDS = [
  { icon: ImageIcon, title: 'Add photos of past work to get', bold: '3x more calls', cta: 'Add Photos' },
  { icon: Star,      title: 'Ask for a review to build trust with new customers.', bold: '', cta: 'Request Review' },
  { icon: ShieldCheck, title: 'Verify your ID to get a verified badge.', bold: '', cta: 'Verify Now' },
];

export default function ProviderDashboard() {
  const router = useRouter();
  const [online, setOnline] = useState(true);

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500', position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <View className="flex-row items-center" style={{ gap: 12 }}>
          <TouchableOpacity className="p-1">
            <Menu size={22} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Nearby</Text>
        </View>
        <TouchableOpacity className="p-1">
          <Bell size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" style={{ marginTop: 56 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24, paddingBottom: 80, gap: 16 }}>
        {/* Greeting + Online Toggle */}
        <View className="flex-row items-center justify-between px-4">
          <Text className="text-2xl font-medium text-text-primary">Hi Ram</Text>
          <View className="flex-row items-center" style={{ gap: 10 }}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: online ? '#FF4500' : '#5d4038' }}>Online</Text>
            <TouchableOpacity
              style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: online ? 'rgba(255,69,0,0.2)' : '#e4e2e1', padding: 2 }}
              onPress={() => setOnline(o => !o)}
              activeOpacity={0.8}
            >
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: online ? '#FF4500' : '#5d4038', transform: [{ translateX: online ? 20 : 0 }], shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby customers card */}
        <View className="bg-surface-container-lowest border border-secondary-container rounded-xl p-4 flex-row items-center"
          style={{ gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
          <View style={{ padding: 8, borderRadius: 999, backgroundColor: '#fff1ed', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={20} color="#FF4500" fill="#FF4500" />
          </View>
          <Text className="text-base text-text-primary">
            <Text className="font-bold">42</Text> customers are near your location
          </Text>
        </View>

        {/* Trial Status */}
        <View className="bg-surface-container-lowest border border-secondary-container rounded-xl p-4"
          style={{ gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-semibold text-text-primary">Your Trial Status</Text>
            <View style={{ backgroundColor: '#fff1ed', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
              <Text style={{ color: '#FF4500', fontSize: 14, fontWeight: '600' }}>22 days left</Text>
            </View>
          </View>
          <View style={{ height: 8, backgroundColor: '#e4e2e1', borderRadius: 4, overflow: 'hidden' }}>
            <View style={{ height: '100%', width: '67%', backgroundColor: '#FF4500', borderRadius: 4 }} />
          </View>
          <Text className="text-sm text-secondary text-right">Upgrade to extend subscription</Text>
        </View>

        {/* Boost section */}
        <View style={{ gap: 10 }}>
          <Text className="text-base font-semibold text-text-primary px-1">Boost Your Profile</Text>

          {/* Banner */}
          <View style={{ borderRadius: 12, overflow: 'hidden', height: 128 }}>
            <Image source={{ uri: BANNER_URI }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,69,0,0.6)', paddingHorizontal: 24, justifyContent: 'center' }}>
              <Text className="text-white text-xl font-bold">Get 3x more leads!</Text>
            </View>
          </View>

          {/* Scrollable boost cards */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16 }} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {BOOST_CARDS.map(card => (
              <View key={card.cta} style={{ width: 280, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#e4e2e1', padding: 16, height: 160, justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
                <View className="flex-row items-start" style={{ gap: 12 }}>
                  <View style={{ padding: 8, borderRadius: 999, backgroundColor: '#fff1ed' }}>
                    <card.icon size={20} color="#FF4500" fill="#FF4500" />
                  </View>
                  <Text style={{ flex: 1, fontSize: 16, color: '#1A1A1A', lineHeight: 22 }}>
                    {card.title}{card.bold ? <Text style={{ fontWeight: '700' }}> {card.bold}</Text> : null}
                  </Text>
                </View>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FF4500', borderRadius: 8, paddingVertical: 8, alignItems: 'center' }} activeOpacity={0.8}>
                  <Text style={{ color: '#FF4500', fontSize: 14, fontWeight: '600' }}>{card.cta}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Nav — Home active */}
      <View className="flex-row justify-around items-center bg-white border-t border-outline-variant h-16 px-4"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 8 }}>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }}>
          <Home size={24} color="#FF4500" fill="#FF4500" />
          <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/calls')}>
          <Clock size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/account')}>
          <User size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
