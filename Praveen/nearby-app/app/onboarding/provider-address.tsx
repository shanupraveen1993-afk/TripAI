import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, MapPin } from "lucide-react-native";

export default function ProviderAddressScreen() {
  const router = useRouter();
  const [door, setDoor] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Thanjavur");
  const [pincode, setPincode] = useState("");
  const [radius, setRadius] = useState("5");

  const isValid = door.trim() && street.trim() && city.trim() && pincode.length === 6;

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Service Area</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6 pt-6" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <Text className="text-on-surface text-xl font-bold mb-1">Your Base Location</Text>
        <Text className="text-on-surface-variant text-sm mb-6">Customers within your area will see your profile</Text>

        {/* Map placeholder */}
        <View className="h-44 bg-surface-container-low rounded-xl items-center justify-center mb-6 border border-outline-variant">
          <View
            className="w-12 h-12 rounded-full bg-appbar-bg items-center justify-center"
            style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 6 }}
          >
            <MapPin color="white" size={22} />
          </View>
          <Text className="text-appbar-bg text-xs mt-2 font-medium">Tap to set location</Text>
        </View>

        <View className="gap-4 mb-6">
          <View>
            <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Door / Shop No.</Text>
            <TextInput className="h-12 px-4 bg-surface-container-lowest rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Door / Flat / Shop No." placeholderTextColor="#926f66" value={door} onChangeText={setDoor} />
          </View>
          <View>
            <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Street / Area</Text>
            <TextInput className="h-12 px-4 bg-surface-container-lowest rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Street / Colony / Area" placeholderTextColor="#926f66" value={street} onChangeText={setStreet} />
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">City</Text>
              <TextInput className="h-12 px-4 bg-surface-container-lowest rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="City" placeholderTextColor="#926f66" value={city} onChangeText={setCity} />
            </View>
            <View className="w-32">
              <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Pincode</Text>
              <TextInput className="h-12 px-4 bg-surface-container-lowest rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Pincode" placeholderTextColor="#926f66" value={pincode} onChangeText={(t) => setPincode(t.replace(/\D/g, "").slice(0, 6))} keyboardType="number-pad" />
            </View>
          </View>
        </View>

        <Text className="text-on-surface text-sm font-semibold mb-3">Service Radius</Text>
        <View className="flex-row gap-3 mb-8">
          {["3", "5", "10", "15+"].map((r) => (
            <TouchableOpacity
              key={r}
              className={`px-4 py-2 rounded-full border-2 ${radius === r ? "bg-appbar-bg border-appbar-bg" : "bg-surface-container-lowest border-outline-variant"}`}
              onPress={() => setRadius(r)}
            >
              <Text className={`text-sm font-semibold ${radius === r ? "text-white" : "text-on-surface"}`}>{r} km</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          className={`rounded-xl h-14 items-center justify-center mb-8 ${isValid ? "bg-appbar-bg" : "bg-surface-container-high"}`}
          style={isValid ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
          disabled={!isValid}
          onPress={() => router.push("/onboarding/provider-services")}
        >
          <Text className={`text-base font-bold ${isValid ? "text-white" : "text-on-surface-variant"}`}>
            Save & Continue →
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
