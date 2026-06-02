import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Bell, PhoneMissed, PhoneIncoming, Phone, Home, Clock, User } from 'lucide-react-native';

type CallItem = { id: string; name: string; sub: string; time: string; status: 'missed' | 'received'; duration?: string };

const TODAY: CallItem[] = [
  { id: '1', name: 'Sarah Jenkins', sub: 'Plumbing • Wash Basin Leak', time: '10:45 AM', status: 'missed' },
  { id: '2', name: 'Michael Chen',  sub: 'Electrical • Socket Repair',  time: '09:15 AM', status: 'received', duration: '2m 14s' },
];

const YESTERDAY: CallItem[] = [
  { id: '3', name: 'Emma Davis',    sub: 'Carpentry • Door Hinge',      time: '4:30 PM', status: 'received', duration: '5m 02s' },
  { id: '4', name: 'Robert Wilson', sub: 'HVAC • AC Maintenance',       time: '1:15 PM', status: 'missed' },
];

function CallRow({ item }: { item: CallItem }) {
  const missed = item.status === 'missed';
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-secondary-fixed-dim last:border-0">
      <View className="flex-row items-center" style={{ gap: 16 }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: missed ? 'rgba(255,69,0,0.1)' : 'rgba(34,197,94,0.1)', alignItems: 'center', justifyContent: 'center' }}>
          {missed
            ? <PhoneMissed size={22} color="#FF4500" />
            : <PhoneIncoming size={22} color="#16a34a" />
          }
        </View>
        <View>
          <Text className="text-base font-bold text-text-primary">{item.name}</Text>
          <Text className="text-sm font-medium text-text-secondary">{item.sub}</Text>
          <Text className="text-xs text-slate-400 mt-0.5">{item.time}</Text>
        </View>
      </View>

      {missed ? (
        <View className="flex-row items-center" style={{ gap: 10 }}>
          <TouchableOpacity style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,69,0,0.1)', alignItems: 'center', justifyContent: 'center' }}>
            <Phone size={18} color="#FF4500" />
          </TouchableOpacity>
          {/* WhatsApp */}
          <TouchableOpacity style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(37,211,102,0.1)', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 14, color: '#25D366', fontWeight: '700' }}>W</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ backgroundColor: '#e4e2e1', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text className="text-xs text-text-secondary">{item.duration}</Text>
        </View>
      )}
    </View>
  );
}

export default function ProviderCalls() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity className="p-2 -ml-2">
          <Menu size={22} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Call History</Text>
        <TouchableOpacity className="p-2">
          <Bell size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80, gap: 16 }}>
        {/* Today */}
        <View>
          <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2 border-b border-outline-variant pb-1">Today</Text>
          <View className="bg-surface-container-lowest rounded-xl border border-secondary-fixed-dim overflow-hidden"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
            {TODAY.map(item => <CallRow key={item.id} item={item} />)}
          </View>
        </View>

        {/* Yesterday */}
        <View>
          <Text className="text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2 border-b border-outline-variant pb-1">Yesterday</Text>
          <View className="bg-surface-container-lowest rounded-xl border border-secondary-fixed-dim overflow-hidden"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
            {YESTERDAY.map(item => <CallRow key={item.id} item={item} />)}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav — History active */}
      <View className="flex-row justify-around items-center bg-surface-container-lowest border-t border-outline-variant h-16 px-4">
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/dashboard')}>
          <Home size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }}>
          <Clock size={24} color="#FF4500" fill="#FF4500" />
          <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/account')}>
          <User size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
