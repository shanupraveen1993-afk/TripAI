import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Smartphone, Lock, Home, Clock, User } from 'lucide-react-native';

const PLANS = [
  { id: '3mo', label: '3 Months', price: '₹399', popular: false },  // FIX: ₹ not ‹
  { id: '6mo', label: '6 Months', price: '₹599', popular: true  },  // FIX: ₹ not ‹
  { id: '1yr', label: '1 Year',   price: '₹999', popular: false },  // FIX: ₹ not ‹
];

export default function UpgradeScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState('6mo');

  return (
    // FIX: height is 884 not 844
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar — FIX: orange not primary dark */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>Upgrade</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center', paddingTop: 16, paddingBottom: 80 }}>
        {/* Illustration */}
        <View className="w-48 h-48 mb-5 mt-2 rounded-xl items-center justify-center relative"
          style={{ backgroundColor: '#ffe9e4', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>
          <Smartphone size={80} color="#FF4500" />
          <View style={{ position: 'absolute', top: 16, right: 16, width: 16, height: 16, borderRadius: 8, backgroundColor: '#FF4500', opacity: 0.2 }} />
          <View style={{ position: 'absolute', bottom: 32, left: 16, width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF4500', opacity: 0.4 }} />
        </View>

        <Text className="text-2xl font-bold text-on-background text-center mb-2">Unlimited Local Contacts</Text>
        <Text className="text-sm text-text-secondary text-center mb-6" style={{ maxWidth: 300 }}>
          You have used your 3 free calls. Upgrade to connect directly with unlimited nearby pros.
        </Text>

        {/* Plan Cards */}
        <View className="w-full" style={{ gap: 12, marginBottom: 20 }}>
          {PLANS.map(plan => (
            <TouchableOpacity
              key={plan.id}
              style={{ width: '100%', position: 'relative' }}
              onPress={() => setSelected(plan.id)}
              activeOpacity={0.85}
            >
              {plan.popular && (
                <View style={{ position: 'absolute', top: -12, left: 16, backgroundColor: '#FF4500', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, zIndex: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '500' }}>Popular</Text>
                </View>
              )}
              <View style={{
                backgroundColor: selected === plan.id ? '#fff8f6' : '#fff',
                borderWidth: plan.popular ? 2 : 1,
                borderColor: selected === plan.id ? '#FF4500' : '#e7bdb2',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 3, elevation: 1,
              }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#291712', marginTop: plan.popular ? 4 : 0 }}>{plan.label}</Text>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#291712' }}>{plan.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          className="w-full rounded-full py-3.5 items-center mb-4"
          style={{ backgroundColor: '#FF4500', shadowColor: '#FF4500', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }}
          activeOpacity={0.85}
        >
          <Text className="text-white text-sm font-bold">Upgrade Now</Text>
        </TouchableOpacity>

        {/* Trust */}
        <View className="flex-row items-center" style={{ gap: 6 }}>
          <Lock size={14} color="#757575" />
          <Text className="text-xs text-text-secondary">Secure Checkout</Text>
        </View>
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
