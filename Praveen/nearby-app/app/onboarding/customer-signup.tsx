import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';

export default function CustomerSignup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface-off-white"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 items-center px-4 pt-12">
          {/* Brand Logo */}
          <View className="items-center mb-8" style={{ gap: 4 }}>
            <MapPin size={40} color="#FF4500" fill="#FF4500" />
            <Text className="text-3xl font-bold tracking-tight" style={{ color: '#FF4500' }}>Nearby</Text>
          </View>

          {/* Login Card */}
          <View
            className="w-full bg-surface-container-lowest rounded-xl p-5 border border-outline-variant mb-6"
            style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}
          >
            <Text className="text-xl font-bold text-text-primary mb-1">Welcome Back</Text>
            <Text className="text-sm text-text-secondary mb-5">Enter your details to continue as a user.</Text>

            <View style={{ gap: 12 }}>
              <View style={{ gap: 6 }}>
                <Text className="text-sm font-semibold text-text-primary">Full Name</Text>
                <TextInput
                  className="border border-outline-variant rounded-xl px-4 py-3 text-base text-text-primary bg-surface-container-lowest"
                  placeholder="Enter your name"
                  placeholderTextColor="#9CA3AF"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View className="flex-row border border-outline-variant rounded-xl overflow-hidden bg-surface-container-lowest">
                <View className="px-4 py-3 border-r border-outline-variant justify-center">
                  <Text className="text-base text-text-primary font-medium">+91</Text>
                </View>
                <TextInput
                  className="flex-1 px-4 py-3 text-base text-text-primary"
                  placeholder="Mobile Number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              <TouchableOpacity
                className="w-full rounded-xl py-3.5 items-center"
                style={{ backgroundColor: '#FF4500', shadowColor: '#FF4500', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }}
                onPress={() => router.push('/onboarding/customer-otp')}
                activeOpacity={0.85}
              >
                <Text className="text-white text-sm font-bold">Continue</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* OR Divider */}
          <View className="flex-row items-center w-full mb-6" style={{ gap: 16 }}>
            <View className="flex-1 h-px bg-outline-variant" />
            <Text className="text-sm text-text-secondary">OR</Text>
            <View className="flex-1 h-px bg-outline-variant" />
          </View>

          {/* Provider Card */}
          <View
            className="w-full bg-surface-off-white rounded-xl p-4 items-center"
            style={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#e7bdb2', gap: 12 }}
          >
            <Text className="text-base font-semibold text-text-primary">Are you a Service Professional?</Text>
            <TouchableOpacity
              className="border rounded-xl px-6 py-2"
              style={{ borderColor: '#FF4500' }}
              onPress={() => router.push('/onboarding/provider-signup')}
              activeOpacity={0.8}
            >
              <Text className="text-sm font-semibold" style={{ color: '#FF4500' }}>Login as Technician</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
