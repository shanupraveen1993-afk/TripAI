import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Edit, ShieldCheck, Star, MapPin, Globe, HelpCircle, ChevronRight, LogOut, Wrench, Droplets, Zap } from "lucide-react-native";

const SERVICES = [
  { label: "Pipe Leakage",     icon: Droplets },
  { label: "Bathroom Fitting", icon: Wrench   },
  { label: "Tank Cleaning",    icon: Droplets },
  { label: "Electrician",      icon: Zap      },
];

export default function ProviderAccountScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        className="bg-surface-container-lowest pt-14 pb-4 px-5 flex-row items-center justify-between"
        style={{ borderBottomWidth: 1, borderBottomColor: "#e7bdb2" }}
      >
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high items-center justify-center">
            <Text className="text-on-surface-variant text-sm font-bold">R</Text>
          </View>
          <Text className="text-appbar-bg text-xl font-bold">Account</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center">
          <Edit color="#5d4038" size={20} />
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4 gap-4 pb-8">
        {/* Profile header card */}
        <View
          className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant overflow-hidden"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
        >
          {/* Aadhaar badge top-right */}
          <View className="absolute top-0 right-0 bg-aadhaar-gold px-3 py-1 rounded-bl-xl flex-row items-center gap-1.5">
            <ShieldCheck color="white" size={11} />
            <Text className="text-white text-xs font-bold uppercase tracking-wide">Verified Pro</Text>
          </View>

          <View className="items-center pt-2">
            <View className="relative mb-3">
              <View className="w-24 h-24 rounded-full border-4 border-appbar-bg/20 p-1 items-center justify-center">
                <View className="w-full h-full rounded-full bg-surface-container-high items-center justify-center">
                  <Text className="text-on-surface text-3xl font-bold">R</Text>
                </View>
              </View>
              <View
                className="absolute bottom-1 right-1 bg-success-teal rounded-full p-1.5 border-2 border-white"
                style={{ shadowColor: "#00A389", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 3 }}
              >
                <ShieldCheck color="white" size={10} />
              </View>
            </View>
            <View className="flex-row items-center gap-2 mb-0.5">
              <Text className="text-on-surface text-xl font-bold">Ramesh Kumar</Text>
              <TouchableOpacity>
                <Edit color="#926f66" size={16} />
              </TouchableOpacity>
            </View>
            <Text className="text-brand-teal text-sm font-semibold">Expert Plumber <Text className="text-on-surface-variant">· 12+ Years Exp.</Text></Text>
            <View className="flex-row items-center gap-1.5 mt-1.5">
              <View className="flex-row items-center gap-0.5">
                <Star color="#FFC107" size={14} fill="#FFC107" />
                <Text className="text-on-surface text-sm font-bold">4.9</Text>
              </View>
              <Text className="text-on-surface-variant text-sm">(450+ Reviews)</Text>
            </View>
          </View>
        </View>

        {/* Subscription card */}
        <View className="bg-surface-container-low border border-outline-variant rounded-xl p-4 items-center">
          <View className="bg-surface-container rounded-full px-3 py-1 mb-3 self-start border border-outline-variant">
            <Text className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Active Plan</Text>
          </View>
          <Text className="text-on-surface text-base font-bold self-start">Introductory Trial</Text>
          <Text className="text-on-surface-variant text-sm mt-1 self-start">Unlimited leads until end of the month.</Text>
          <TouchableOpacity
            className="w-full mt-4 h-14 rounded-xl items-center justify-center bg-appbar-bg"
            style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 }}
            onPress={() => router.push("/(provider)/growth-plans" as any)}
          >
            <Text className="text-white text-sm font-bold">Upgrade to Premium</Text>
          </TouchableOpacity>
        </View>

        {/* Service areas */}
        <View className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <View className="px-4 pt-4 pb-3 flex-row items-center justify-between border-b border-outline-variant">
            <Text className="text-on-surface text-sm font-bold">Service Areas</Text>
            <View className="bg-appbar-bg/10 rounded-full p-2">
              <MapPin color="#FF4500" size={16} />
            </View>
          </View>
          <View>
            <Text className="text-on-surface-variant text-sm px-4 py-2">Greater Noida &amp; Noida West</Text>
            <View className="mx-4 mb-4 rounded-xl overflow-hidden h-28 bg-surface-container-high items-center justify-center border border-outline-variant">
              <View className="w-12 h-12 rounded-full bg-appbar-bg/20 border-2 border-appbar-bg items-center justify-center">
                <View className="w-3 h-3 rounded-full bg-appbar-bg" />
              </View>
            </View>
          </View>
        </View>

        {/* Services offered */}
        <View className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-on-surface text-sm font-bold">Services Offered</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Edit color="#FF4500" size={14} />
              <Text className="text-appbar-bg text-xs font-bold">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {SERVICES.map(({ label, icon: Icon }) => (
              <View key={label} className="flex-row items-center gap-1.5 bg-surface-container-high rounded-xl px-3 py-2 border border-outline-variant">
                <Icon color="#5d4038" size={14} />
                <Text className="text-on-surface text-xs font-medium">{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View>
          <Text className="text-on-surface text-sm font-bold mb-3">Settings &amp; Support</Text>
          <View className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
            {[
              { icon: ShieldCheck, label: "Verification Status",  sub: "100% Verified",           iconColor: "#00A389" },
              { icon: Globe,       label: "Language Preference",  sub: "English, Tamil",           iconColor: "#FF4500" },
              { icon: HelpCircle,  label: "Help & Support",       sub: "Technical assistance 24/7", iconColor: "#926f66" },
            ].map(({ icon: Icon, label, sub, iconColor }, i) => (
              <TouchableOpacity key={label} className={`flex-row items-center gap-4 px-4 py-4 ${i > 0 ? "border-t border-outline-variant" : ""}`}>
                <View className="w-10 h-10 rounded-full bg-surface-container-high items-center justify-center">
                  <Icon color={iconColor} size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface text-sm font-semibold">{label}</Text>
                  <Text className="text-on-surface-variant text-xs font-medium">{sub}</Text>
                </View>
                <ChevronRight color="#926f66" size={16} />
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="flex-row items-center gap-4 px-4 py-4 border-t border-outline-variant"
              onPress={() => router.replace("/onboarding/welcome")}
            >
              <View className="w-10 h-10 rounded-full bg-error-red/10 items-center justify-center border border-error-red/20">
                <LogOut color="#D92D20" size={18} />
              </View>
              <Text className="flex-1 text-error-red text-sm font-bold">Logout</Text>
              <ChevronRight color="#D92D20" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
