import { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Bell, AlertTriangle, Lock, ShieldCheck, Home, Clock, User } from 'lucide-react-native';

const PLANS = [
  { id: '3mo', label: '3 Months', sub: 'Basic visibility',  price: '₹399', popular: false },  // ₹ correct
  { id: '6mo', label: '6 Months', sub: 'Most popular',      price: '₹599', popular: true  },  // ₹ correct
  { id: '1yr', label: '1 Year',   sub: 'Best value',        price: '₹999', popular: false },  // ₹ correct
];

export default function GrowthPlans() {
  const router = useRouter();
  const [selected, setSelected] = useState('6mo');

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity className="p-2 -ml-2">
          <Menu size={22} color="#fff" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Subscription Plan</Text>
        <TouchableOpacity className="p-2">
          <Bell size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16, paddingBottom: 100, gap: 16 }}>
        {/* Header */}
        <View style={{ gap: 4 }}>
          <Text className="text-xl font-bold text-on-background">Subscription Plan</Text>
          <Text style={{ color: '#FF4500', fontSize: 18, fontWeight: '600' }}>Keep your phone ringing!</Text>
        </View>

        {/* FOMO Banner */}
        <View style={{ backgroundColor: '#ffdad6', borderRadius: 12, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 12, borderWidth: 1, borderColor: '#e7bdb2', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
          <AlertTriangle size={20} color="#93000a" style={{ marginTop: 1 }} />
          <Text style={{ flex: 1, fontSize: 14, color: '#93000a', fontWeight: '500' }}>
            You missed <Text style={{ fontWeight: '700' }}>12 local customer searches</Text> yesterday because your quota was empty.
          </Text>
        </View>

        {/* Plan Cards */}
        <View style={{ gap: 12 }}>
          {PLANS.map(plan => (
            <TouchableOpacity key={plan.id} style={{ position: 'relative' }} onPress={() => setSelected(plan.id)} activeOpacity={0.85}>
              {plan.popular && (
                <View style={{ position: 'absolute', top: -12, right: 16, backgroundColor: '#FF4500', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2, zIndex: 10 }}>
                  <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>Expected ROI: 15+ Leads/mo</Text>
                </View>
              )}
              <View style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: selected === plan.id ? 2 : 1,
                borderColor: selected === plan.id ? '#FF4500' : '#e4e2e1',
                shadowColor: selected === plan.id ? '#FF4500' : '#000',
                shadowOffset: { width: 0, height: selected === plan.id ? 2 : 1 },
                shadowOpacity: selected === plan.id ? 0.1 : 0.04,
                shadowRadius: selected === plan.id ? 8 : 3,
                elevation: selected === plan.id ? 3 : 1,
              }}>
                <View className="flex-row items-center" style={{ gap: 12 }}>
                  <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: selected === plan.id ? '#FF4500' : '#926f66', alignItems: 'center', justifyContent: 'center' }}>
                    {selected === plan.id && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF4500' }} />}
                  </View>
                  <View>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#291712' }}>{plan.label}</Text>
                    <Text style={{ fontSize: 12, color: '#757575', marginTop: 2 }}>{plan.sub}</Text>
                  </View>
                </View>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#291712' }}>{plan.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          className="w-full rounded-lg py-3.5 items-center"
          style={{ backgroundColor: '#FF4500', shadowColor: '#FF4500', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 4 }}
          activeOpacity={0.85}
        >
          <Text className="text-white text-sm font-bold">Pay to Stay Listed</Text>
        </TouchableOpacity>

        {/* Trust badges */}
        <View className="flex-row items-center justify-center" style={{ gap: 8 }}>
          <Lock size={14} color="#757575" />
          <Text className="text-xs text-text-secondary">Secure UPI Payment</Text>
          <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#c8c6c6' }} />
          <ShieldCheck size={14} color="#757575" />
          <Text className="text-xs text-text-secondary">100% Safe</Text>
        </View>
      </ScrollView>

      {/* Bottom Nav — Profile active */}
      <View className="flex-row justify-around items-center bg-white border-t border-outline-variant h-16 px-4"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 8 }}>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/dashboard')}>
          <Home size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/calls')}>
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
