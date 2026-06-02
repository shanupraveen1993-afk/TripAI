import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { MapPin, Navigation } from "lucide-react-native";

const ADDRESS_TYPES = ["Home", "Work", "Other"];

export default function CustomerAddressScreen() {
  const router = useRouter();
  const [door, setDoor] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Thanjavur");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [type, setType] = useState("Home");

  const isValid = door.trim() && street.trim() && city.trim() && pincode.length === 6;

  return (
    <KeyboardAvoidingView className="flex-1 bg-surface" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      {/* Map */}
      <View className="h-72 bg-surface-container-low items-center justify-center relative">
        <View className="absolute inset-0 overflow-hidden" style={{ opacity: 0.2 }}>
          {[50, 100, 150, 200, 250].map((y) => (
            <View key={y} className="absolute left-0 right-0 h-px bg-appbar-bg" style={{ top: y }} />
          ))}
          {[50, 100, 150, 200, 250, 300, 350].map((x) => (
            <View key={x} className="absolute top-0 bottom-0 w-px bg-appbar-bg" style={{ left: x }} />
          ))}
        </View>
        <View className="items-center">
          <View
            className="w-12 h-12 rounded-full bg-appbar-bg items-center justify-center"
            style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8, elevation: 8 }}
          >
            <MapPin color="white" size={24} />
          </View>
          <View className="w-3 h-1.5 rounded-full bg-black/15 mt-1" />
        </View>
        <TouchableOpacity className="absolute top-12 right-4 bg-surface-container-lowest rounded-xl px-3 py-2 flex-row items-center gap-1.5 border border-outline-variant">
          <Navigation color="#FF4500" size={14} />
          <Text className="text-appbar-bg text-xs font-semibold">Use Current</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 bg-surface-container-lowest rounded-t-2xl -mt-4 overflow-hidden">
        <ScrollView className="flex-1 px-6 pt-6" keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text className="text-on-surface text-xl font-bold mb-1">Confirm Address</Text>
          <Text className="text-on-surface-variant text-sm mb-5">Tell us where to send the technician</Text>

          <View className="gap-4 mb-5">
            <View>
              <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Door / Flat No.</Text>
              <TextInput className="h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Door / Flat No." placeholderTextColor="#926f66" value={door} onChangeText={setDoor} />
            </View>
            <View>
              <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Street / Area</Text>
              <TextInput className="h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Street / Colony / Area" placeholderTextColor="#926f66" value={street} onChangeText={setStreet} />
            </View>
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">City</Text>
                <TextInput className="h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="City" placeholderTextColor="#926f66" value={city} onChangeText={setCity} />
              </View>
              <View className="w-32">
                <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Pincode</Text>
                <TextInput className="h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Pincode" placeholderTextColor="#926f66" value={pincode} onChangeText={(t) => setPincode(t.replace(/\D/g, "").slice(0, 6))} keyboardType="number-pad" />
              </View>
            </View>
            <View>
              <Text className="text-on-surface-variant text-xs font-semibold mb-1.5 uppercase tracking-wide">Landmark</Text>
              <TextInput className="h-12 px-4 bg-surface-container-low rounded-xl border border-outline-variant text-on-surface text-sm" placeholder="Landmark (optional)" placeholderTextColor="#926f66" value={landmark} onChangeText={setLandmark} />
            </View>
          </View>

          <Text className="text-on-surface text-sm font-semibold mb-3">Save as</Text>
          <View className="flex-row gap-3 mb-8">
            {ADDRESS_TYPES.map((t) => (
              <TouchableOpacity
                key={t}
                className={`px-5 py-2 rounded-full border-2 ${type === t ? "bg-appbar-bg border-appbar-bg" : "bg-surface-container-lowest border-outline-variant"}`}
                onPress={() => setType(t)}
              >
                <Text className={`text-sm font-semibold ${type === t ? "text-white" : "text-on-surface"}`}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className={`rounded-xl h-14 items-center justify-center mb-8 ${isValid ? "bg-appbar-bg" : "bg-surface-container-high"}`}
            style={isValid ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
            disabled={!isValid}
            onPress={() => router.replace("/(customer)/home")}
          >
            <Text className={`text-base font-bold ${isValid ? "text-white" : "text-on-surface-variant"}`}>
              Confirm Address
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
