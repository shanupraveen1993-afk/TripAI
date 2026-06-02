import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ShieldCheck } from "lucide-react-native";

export default function ProviderAadhaarScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(55);
  const refs = Array.from({ length: 6 }, () => useRef<TextInput>(null));

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
    if (digit && idx < 5) refs[idx + 1].current?.focus();
  };

  const handleKey = (e: any, idx: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Identity Verification</Text>
        <View className="w-10" />
      </View>

      <View className="flex-1 px-6 pt-8">
        {/* Aadhaar icon — gold ring for trust context */}
        <View className="items-center mb-6">
          <View
            className="w-20 h-20 rounded-full border-4 border-aadhaar-gold items-center justify-center bg-[#FFF8E7] mb-3"
            style={{ shadowColor: "#BF953F", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 }}
          >
            <ShieldCheck color="#BF953F" size={36} />
            <View className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success-teal border-2 border-white items-center justify-center">
              <Text className="text-white text-xs font-bold">✓</Text>
            </View>
          </View>
          <Text className="text-on-surface text-xl font-bold mb-1">Verify Aadhaar</Text>
          <Text className="text-on-surface-variant text-sm text-center">
            OTP sent to <Text className="text-on-surface font-semibold">+91 XXXXX X5678</Text>
          </Text>
        </View>

        {/* 6 OTP boxes — trust-blue border for Aadhaar security context */}
        <View className="flex-row justify-center gap-2.5 mb-5">
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={refs[idx]}
              aria-label={`Digit ${idx + 1}`}
              className={`w-12 h-14 rounded-xl text-center text-xl font-bold border-2 bg-surface-container-low ${
                digit ? "border-trust-blue text-trust-blue" : "border-outline-variant text-on-surface"
              }`}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onChangeText={(v) => handleChange(v, idx)}
              onKeyPress={(e) => handleKey(e, idx)}
            />
          ))}
        </View>

        <View className="items-center mb-6">
          {timer > 0 ? (
            <Text className="text-on-surface-variant text-sm">
              Resend OTP in <Text className="text-appbar-bg font-semibold">00:{String(timer).padStart(2, "0")}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(55)}>
              <Text className="text-appbar-bg text-sm font-semibold">Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="bg-surface-container-low rounded-xl py-2 items-center mb-8 border border-outline-variant">
          <Text className="text-on-surface-variant text-xs font-semibold tracking-widest uppercase">
            Government-Linked Verification
          </Text>
        </View>

        <TouchableOpacity
          className={`rounded-xl h-14 items-center justify-center ${isComplete ? "bg-appbar-bg" : "bg-surface-container-high"}`}
          style={isComplete ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
          disabled={!isComplete}
          onPress={() => router.push("/onboarding/provider-address")}
        >
          <Text className={`text-base font-bold ${isComplete ? "text-white" : "text-on-surface-variant"}`}>
            Verify & Proceed →
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
