import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Check, TrendingUp, BarChart2, Headphones, Star, Zap, ShieldCheck } from "lucide-react-native";

export default function GrowthPlansScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-4 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Upgrade Plan</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-4 pt-5" showsVerticalScrollIndicator={false}>
        <Text className="text-on-surface text-2xl font-bold mb-1">Grow Your Business</Text>
        <Text className="text-on-surface-variant text-sm mb-6">Choose a plan that fits your growth goals.</Text>

        <View className="gap-4 mb-5">
          {/* Active Trial Plan */}
          <View
            className="bg-surface-container-lowest rounded-xl border-2 border-appbar-bg p-5"
            style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.15, shadowRadius: 20, elevation: 4 }}
          >
            <View className="absolute top-0 right-0 bg-appbar-bg px-4 py-1 rounded-bl-xl">
              <Text className="text-white text-xs font-bold">ACTIVE</Text>
            </View>
            <View className="flex-row items-start justify-between mb-3 pr-16">
              <View>
                <Text className="text-on-surface text-base font-bold">Introductory Trial</Text>
                <Text className="text-appbar-bg text-xs font-bold mt-0.5">2 Months Validity</Text>
              </View>
              <Text className="text-on-surface text-3xl font-bold">₹0</Text>
            </View>
            <View className="flex-row items-center gap-2 mb-4">
              <Check color="#1B8A4A" size={16} />
              <Text className="text-on-surface-variant text-sm">Basic listing in local area</Text>
            </View>
            <View className="h-2 bg-surface-container rounded-full overflow-hidden mb-1.5">
              <View className="h-full bg-appbar-bg rounded-full" style={{ width: "65%" }} />
            </View>
            <Text className="text-on-surface-variant text-xs">42 days remaining in your trial</Text>
          </View>

          {/* Growth Portfolio */}
          <View
            className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}
          >
            <View className="flex-row items-start justify-between mb-3">
              <View>
                <View className="flex-row items-center gap-2">
                  <Text className="text-on-surface text-base font-bold">Growth Portfolio</Text>
                  <View className="bg-tertiary-container rounded-full px-2 py-0.5">
                    <Text className="text-on-tertiary-container text-xs font-bold">POPULAR</Text>
                  </View>
                </View>
                <Text className="text-appbar-bg text-xs font-bold mt-0.5">6 Months Validity</Text>
              </View>
              <Text className="text-on-surface text-2xl font-bold">₹1,000</Text>
            </View>
            <View className="gap-3 mb-5">
              {[
                { icon: Star,       text: "Premium visibility" },
                { icon: Zap,        text: "Unlimited incoming requests" },
                { icon: ShieldCheck,text: "Trust Badge on profile" },
              ].map(({ icon: Icon, text }) => (
                <View key={text} className="flex-row items-center gap-3">
                  <Icon color="#FF4500" size={18} />
                  <Text className="text-on-surface text-sm">{text}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              className="rounded-xl h-14 items-center justify-center bg-appbar-bg"
              style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 }}
            >
              <Text className="text-white text-base font-bold">Select Plan</Text>
            </TouchableOpacity>
          </View>

          {/* Enterprise — dark card */}
          <View
            className="bg-inverse-surface rounded-xl p-5 overflow-hidden"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 8 }}
          >
            <View className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
            <View className="flex-row items-start justify-between mb-3">
              <View>
                <Text className="text-inverse-on-surface text-base font-bold">Enterprise Business</Text>
                <Text className="text-appbar-bg text-xs font-bold mt-0.5">1 Year Validity</Text>
              </View>
              <Text className="text-inverse-on-surface text-2xl font-bold">₹2,000</Text>
            </View>
            <View className="gap-3 mb-5">
              {[
                { icon: TrendingUp, text: "Maximum search prominence" },
                { icon: BarChart2,  text: "Full business analytics" },
                { icon: Headphones, text: "Dedicated support manager" },
              ].map(({ icon: Icon, text }) => (
                <View key={text} className="flex-row items-center gap-3">
                  <Icon color="#FF4500" size={18} />
                  <Text className="text-inverse-on-surface/80 text-sm">{text}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              className="rounded-xl h-14 items-center justify-center bg-appbar-bg"
              style={{ shadowColor: "#CC3700", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.6, shadowRadius: 4, elevation: 0 }}
            >
              <Text className="text-white text-base font-bold">Choose Enterprise</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Trust indicator */}
        <View className="flex-row items-center gap-4 p-4 bg-surface-container-low rounded-xl border border-dashed border-outline-variant mb-8">
          <View className="items-center">
            <ShieldCheck color="#BF953F" size={28} />
            <Text className="text-on-surface-variant text-xs mt-0.5">Secure</Text>
          </View>
          <View className="w-px h-8 bg-outline-variant" />
          <Text className="flex-1 text-on-surface-variant text-sm">Trusted by 50,000+ Technicians across India.</Text>
        </View>
      </ScrollView>

      {/* Fixed footer CTA */}
      <View className="px-4 pb-8 pt-3 bg-surface border-t border-outline-variant">
        <TouchableOpacity
          className="bg-appbar-bg rounded-xl h-14 items-center justify-center flex-row gap-2"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.back()}
        >
          <Text className="text-white text-base font-bold">Go Premium →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
