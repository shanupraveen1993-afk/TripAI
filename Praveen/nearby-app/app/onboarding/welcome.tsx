import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MapPin, ShieldCheck, Zap, Star } from "lucide-react-native";

const FEATURES = [
  { icon: ShieldCheck, label: "Aadhaar-verified technicians", color: "#BF953F" },
  { icon: Zap,         label: "Book in 60 seconds, no waiting", color: "#FF4500" },
  { icon: Star,        label: "Rated by real community users",  color: "#00A389" },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      <LinearGradient colors={["#CC3700", "#FF4500"]} className="pt-16 pb-12 px-6 items-center">
        <View className="w-16 h-16 rounded-2xl bg-white/20 items-center justify-center mb-4">
          <MapPin color="#ffffff" size={32} />
        </View>
        <Text className="text-white text-3xl font-bold text-center">Welcome to Nearby</Text>
        <Text className="text-white/80 text-base text-center mt-2 leading-relaxed">
          Hyperlocal services from trusted technicians in your city
        </Text>
      </LinearGradient>

      <View className="flex-1 px-6 pt-8">
        <View className="gap-5 mb-10">
          {FEATURES.map(({ icon: Icon, label, color }) => (
            <View key={label} className="flex-row items-center gap-4">
              <View className="w-11 h-11 rounded-xl items-center justify-center" style={{ backgroundColor: color + "20" }}>
                <Icon color={color} size={22} />
              </View>
              <Text className="text-on-surface text-sm font-medium flex-1">{label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          className="bg-appbar-bg rounded-xl h-14 items-center justify-center"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.push("/onboarding/role-select")}
        >
          <Text className="text-white text-base font-bold">Get Started →</Text>
        </TouchableOpacity>

        <Text className="text-on-surface-variant text-xs text-center mt-4 px-4">
          By continuing you agree to our{" "}
          <Text className="text-appbar-bg font-medium">Terms</Text> and{" "}
          <Text className="text-appbar-bg font-medium">Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}
