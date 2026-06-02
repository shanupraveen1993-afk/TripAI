import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ShieldCheck, Fingerprint } from "lucide-react-native";

export default function ProviderSignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);

  const isValid = name.trim().length >= 2 && phone.replace(/\D/g, "").length === 10 && agreed;

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {/* AppBar */}
        <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10" aria-label="Go back">
            <ChevronLeft color="white" size={22} />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold flex-1 text-center">Nearby Technician</Text>
          <View className="w-10" />
        </View>

        <View className="px-6 pt-6 pb-8">
          <Text className="text-on-surface text-2xl font-bold mb-1">Register as a Pro</Text>
          <Text className="text-on-surface-variant text-sm mb-6">Start earning with your skills</Text>

          {/* Hero */}
          <View className="bg-surface-container-low rounded-xl h-36 items-center justify-center mb-6 border border-outline-variant">
            <View className="bg-appbar-bg rounded-xl px-4 py-2 flex-row items-center gap-2">
              <Text className="text-white text-sm font-bold">10,000+ Pros Joined</Text>
            </View>
            <Text className="text-appbar-bg/60 text-xs mt-2">Join the trusted professional network</Text>
          </View>

          {/* Full Name */}
          <View className="mb-5">
            <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Full Name (as on Aadhaar)</Text>
            <TextInput
              className="h-12 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-base"
              placeholder="Enter your full name"
              placeholderTextColor="#926f66"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          {/* Mobile */}
          <View className="mb-5">
            <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Mobile Number</Text>
            <View className="h-12 flex-row items-center px-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
              <Text className="text-on-surface text-base font-medium mr-2">+91</Text>
              <View className="w-px h-5 bg-outline-variant mr-2" />
              <TextInput className="flex-1 text-on-surface text-base" placeholder="98765 43210" placeholderTextColor="#926f66" value={phone} onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))} keyboardType="phone-pad" />
            </View>
          </View>

          {/* Aadhaar trust card */}
          <View className="bg-[#FFF8E7] border border-aadhaar-gold/30 rounded-xl p-4 flex-row items-center gap-3 mb-6">
            <View className="w-10 h-10 rounded-xl bg-aadhaar-gold/15 items-center justify-center">
              <Fingerprint color="#BF953F" size={22} />
            </View>
            <View className="flex-1">
              <Text className="text-[#8B6914] text-sm font-semibold">Aadhaar Verification Required</Text>
              <Text className="text-[#8B6914]/70 text-xs mt-0.5">Your identity will be verified via Aadhaar OTP</Text>
            </View>
          </View>

          {/* T&C */}
          <TouchableOpacity className="flex-row items-start gap-3 mb-8" onPress={() => setAgreed(!agreed)}>
            <View className={`w-5 h-5 rounded border-2 mt-0.5 items-center justify-center ${agreed ? "bg-appbar-bg border-appbar-bg" : "border-outline"}`}>
              {agreed && <Text className="text-white text-xs font-bold">✓</Text>}
            </View>
            <Text className="flex-1 text-on-surface-variant text-sm leading-5">
              I agree to the <Text className="text-appbar-bg font-medium">Terms of Service</Text> and <Text className="text-appbar-bg font-medium">Privacy Policy</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`rounded-xl h-14 items-center justify-center ${isValid ? "bg-appbar-bg" : "bg-surface-container-high"}`}
            style={isValid ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
            disabled={!isValid}
            onPress={() => router.push("/onboarding/provider-aadhaar")}
          >
            <Text className={`text-base font-bold ${isValid ? "text-white" : "text-on-surface-variant"}`}>
              Continue to Verify →
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
