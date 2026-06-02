import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, ShieldCheck } from "lucide-react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace("/onboarding/welcome"), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <LinearGradient
      colors={["#CC3700", "#FF4500", "#FF6040"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 items-center justify-center"
    >
      <View className="items-center gap-5">
        <View
          className="w-24 h-24 rounded-3xl bg-white/20 items-center justify-center"
          style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 }}
        >
          <MapPin color="#ffffff" size={44} />
        </View>
        <View className="items-center gap-1">
          <Text className="text-white text-5xl font-bold tracking-tight">Nearby</Text>
          <Text className="text-white/80 text-base">Your Neighborhood, Verified.</Text>
        </View>
        {/* Loading bar */}
        <View className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mt-4">
          <View className="h-full bg-white/70 rounded-full w-2/3" />
        </View>
      </View>

      {/* Aadhaar trust footer */}
      <View className="absolute bottom-12 items-center gap-2">
        <View className="flex-row items-center gap-2 bg-white/15 rounded-full px-4 py-2">
          <ShieldCheck color="#BF953F" size={16} />
          <Text className="text-white/80 text-xs font-semibold">Aadhaar-Powered Trust</Text>
        </View>
        <Text className="text-white/40 text-xs">Made for Bharat</Text>
      </View>
    </LinearGradient>
  );
}
