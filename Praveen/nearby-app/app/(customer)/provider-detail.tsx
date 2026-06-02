import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Star, ShieldCheck, MapPin, Phone } from "lucide-react-native";

const REVIEWS = [
  { name: "Amit Patel",   rating: 5, text: "Excellent work! Fixed my bathroom tap within 30 minutes. Very professional.", time: "2 days ago" },
  { name: "Sunita Mishra",rating: 4, text: "Good service. Came on time and solved the leakage problem.",                  time: "1 week ago" },
];

export default function ProviderDetailScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar h-14 */}
      <View className="bg-appbar-bg pt-14 pb-4 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Provider Profile</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="bg-surface-container-lowest px-5 pt-6 pb-5">
          <View className="items-center mb-4">
            <View className="w-24 h-24 rounded-full bg-primary-fixed items-center justify-center mb-3 relative">
              <Text className="text-trust-blue text-4xl font-bold">R</Text>
              <View className="absolute bottom-0 right-0 bg-aadhaar-gold rounded-full px-2 py-0.5 flex-row items-center gap-0.5">
                <ShieldCheck color="white" size={10} />
                <Text className="text-white text-[9px] font-bold">VERIFIED</Text>
              </View>
            </View>
            <Text className="text-on-surface text-xl font-bold">Rajesh Kumar</Text>
            <Text className="text-brand-teal text-sm font-medium">Expert Plumber<Text className="text-on-surface-variant font-normal"> · 12 years experience</Text></Text>
            <View className="flex-row items-center gap-2 mt-2">
              <View className="flex-row items-center gap-1">
                {[1,2,3,4,5].map((s) => <Star key={s} color="#FFC107" size={14} fill="#FFC107" />)}
              </View>
              <Text className="text-on-surface text-sm font-bold">4.9</Text>
              <Text className="text-on-surface-variant text-sm">(89 reviews)</Text>
            </View>
          </View>

          <View className="flex-row gap-3 mb-4">
            {[["128", "Jobs Done"], ["4.9★", "Rating"], ["12 yrs", "Experience"]].map(([val, lbl]) => (
              <View key={lbl} className="flex-1 bg-surface-container-lowest rounded-xl p-3 items-center border border-outline-variant">
                <Text className="text-appbar-bg text-base font-bold">{val}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{lbl}</Text>
              </View>
            ))}
          </View>

          <View className="flex-row items-center gap-2 bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant">
            <MapPin color="#FF4500" size={16} />
            <Text className="text-on-surface text-sm">2.4 km away · Sriram Nagar, Thanjavur</Text>
          </View>
        </View>

        {/* Map placeholder */}
        <View className="h-36 bg-surface-container-low items-center justify-center">
          <View className="w-10 h-10 rounded-full bg-appbar-bg items-center justify-center">
            <MapPin color="white" size={18} />
          </View>
          <Text className="text-appbar-bg text-xs font-medium mt-1">2.4 km away</Text>
        </View>

        <View className="px-5 pt-5 pb-6 gap-5">
          <View>
            <Text className="text-on-surface text-base font-bold mb-2">About</Text>
            <Text className="text-on-surface-variant text-sm leading-5">
              Certified plumber with 12 years of experience in residential and commercial projects. Specializes in tap fixing, pipe fitting, and water pump repair. Aadhaar verified professional.
            </Text>
          </View>

          <View>
            <Text className="text-on-surface text-base font-bold mb-3">Customer Reviews</Text>
            <View className="gap-3">
              {REVIEWS.map((r) => (
                <View key={r.name} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-on-surface text-sm font-semibold">{r.name}</Text>
                    <View className="flex-row items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} color="#FFC107" size={12} fill="#FFC107" />
                      ))}
                    </View>
                  </View>
                  <Text className="text-on-surface-variant text-xs leading-4">{r.text}</Text>
                  <Text className="text-on-surface-variant text-xs mt-2">{r.time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CTA */}
      <View className="px-5 pb-8 pt-4 bg-surface-container-lowest border-t border-outline-variant">
        <TouchableOpacity
          className="bg-appbar-bg rounded-xl h-14 items-center justify-center flex-row gap-2"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.push("/(customer)/call" as any)}
        >
          <Phone color="white" size={18} />
          <Text className="text-white text-base font-bold">Call Rajesh Kumar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
