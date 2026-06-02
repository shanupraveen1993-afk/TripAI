import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Search, MapPin, Star, ShieldCheck, Droplets, Zap, Hammer, Paintbrush, Building2, Layers, Wrench, Bike, CircleDot, Phone } from "lucide-react-native";

const SERVICES = [
  { id: "plumbing",   icon: Droplets,   label: "Plumbing",    color: "#0056D2", bg: "#EBF0FF", route: "/(customer)/plumbing" },
  { id: "electrical", icon: Zap,        label: "Electrical",  color: "#D97706", bg: "#FEF3C7", route: "/(customer)/providers" },
  { id: "carpentry",  icon: Hammer,     label: "Carpentry",   color: "#92400E", bg: "#FDF3E7", route: "/(customer)/providers" },
  { id: "painting",   icon: Paintbrush, label: "Painting",    color: "#BE185D", bg: "#FCE7F3", route: "/(customer)/providers" },
  { id: "civil",      icon: Building2,  label: "Civil Mason", color: "#475569", bg: "#F1F5F9", route: "/(customer)/providers" },
  { id: "tile",       icon: Layers,     label: "Tile Mason",  color: "#15767E", bg: "#D1EDEF", route: "/(customer)/providers" },
  { id: "appliance",  icon: Wrench,     label: "Appliance",   color: "#4338CA", bg: "#EEF2FF", route: "/(customer)/providers" },
  { id: "bike",       icon: Bike,       label: "Bike Mech",   color: "#DC2626", bg: "#FEF2F2", route: "/(customer)/providers" },
  { id: "puncture",   icon: CircleDot,  label: "Puncture",    color: "#57534E", bg: "#F5F5F4", route: "/(customer)/providers" },
];

export default function CustomerHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="bg-surface-container-lowest pt-14 pb-4 px-5 flex-row items-center justify-between"
        style={{ borderBottomWidth: 1, borderBottomColor: "#ffe2db" }}>
        <View>
          <Text className="text-on-surface text-xl font-bold">Hi Praveen</Text>
          <View className="flex-row items-center gap-1 mt-0.5">
            <MapPin color="#FF4500" size={13} />
            <Text className="text-on-surface-variant text-sm">Sriram nagar, Thiruvaiyaru</Text>
          </View>
        </View>
        <TouchableOpacity
          className="w-10 h-10 rounded-full bg-primary-fixed items-center justify-center"
          onPress={() => router.push("/(customer)/profile" as any)}
        >
          <Text className="text-trust-blue text-base font-bold">P</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-4 gap-4 pb-6">
        {/* Search */}
        <View className="flex-row items-center bg-surface-container-low rounded-xl px-4 py-3.5 gap-2.5 border border-outline-variant">
          <Search color="#926f66" size={18} />
          <Text className="text-on-surface-variant text-sm flex-1">Search for plumbing, electrical...</Text>
        </View>

        {/* Promo banner */}
        <View className="rounded-xl p-5 overflow-hidden" style={{ backgroundColor: "#FF4500" }}>
          <View className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/10" />
          <View className="absolute -left-6 -top-6 w-36 h-36 rounded-full bg-white/10" />
          <View>
            <View className="bg-white/20 self-start rounded-full px-2.5 py-1 mb-2">
              <Text className="text-white text-xs font-bold uppercase tracking-widest">Offer</Text>
            </View>
            <Text className="text-white text-xl font-bold">180 Days Free Trial</Text>
            <Text className="text-white/90 text-sm mt-1.5">Premium service calls at ₹0 for 6 months</Text>
            <TouchableOpacity className="mt-4 bg-white rounded-xl px-5 h-10 items-center justify-center self-start">
              <Text className="text-appbar-bg text-sm font-bold">Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trusted Badge */}
        <View className="flex-row items-center bg-surface-container-low rounded-xl px-4 py-3 gap-2.5 border border-outline-variant">
          <ShieldCheck color="#00A389" size={18} />
          <Text className="text-on-surface-variant text-xs font-semibold flex-1">All 500+ local professionals are Aadhaar-verified for your safety.</Text>
        </View>

        {/* 3×3 Service grid */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-on-surface text-base font-bold">Our Services</Text>
            <Text className="text-appbar-bg text-xs font-semibold">View All</Text>
          </View>
          <View className="flex-row flex-wrap" style={{ gap: 10 }}>
            {SERVICES.map(({ id, icon: Icon, label, color, bg, route }) => (
              <TouchableOpacity
                key={id}
                className="items-center justify-center bg-surface-container-lowest rounded-xl py-3.5 border border-outline-variant"
                style={{ width: "30.5%", shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 3, elevation: 1 }}
                onPress={() => router.push(route as any)}
              >
                <View className="w-12 h-12 rounded-full items-center justify-center mb-2.5" style={{ backgroundColor: bg }}>
                  <Icon color={color} size={22} />
                </View>
                <Text className="text-on-surface text-xs font-semibold text-center">{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Rated Nearby */}
        <View>
          <Text className="text-on-surface text-base font-bold mb-3">Top Rated Nearby</Text>
          <View
            className="bg-surface-container-lowest rounded-xl p-4 flex-row gap-4 border border-outline-variant"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 }}
          >
            <View className="w-20 h-20 rounded-xl bg-surface-container-high items-center justify-center relative flex-shrink-0">
              <Text className="text-on-surface-variant text-3xl font-bold">R</Text>
              <View className="absolute bottom-0 right-0 bg-success-teal rounded-tl-lg p-1">
                <ShieldCheck color="white" size={10} />
              </View>
            </View>
            <View className="flex-1 justify-between">
              <View>
                <View className="flex-row items-start justify-between">
                  <View>
                    <Text className="text-on-surface text-base font-bold">Ramesh Kumar</Text>
                    <Text className="text-brand-teal text-xs font-medium">Master Electrician<Text className="text-on-surface-variant font-normal"> · 8 yrs exp</Text></Text>
                  </View>
                  <View className="flex-row items-center bg-surface-container-high rounded-full px-2 py-0.5 gap-1">
                    <Star color="#FFC107" size={12} fill="#FFC107" />
                    <Text className="text-on-surface text-xs font-bold">4.9</Text>
                  </View>
                </View>
              </View>
              <View className="flex-row gap-2 mt-3">
                <TouchableOpacity
                  className="flex-1 bg-appbar-bg rounded-xl h-10 items-center justify-center"
                  style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 }}
                  onPress={() => router.push("/(customer)/provider-detail" as any)}
                >
                  <Text className="text-white text-sm font-bold">Book Service</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="w-10 h-10 rounded-xl border border-appbar-bg items-center justify-center"
                  onPress={() => router.push("/(customer)/call" as any)}
                >
                  <Phone color="#FF4500" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
