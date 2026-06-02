import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";

export default function CustomerOTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const refs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  useEffect(() => {
    if (timer === 0) return;
    const t = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleChange = (val: string, idx: number) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[idx] = digit;
    setOtp(next);
    if (digit && idx < 3) refs[idx + 1].current?.focus();
  };

  const handleKey = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* AppBar */}
      <View className="flex-row items-center px-4 pt-14 pb-3 bg-surface-container-lowest border-b border-outline-variant">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2 rounded-lg" aria-label="Go back">
          <ChevronLeft color="#291712" size={24} />
        </TouchableOpacity>
        <Text className="text-appbar-bg text-lg font-bold flex-1 text-center">Nearby</Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 px-6 pt-8">
        <Text className="text-on-surface text-2xl font-bold mb-1">Enter OTP</Text>
        <Text className="text-on-surface-variant text-sm mb-10">
          Sent to <Text className="text-on-surface font-semibold">+91 XXXXX X3210</Text>
        </Text>

        {/* 4 OTP boxes */}
        <View className="flex-row justify-center gap-4 mb-6">
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={refs[idx]}
              aria-label={`Digit ${idx + 1}`}
              className={`w-16 h-20 rounded-xl text-center text-2xl font-bold border-2 bg-surface-container-low ${
                digit ? "border-appbar-bg text-appbar-bg" : "border-outline-variant text-on-surface"
              }`}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(v) => handleChange(v, idx)}
              onKeyPress={(e) => handleKey(e, idx)}
            />
          ))}
        </View>

        {/* Timer */}
        <View className="items-center mb-10">
          {timer > 0 ? (
            <Text className="text-on-surface-variant text-sm">
              Resend OTP in{" "}
              <Text className="text-appbar-bg font-semibold">00:{String(timer).padStart(2, "0")}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(59)}>
              <Text className="text-appbar-bg text-sm font-semibold">Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          className={`rounded-xl h-14 items-center justify-center ${isComplete ? "bg-appbar-bg" : "bg-surface-container-high"}`}
          style={isComplete ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
          disabled={!isComplete}
          onPress={() => router.push("/onboarding/customer-address")}
        >
          <Text className={`text-base font-bold ${isComplete ? "text-white" : "text-on-surface-variant"}`}>
            Verify & Continue →
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
