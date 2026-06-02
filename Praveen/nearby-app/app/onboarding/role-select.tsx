import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Search, Wrench } from "lucide-react-native";

export default function RoleSelectScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<"customer" | "provider" | null>(null);

  const handleContinue = () => {
    if (selected === "customer") router.push("/onboarding/customer-signup");
    else if (selected === "provider") router.push("/onboarding/provider-signup");
  };

  return (
    <View className="flex-1 bg-surface px-6 pt-16 pb-10">
      <Text className="text-on-surface text-2xl font-bold mb-1">Who are you?</Text>
      <Text className="text-on-surface-variant text-sm mb-10">Choose your role to get started</Text>

      {/* Customer */}
      <TouchableOpacity
        className={`rounded-xl p-5 mb-4 border-2 ${selected === "customer" ? "border-appbar-bg bg-surface-container-low" : "border-outline-variant bg-surface-container-lowest"}`}
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}
        onPress={() => setSelected("customer")}
      >
        <View className="flex-row items-center gap-4">
          <View className={`w-14 h-14 rounded-xl items-center justify-center ${selected === "customer" ? "bg-appbar-bg" : "bg-surface-container-low"}`}>
            <Search color={selected === "customer" ? "white" : "#FF4500"} size={28} />
          </View>
          <View className="flex-1">
            <Text className="text-on-surface text-lg font-bold">I am a Customer</Text>
            <Text className="text-on-surface-variant text-sm mt-0.5">Book plumbers, electricians & more</Text>
          </View>
          <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${selected === "customer" ? "border-appbar-bg bg-appbar-bg" : "border-outline"}`}>
            {selected === "customer" && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
          </View>
        </View>
      </TouchableOpacity>

      {/* Provider */}
      <TouchableOpacity
        className={`rounded-xl p-5 border-2 ${selected === "provider" ? "border-appbar-bg bg-surface-container-low" : "border-outline-variant bg-surface-container-lowest"}`}
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}
        onPress={() => setSelected("provider")}
      >
        <View className="flex-row items-center gap-4">
          <View className={`w-14 h-14 rounded-xl items-center justify-center ${selected === "provider" ? "bg-appbar-bg" : "bg-surface-container-low"}`}>
            <Wrench color={selected === "provider" ? "white" : "#FF4500"} size={28} />
          </View>
          <View className="flex-1">
            <Text className="text-on-surface text-lg font-bold">I am a Technician</Text>
            <Text className="text-on-surface-variant text-sm mt-0.5">Earn by providing skilled services</Text>
          </View>
          <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${selected === "provider" ? "border-appbar-bg bg-appbar-bg" : "border-outline"}`}>
            {selected === "provider" && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
          </View>
        </View>
      </TouchableOpacity>

      <View className="flex-1" />

      <TouchableOpacity
        className={`rounded-xl h-14 items-center justify-center ${selected ? "bg-appbar-bg" : "bg-surface-container-high"}`}
        style={selected ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
        disabled={!selected}
        onPress={handleContinue}
      >
        <Text className={`text-base font-bold ${selected ? "text-white" : "text-on-surface-variant"}`}>
          Continue →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
