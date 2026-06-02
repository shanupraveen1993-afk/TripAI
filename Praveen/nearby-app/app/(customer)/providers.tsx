import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Star, MapPin, ShieldCheck, Phone, SlidersHorizontal } from "lucide-react-native";

const PROVIDERS = [
  { id: "1", name: "Rajesh Kumar", trade: "Expert Plumber",         rating: "4.9", reviews: 89,  dist: "0.5 km", exp: "12 yrs", badge: true,  available: true },
  { id: "2", name: "Amit Sharma",  trade: "Plumber",                rating: "4.8", reviews: 56,  dist: "1.2 km", exp: "8 yrs",  badge: true,  available: true },
  { id: "3", name: "Suresh Patel", trade: "Plumber & RO Specialist",rating: "4.7", reviews: 43,  dist: "1.8 km", exp: "5 yrs",  badge: true,  available: false },
  { id: "4", name: "Vikram Singh", trade: "Plumber",                rating: "4.9", reviews: 102, dist: "2.1 km", exp: "10 yrs", badge: false, available: true },
];

const FILTERS = ["Nearby", "Top Rated", "Experience", "Available Now"];

export default function ProvidersScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5">
        <View className="flex-row items-center gap-3 mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg">
            <ChevronLeft color="white" size={24} />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold flex-1">Plumbers Near You</Text>
          <TouchableOpacity className="bg-white/25 rounded-xl p-2" aria-label="Filter providers">
            <SlidersHorizontal color="white" size={18} />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-1">
          <View className="flex-row gap-2 px-1">
            {FILTERS.map((f, i) => (
              <View key={f} className={`px-4 py-1.5 rounded-full ${i === 0 ? "bg-white" : "bg-white/25"}`}>
                <Text className={`text-xs font-semibold ${i === 0 ? "text-appbar-bg" : "text-white"}`}>{f}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        <Text className="text-on-surface-variant text-xs mb-4">{PROVIDERS.length} providers found</Text>
        <View className="gap-4 pb-6">
          {PROVIDERS.map((p) => (
            <TouchableOpacity
              key={p.id}
              className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant"
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 }}
              onPress={() => router.push("/(customer)/provider-detail" as any)}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-14 h-14 rounded-full bg-primary-fixed items-center justify-center relative">
                  <Text className="text-trust-blue text-xl font-bold">{p.name[0]}</Text>
                  <View className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${p.available ? "bg-success-teal" : "bg-outline"}`} />
                  {p.badge && (
                    <View className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-aadhaar-gold border-2 border-white items-center justify-center">
                      <ShieldCheck color="white" size={9} />
                    </View>
                  )}
                </View>

                <View className="flex-1">
                  <Text className="text-on-surface text-sm font-bold">{p.name}</Text>
                  <Text className="text-brand-teal text-xs font-medium">{p.trade}<Text className="text-on-surface-variant font-normal"> · {p.exp}</Text></Text>
                  <View className="flex-row items-center gap-3 mt-1.5">
                    <View className="flex-row items-center gap-1">
                      <Star color="#FFC107" size={12} fill="#FFC107" />
                      <Text className="text-on-surface text-xs font-semibold">{p.rating}</Text>
                      <Text className="text-on-surface-variant text-xs">({p.reviews})</Text>
                    </View>
                    <View className="flex-row items-center gap-0.5">
                      <MapPin color="#926f66" size={11} />
                      <Text className="text-on-surface-variant text-xs">{p.dist}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  className="bg-appbar-bg rounded-xl px-3 py-2.5 items-center justify-center"
                  style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.35, shadowRadius: 5, elevation: 5 }}
                  onPress={() => router.push("/(customer)/call" as any)}
                >
                  <Phone color="white" size={16} />
                  <Text className="text-white text-[10px] font-semibold mt-0.5">Call</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
