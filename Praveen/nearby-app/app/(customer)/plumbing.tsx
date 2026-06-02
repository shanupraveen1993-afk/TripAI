import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ChevronRight, Droplets, Wrench, Eye, Activity, Layers, Settings, Zap, Waves } from "lucide-react-native";

const SERVICES = [
  { id: "tap",    icon: Droplets,  title: "Tap Fixing",          desc: "Leaking or broken taps repaired quickly",        price: "₹150–₹400" },
  { id: "wash",   icon: Wrench,    title: "Wash Basin Repair",   desc: "Basin fittings, drain & pipe issues",            price: "₹200–₹500" },
  { id: "leak",   icon: Eye,       title: "Leakage Detection",   desc: "Wall, floor & underground leak tracing",         price: "₹300–₹800" },
  { id: "toilet", icon: Activity,  title: "Toilet Fittings",     desc: "Seat, flush, cistern repair & installation",     price: "₹250–₹600" },
  { id: "ro",     icon: Layers,    title: "RO Fitting",          desc: "RO water purifier installation & service",       price: "₹400–₹800" },
  { id: "pipe",   icon: Settings,  title: "Pipe Fitting",        desc: "New pipelines & repair for home & office",       price: "₹300–₹900" },
  { id: "pump",   icon: Zap,       title: "Water Pump Repair",   desc: "Motor & pump servicing, replacement",            price: "₹500–₹1500" },
  { id: "tank",   icon: Waves,     title: "Water Tank Cleaning", desc: "Overhead & underground tank cleaning",           price: "₹600–₹1200" },
];

export default function PlumbingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-8 px-5">
        <TouchableOpacity onPress={() => router.back()} className="mb-4 p-2 rounded-lg self-start -ml-2">
          <ChevronLeft color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Expert Help for</Text>
        <Text className="text-white text-2xl font-bold">Your Home</Text>
        <Text className="text-white/80 text-sm mt-2">Certified plumbers · Aadhaar verified</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        <Text className="text-on-surface text-base font-bold mb-4">Choose a service</Text>
        <View className="gap-3 pb-6">
          {SERVICES.map(({ id, icon: Icon, title, desc, price }) => (
            <TouchableOpacity
              key={id}
              className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center gap-4 border border-outline-variant"
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}
              onPress={() => router.push("/(customer)/providers" as any)}
            >
              <View className="w-12 h-12 rounded-xl bg-teal-fixed items-center justify-center">
                <Icon color="#15767E" size={22} />
              </View>
              <View className="flex-1">
                <Text className="text-on-surface text-sm font-semibold">{title}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{desc}</Text>
                <Text className="text-appbar-bg text-xs font-semibold mt-1">{price}</Text>
              </View>
              <ChevronRight color="#926f66" size={18} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
