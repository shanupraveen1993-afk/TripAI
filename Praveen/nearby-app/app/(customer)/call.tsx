import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Mic, Hash, Volume2, PhoneOff, ShieldCheck } from "lucide-react-native";

export default function InAppCallScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-trust-blue">
      {/* Header */}
      <View className="pt-14 pb-4 px-5 flex-row items-center justify-between">
        <Text className="text-white text-base font-bold">Secure Call</Text>
        <View className="bg-status-success-bg/20 rounded-full px-3 py-1 flex-row items-center gap-1.5">
          <ShieldCheck color="#1B8A4A" size={13} />
          <Text className="text-white text-xs font-semibold">Encrypted</Text>
        </View>
      </View>

      {/* Distance chip */}
      <View className="items-center mt-2 mb-8">
        <View className="bg-white/15 rounded-full px-4 py-1.5">
          <Text className="text-white/90 text-xs font-medium">2.4 km away · Sriram Nagar</Text>
        </View>
      </View>

      {/* Provider info + pulsing rings */}
      <View className="flex-1 items-center justify-center">
        <View className="absolute w-56 h-56 rounded-full bg-white/5" />
        <View className="absolute w-44 h-44 rounded-full bg-white/10" />

        {/* Avatar */}
        <View className="w-28 h-28 rounded-full bg-white/20 items-center justify-center mb-6">
          <Text className="text-white text-5xl font-bold">R</Text>
        </View>

        <Text className="text-white text-2xl font-bold mb-1">Rajesh Kumar</Text>
        <Text className="text-white/80 text-base">Plumber</Text>
        <View className="flex-row items-center gap-1.5 mt-2">
          <View className="w-2 h-2 rounded-full bg-status-success" />
          <Text className="text-white text-sm font-medium" style={{ color: "#1B8A4A" }}>Calling...</Text>
        </View>
      </View>

      {/* Controls */}
      <View className="px-10 pb-16">
        <View className="flex-row justify-around mb-8">
          {[
            { icon: Mic, label: "Mute" },
            { icon: Hash, label: "Keypad" },
            { icon: Volume2, label: "Speaker" },
          ].map(({ icon: Icon, label }) => (
            <View key={label} className="items-center gap-2">
              <View className="w-14 h-14 rounded-full bg-white/15 items-center justify-center">
                <Icon color="white" size={22} />
              </View>
              <Text className="text-white/70 text-xs">{label}</Text>
            </View>
          ))}
        </View>

        {/* End call */}
        <TouchableOpacity
          className="bg-error-red rounded-xl h-14 items-center justify-center"
          style={{ shadowColor: "#D92D20", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.push("/(customer)/review-status" as any)}
        >
          <View className="flex-row items-center gap-2">
            <PhoneOff color="white" size={20} />
            <Text className="text-white text-base font-bold">END CALL</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
