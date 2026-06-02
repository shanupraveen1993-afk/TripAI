import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, CheckCircle, Droplets, Zap, Hammer, Paintbrush, Building2, Layers, Wrench, Bike, CircleDot } from "lucide-react-native";

const SERVICES = [
  { id: "plumbing",   label: "Plumbing",    icon: Droplets,    color: "#0056D2", bg: "#dae2ff" },
  { id: "electrical", label: "Electrical",  icon: Zap,         color: "#D97706", bg: "#FEF3C7" },
  { id: "carpentry",  label: "Carpentry",   icon: Hammer,      color: "#8B4513", bg: "#f5e6d8" },
  { id: "painting",   label: "Painting",    icon: Paintbrush,  color: "#9C27B0", bg: "#f3e5f5" },
  { id: "civil",      label: "Civil Mason", icon: Building2,   color: "#607D8B", bg: "#eceff1" },
  { id: "tile",       label: "Tile Mason",  icon: Layers,      color: "#E91E63", bg: "#fce4ec" },
  { id: "appliance",  label: "Appliance",   icon: Wrench,      color: "#00A389", bg: "#d0f0ea" },
  { id: "bike",       label: "Bike Mech.",  icon: Bike,        color: "#FF5722", bg: "#fbe9e7" },
  { id: "puncture",   label: "Puncture",    icon: CircleDot,   color: "#795548", bg: "#efebe9" },
];

export default function ProviderServicesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected((prev) =>
    prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
  );

  const hasSelection = selected.length > 0;

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Services</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-on-surface text-xl font-bold mb-1">What services do you offer?</Text>
        <Text className="text-on-surface-variant text-sm mb-6">Select all that apply — you can change later</Text>

        <View className="flex-row flex-wrap gap-3 mb-8">
          {SERVICES.map(({ id, label, icon: Icon, color, bg }) => {
            const isSelected = selected.includes(id);
            return (
              <TouchableOpacity
                key={id}
                className={`rounded-xl p-4 items-center justify-center relative border-2 ${
                  isSelected ? "border-appbar-bg bg-surface-container-low" : "border-outline-variant bg-surface-container-lowest"
                }`}
                style={{ width: "30%" }}
                onPress={() => toggle(id)}
              >
                {isSelected && (
                  <View className="absolute top-2 right-2">
                    <CheckCircle color="#FF4500" size={16} fill="#FF4500" />
                  </View>
                )}
                <View className="w-11 h-11 rounded-xl items-center justify-center mb-2" style={{ backgroundColor: bg }}>
                  <Icon color={color} size={22} />
                </View>
                <Text className="text-on-surface text-xs font-semibold text-center">{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View className="px-5 pb-8 pt-4 bg-surface-container-lowest border-t border-outline-variant">
        {selected.length > 0 && (
          <Text className="text-on-surface-variant text-xs text-center mb-3">
            {selected.length} service{selected.length > 1 ? "s" : ""} selected
          </Text>
        )}
        <TouchableOpacity
          className={`rounded-xl h-14 items-center justify-center ${hasSelection ? "bg-appbar-bg" : "bg-surface-container-high"}`}
          style={hasSelection ? { shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 } : {}}
          disabled={!hasSelection}
          onPress={() => router.push("/onboarding/provider-skills")}
        >
          <Text className={`text-base font-bold ${hasSelection ? "text-white" : "text-on-surface-variant"}`}>
            Continue →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
