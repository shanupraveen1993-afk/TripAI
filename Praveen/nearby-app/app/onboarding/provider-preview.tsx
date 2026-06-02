import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Edit, ShieldCheck, MapPin } from "lucide-react-native";

const SKILLS = ["Leak Repair", "Pipe Fitting", "Drain Cleaning", "RO Fitting"];

export default function ProviderPreviewScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Preview Profile</Text>
        <TouchableOpacity className="p-2 rounded-lg hover:bg-white/10">
          <Edit color="white" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        <View className="bg-surface-container-lowest rounded-xl overflow-hidden mb-4 border border-outline-variant" style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 }}>
          <View className="items-center pt-6 pb-4 px-4">
            <View className="w-24 h-24 rounded-xl bg-primary-fixed items-center justify-center mb-3 relative">
              <Text className="text-trust-blue text-3xl font-bold">R</Text>
              <View className="absolute -bottom-2 -right-2 bg-aadhaar-gold rounded-full px-2 py-0.5 flex-row items-center gap-1">
                <ShieldCheck color="white" size={10} />
                <Text className="text-white text-[9px] font-bold">AADHAAR</Text>
              </View>
            </View>
            <Text className="text-on-surface text-xl font-bold">Ramesh Kumar</Text>
            <Text className="text-on-surface-variant text-sm">+91 98765 43210</Text>
            <View className="flex-row gap-2 mt-3">
              <View className="bg-surface-container-low rounded-full px-3 py-1 border border-outline-variant">
                <Text className="text-appbar-bg text-xs font-semibold">Expert Plumber</Text>
              </View>
              <View className="bg-surface-container-low rounded-full px-3 py-1 border border-outline-variant">
                <Text className="text-on-surface-variant text-xs font-medium">8 Years Exp.</Text>
              </View>
            </View>
          </View>

          <View className="h-px bg-outline-variant mx-4" />
          <View className="flex-row items-center gap-3 px-4 py-3">
            <MapPin color="#926f66" size={16} />
            <Text className="text-on-surface-variant text-sm flex-1">42/B Royal Arcade, HSR Layout, Bangalore</Text>
          </View>
          <View className="h-px bg-outline-variant mx-4" />

          <View className="px-4 py-4">
            <Text className="text-on-surface text-sm font-semibold mb-3">Skills</Text>
            <View className="flex-row flex-wrap gap-2">
              {SKILLS.map((s) => (
                <View key={s} className="border border-appbar-bg rounded-full px-3 py-1">
                  <Text className="text-appbar-bg text-xs font-medium">{s}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="bg-[#FFF8E7] border border-aadhaar-gold/30 rounded-xl p-3 mb-6">
          <Text className="text-[#8B6914] text-xs text-center">
            Your profile will be reviewed within 24 hours before going live
          </Text>
        </View>
      </ScrollView>

      <View className="px-5 pb-8 pt-4 bg-surface-container-lowest border-t border-outline-variant gap-3">
        <TouchableOpacity
          className="bg-appbar-bg rounded-xl h-14 items-center justify-center"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.replace("/(provider)/dashboard")}
        >
          <Text className="text-white text-base font-bold">Finish Setup ✓</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border-2 border-appbar-bg rounded-xl h-14 items-center justify-center" onPress={() => router.back()}>
          <Text className="text-appbar-bg text-base font-semibold">Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
