import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Crosshair } from 'lucide-react-native';

const MAP_URI = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmI0NK5n38kIk5gHNpKLBmepVBZZ5PIIlA6jCOqWQfeEttwMN1LlErMRRlXfoz1QbCewb4GJIxswaTQ6nPBjkaqrjeAd4WVz4LWh-T0kofT4dMhen5h9iSSO2hm5nuvrO_q_6JMQeXy0yswiK5VrK6NBcuex5YH9Lt4c8Cyx2LRdiQiUrsFkUKH83-9Dq__EZzlWVAUVvOSgiF6rrBSgY1he-1BLUj7KK4t6OuJFZ38qXk256uDZF6OV3KefdJ9vAz714aSffrYEs';

export default function CustomerAddress() {
  const router = useRouter();
  const [form, setForm] = useState({ door: '', street: '', city: '', landmark: '', pincode: '' });
  const set = (k: keyof typeof form, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* AppBar */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>Set Location</Text>
      </View>

      {/* Map — FIX: pin is #FF4500, not green */}
      <View style={{ height: 200 }}>
        <Image source={{ uri: MAP_URI }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
          <MapPin size={44} color="#FF4500" fill="#FF4500" />
        </View>
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 12, right: 12, backgroundColor: '#fff', borderRadius: 999, padding: 10, borderWidth: 1, borderColor: '#e7bdb2', elevation: 3 }}
        >
          <Crosshair size={20} color="#FF4500" />
        </TouchableOpacity>
      </View>

      {/* Address Form Sheet */}
      <View className="flex-1 bg-surface-container-lowest" style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, marginTop: -16, borderTopWidth: 1, borderColor: '#e7bdb2' }}>
        <View className="items-center pt-3 pb-1">
          <View style={{ width: 48, height: 4, backgroundColor: '#e4e2e1', borderRadius: 4 }} />
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Text className="text-xl font-bold text-text-primary mt-3 mb-1">Enter address details</Text>
          <Text className="text-sm text-text-secondary mb-5">Complete address*</Text>

          <View style={{ gap: 12, paddingBottom: 100 }}>
            <TextInput
              className="border border-secondary-container rounded-lg px-4 py-3 text-sm text-text-primary bg-surface-container-lowest"
              placeholder="Door no, Apartment name, Floor no, Block no"
              placeholderTextColor="#9CA3AF"
              value={form.door}
              onChangeText={v => set('door', v)}
            />
            <TextInput
              className="border border-secondary-container rounded-lg px-4 py-3 text-sm text-text-primary bg-surface-container-lowest"
              placeholder="Street name, Area"
              placeholderTextColor="#9CA3AF"
              value={form.street}
              onChangeText={v => set('street', v)}
            />
            <TextInput
              className="border border-secondary-container rounded-lg px-4 py-3 text-sm text-text-primary bg-surface-container-lowest"
              placeholder="City"
              placeholderTextColor="#9CA3AF"
              value={form.city}
              onChangeText={v => set('city', v)}
            />
            <View className="flex-row" style={{ gap: 12 }}>
              <TextInput
                className="flex-1 border border-secondary-container rounded-lg px-4 py-3 text-sm text-text-primary bg-surface-container-lowest"
                placeholder="Landmark"
                placeholderTextColor="#9CA3AF"
                value={form.landmark}
                onChangeText={v => set('landmark', v)}
              />
              <TextInput
                className="flex-1 border border-secondary-container rounded-lg px-4 py-3 text-sm text-text-primary bg-surface-container-lowest"
                placeholder="Pincode*"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                maxLength={6}
                value={form.pincode}
                onChangeText={v => set('pincode', v)}
              />
            </View>
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant px-4 py-4">
          <TouchableOpacity
            className="w-full rounded-xl py-4 items-center"
            style={{ backgroundColor: '#FF4500' }}
            onPress={() => router.replace('/(customer)/home')}
            activeOpacity={0.85}
          >
            <Text className="text-white text-sm font-bold">Confirm Address</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
