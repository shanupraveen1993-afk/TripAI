import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MapPin, Star, PhoneCall, X } from "lucide-react-native";

export default function IncomingCallScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-container-low">
      {/* Map background grid */}
      <View className="absolute inset-0">
        {[60, 120, 180, 240, 300, 360, 420].map((y) => (
          <View key={y} className="absolute left-0 right-0 h-px bg-appbar-bg/10" style={{ top: y }} />
        ))}
        {[60, 120, 180, 240, 300, 360].map((x) => (
          <View key={x} className="absolute top-0 bottom-0 w-px bg-appbar-bg/10" style={{ left: x }} />
        ))}
      </View>

      {/* Header pill */}
      <View className="pt-14 px-5 items-center">
        <View className="bg-surface-container-lowest rounded-full px-6 py-2 flex-row items-center gap-2 shadow-sm border border-outline-variant">
          <View className="w-2 h-2 rounded-full bg-status-success" />
          <Text className="text-on-surface text-sm font-semibold">Incoming Request</Text>
        </View>
      </View>

      {/* Pulsing location pin */}
      <View className="flex-1 items-center justify-center">
        <View className="absolute w-40 h-40 rounded-full bg-appbar-bg/10" />
        <View className="absolute w-24 h-24 rounded-full bg-appbar-bg/15" />
        <View
          className="w-16 h-16 rounded-full bg-appbar-bg items-center justify-center mb-2"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 8 }}
        >
          <MapPin color="white" size={28} />
        </View>
        <View className="bg-surface-container-lowest rounded-full px-3 py-1 mt-2 border border-outline-variant">
          <Text className="text-appbar-bg text-xs font-bold">1.2 km away</Text>
        </View>
      </View>

      {/* Request card */}
      <View
        className="mx-5 mb-8 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 20, elevation: 12 }}
      >
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-wide">Incoming Request</Text>
            <Text className="text-on-surface text-xl font-bold mt-0.5">Praveen Kumar</Text>
          </View>
          <View className="flex-row items-center gap-1 bg-surface-container-low rounded-full px-3 py-1 border border-outline-variant">
            <Star color="#FFC107" size={12} fill="#FFC107" />
            <Text className="text-on-surface text-xs font-bold">4.9</Text>
          </View>
        </View>

        {/* Service details */}
        <View className="bg-surface-container-low rounded-xl p-3 mb-3 flex-row items-center gap-3 border border-outline-variant">
          <View className="w-10 h-10 rounded-xl bg-surface-container items-center justify-center">
            <MapPin color="#FF4500" size={18} />
          </View>
          <View className="flex-1">
            <Text className="text-on-surface text-sm font-semibold">Plumbing - Tap Fixing</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Sriram Nagar Phase 2</Text>
          </View>
        </View>

        {/* Job value */}
        <View className="flex-row items-center gap-1.5 mb-5">
          <Text className="text-on-surface-variant text-sm">Estimated job value:</Text>
          <Text className="text-status-success text-sm font-bold">₹250 – ₹400</Text>
        </View>

        {/* Accept / Decline */}
        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-surface-container-high rounded-xl h-14 items-center justify-center flex-row gap-2 border border-outline-variant"
            onPress={() => router.back()}
          >
            <X color="#5d4038" size={18} />
            <Text className="text-on-surface-variant text-sm font-semibold">Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-appbar-bg rounded-xl h-14 items-center justify-center flex-row gap-2"
            style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 }}
            onPress={() => router.push("/(provider)/calls" as any)}
          >
            <PhoneCall color="white" size={18} />
            <Text className="text-white text-sm font-bold">Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
