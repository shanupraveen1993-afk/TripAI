import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Clock, CreditCard, HelpCircle, LogOut, ChevronRight, Home, User } from 'lucide-react-native';

const MENU = [
  { icon: Clock,       label: 'Call History',    route: '/(customer)/history' as const },
  { icon: CreditCard,  label: 'Upgrade Plan',    route: '/(customer)/upgrade' as const },
  { icon: HelpCircle,  label: 'Help & Support',  route: null },
];

export default function CustomerProfile() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 items-center justify-center" style={{ backgroundColor: '#FF4500' }}>
        <Text className="text-white text-xl font-bold">Profile</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20, paddingBottom: 80 }}>
        {/* Profile card */}
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-5 items-center"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2, gap: 8 }}>
          <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#ffe9e4', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FF4500' }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#FF4500' }}>P</Text>
          </View>
          <Text className="text-xl font-bold text-text-primary">Praveen</Text>
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <MapPin size={13} color="#FF4500" />
            <Text className="text-sm text-text-secondary">Sriram nagar, Thiruvaiyaru</Text>
          </View>
        </View>

        {/* Menu items */}
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden mb-4"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              className="flex-row items-center justify-between px-4 py-4"
              style={{ borderBottomWidth: i < MENU.length - 1 ? 1 : 0, borderBottomColor: '#e4e2e1' }}
              onPress={() => item.route && router.push(item.route)}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center" style={{ gap: 16 }}>
                <item.icon size={20} color="#5d4038" />
                <Text className="text-base text-text-primary">{item.label}</Text>
              </View>
              <ChevronRight size={18} color="#5d4038" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center justify-between px-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-xl"
          onPress={() => router.replace('/onboarding/customer-signup')}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center" style={{ gap: 16 }}>
            <LogOut size={20} color="#C62828" />
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#C62828' }}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Nav — Profile active */}
      <View className="flex-row justify-around items-center bg-surface-container-lowest border-t border-outline-variant h-16 px-4">
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/home')}>
          <Home size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/history')}>
          <Clock size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }}>
          <User size={24} color="#FF4500" fill="#FF4500" />
          <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
