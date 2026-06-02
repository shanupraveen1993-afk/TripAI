import { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function CustomerOtp() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef<(TextInput | null)[]>([null, null, null, null]);

  const handleChange = (val: string, idx: number) => {
    const digit = val.replace(/[^0-9]/g, '').slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < 3) inputs.current[idx + 1]?.focus();
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>OTP Verification</Text>
      </View>

      <View className="flex-1 px-4 pt-6">
        <Text className="text-2xl font-bold text-text-primary mb-2">Enter verification code</Text>
        <Text className="text-sm text-text-secondary mb-8">
          We have sent you a 4 digit verification code on{' '}
          <Text className="font-semibold text-text-primary">+919994837342</Text>
        </Text>

        {/* OTP Boxes */}
        <View className="flex-row justify-center mb-6" style={{ gap: 16 }}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={el => { inputs.current[i] = el; }}
              style={{
                width: 56, height: 56,
                textAlign: 'center',
                fontSize: 22, fontWeight: '700',
                color: '#1A1A1A',
                borderWidth: 1, borderColor: '#e7bdb2',
                borderRadius: 8,
                backgroundColor: '#fff',
              }}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={val => handleChange(val, i)}
              onKeyPress={e => handleKeyPress(e, i)}
              autoFocus={i === 0}
            />
          ))}
        </View>

        <Text className="text-center text-sm text-text-secondary">
          Auto verifying your OTP in{' '}
          <Text style={{ color: '#22c55e', fontWeight: '600' }}>0.29</Text>
        </Text>
      </View>

      {/* Log In */}
      <View className="px-4 pb-8">
        <TouchableOpacity
          className="w-full rounded-xl py-3.5 items-center"
          style={{ backgroundColor: '#FF4500' }}
          onPress={() => router.push('/onboarding/customer-address')}
          activeOpacity={0.85}
        >
          <Text className="text-white text-sm font-bold">Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
