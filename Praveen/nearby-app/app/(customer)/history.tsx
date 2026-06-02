import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Sparkles, User, Store, CheckCircle2, XCircle, Phone, Home, Clock } from 'lucide-react-native';

const THIS_MONTH = [
  { id: '1', name: 'Sarah Jenkins',    sub: 'Plumbing Consultation', date: 'Oct 24 • 10:30 AM', status: 'connected', icon: 'person' },
  { id: '2', name: 'Apex Electrical',  sub: 'Wiring Estimate',       date: 'Oct 22 • 2:15 PM',  status: 'missed',    icon: 'store' },
];

const LAST_MONTH = [
  { id: '3', name: "Mike's Landscaping", sub: 'Yard Cleanup', date: 'Sep 15 • 9:00 AM', status: 'connected', icon: 'person' },
];

function CallItem({ item }: { item: typeof THIS_MONTH[0] }) {
  const connected = item.status === 'connected';
  return (
    <View className="bg-surface-container-lowest rounded-lg p-4 flex-row justify-between items-center"
      style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
      <View className="flex-row items-center" style={{ gap: 16 }}>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,181,160,0.2)', alignItems: 'center', justifyContent: 'center' }}>
          {item.icon === 'store' ? <Store size={22} color="#FF4500" /> : <User size={22} color="#FF4500" />}
        </View>
        <View>
          <Text className="text-sm font-bold text-text-primary">{item.name}</Text>
          <Text className="text-sm text-text-secondary">{item.sub}</Text>
          <Text className="text-xs text-text-secondary mt-1">{item.date}</Text>
        </View>
      </View>

      <View className="items-end" style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: connected ? '#D1FAE5' : '#FEE2E2', gap: 4 }}>
          {connected
            ? <CheckCircle2 size={13} color="#1B8A4A" />
            : <XCircle size={13} color="#C62828" />
          }
          <Text style={{ fontSize: 12, fontWeight: '500', color: connected ? '#1B8A4A' : '#C62828' }}>
            {connected ? 'Connected' : 'Missed'}
          </Text>
        </View>
        <TouchableOpacity style={{ padding: 4 }}>
          <Phone size={20} color="#FF4500" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">History</Text>
        <TouchableOpacity
          style={{ backgroundColor: '#FFD700', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 4 }}
          onPress={() => router.push('/(customer)/upgrade')}
          activeOpacity={0.85}
        >
          <Text style={{ color: '#1A1A1A', fontSize: 12, fontWeight: '600' }}>Upgrade</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Free calls banner */}
        <View style={{ marginTop: 12, backgroundColor: '#FEF3C7', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(245,158,11,0.3)', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Sparkles size={18} color="#F59E0B" />
          <Text style={{ color: '#F59E0B', fontSize: 14, fontWeight: '600', flex: 1 }}>2 Free Calls Remaining this month</Text>
        </View>

        {/* This Month */}
        <Text className="text-base font-semibold text-secondary mt-5 mb-3">This Month</Text>
        <View style={{ gap: 8 }}>
          {THIS_MONTH.map(item => <CallItem key={item.id} item={item} />)}
        </View>

        {/* Last Month */}
        <Text className="text-base font-semibold text-secondary mt-5 mb-3">Last Month</Text>
        <View style={{ gap: 8 }}>
          {LAST_MONTH.map(item => <CallItem key={item.id} item={item} />)}
        </View>
      </ScrollView>

      {/* Bottom Nav — History active */}
      <View className="flex-row justify-around items-center bg-surface-container-lowest border-t border-outline-variant h-16 px-4">
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/home')}>
          <Home size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }}>
          <Clock size={24} color="#FF4500" fill="#FF4500" />
          <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/profile')}>
          <User size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
