import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, Camera } from 'lucide-react-native';

export default function ProviderSignup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhaar, setAadhaar] = useState('');

  const formatAadhaar = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 12);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* AppBar — FIX: was WHITE in original, now ORANGE */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>Provider Signup</Text>
      </View>

      <ScrollView className="flex-1 px-4 py-5" showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 100 }}>
        <View className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5"
          style={{ gap: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>

          {/* Personal Details */}
          <View style={{ gap: 12 }}>
            <Text className="text-lg font-bold text-on-background">Personal Details</Text>

            <View style={{ gap: 6 }}>
              <Text className="text-xs font-medium text-on-surface-variant">Full Legal Name</Text>
              <TextInput
                className="border border-outline-variant rounded-lg px-3.5 py-3 text-sm text-text-primary bg-surface-container-lowest"
                style={{ height: 48 }}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={{ gap: 6 }}>
              <Text className="text-xs font-medium text-on-surface-variant">Mobile Number</Text>
              <View className="flex-row border border-outline-variant rounded-lg overflow-hidden bg-surface-container-lowest" style={{ height: 48 }}>
                <View className="px-4 border-r border-outline-variant justify-center bg-surface-container-low">
                  <Text className="text-sm font-semibold text-on-surface-variant">+91</Text>
                </View>
                <TextInput
                  className="flex-1 px-3.5 text-sm text-text-primary"
                  placeholder="10-digit mobile number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: 'rgba(231,189,178,0.3)' }} />

          {/* Verification */}
          <View style={{ gap: 12 }}>
            <Text className="text-lg font-bold text-on-background">Verification</Text>

            <View style={{ gap: 6 }}>
              <Text className="text-xs font-medium text-on-surface-variant">Aadhaar Number (12 Digits)</Text>
              <View className="flex-row items-center border border-outline-variant rounded-lg bg-surface-container-lowest" style={{ height: 48 }}>
                <Lock size={18} color="#757575" style={{ marginLeft: 14 }} />
                <TextInput
                  className="flex-1 px-3 text-sm text-text-primary"
                  placeholder="XXXX XXXX XXXX"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  maxLength={14}
                  value={aadhaar}
                  onChangeText={v => setAadhaar(formatAadhaar(v))}
                  style={{ letterSpacing: 2 }}
                />
              </View>
            </View>

            {/* Photo Upload */}
            <View style={{ gap: 8 }}>
              <Text className="text-xs font-medium text-on-surface-variant">Upload Profile Photo (Required)</Text>
              <TouchableOpacity
                className="w-full items-center justify-center rounded-xl py-8"
                style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: '#e7bdb2', backgroundColor: '#fff1ed', gap: 10 }}
                activeOpacity={0.8}
              >
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 3, elevation: 2 }}>
                  <Camera size={22} color="#FF4500" />
                </View>
                <Text style={{ color: '#FF4500', fontSize: 14, fontWeight: '600' }}>Tap to upload photo</Text>
                <Text className="text-xs text-text-secondary">Clear, front-facing face</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="px-4 pb-8 bg-surface-off-white border-t border-outline-variant pt-4">
        <TouchableOpacity
          className="w-full rounded-xl items-center justify-center"
          style={{ backgroundColor: '#FF4500', height: 48, shadowColor: '#FF4500', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }}
          onPress={() => router.push('/onboarding/provider-aadhaar')}
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-bold">Send OTP</Text>
        </TouchableOpacity>
        <Text className="text-center text-xs text-text-secondary mt-3">
          By signing up, you agree to our{' '}
          <Text style={{ color: '#FF4500', textDecorationLine: 'underline' }}>Terms & Conditions</Text>.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
