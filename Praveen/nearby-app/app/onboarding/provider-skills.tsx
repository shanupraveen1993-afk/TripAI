import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, ShieldCheck } from "lucide-react-native";

const EXPERIENCE_YEARS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];
const SKILLS = [
  { id: "tap",    label: "Tap Fixing",           defaultChecked: true },
  { id: "wash",   label: "Wash Basin Repair" },
  { id: "leak",   label: "Leakage Detection",    defaultChecked: true },
  { id: "toilet", label: "Toilet Fittings" },
  { id: "ro",     label: "RO Fitting" },
  { id: "pipe",   label: "Pipe Fitting",         defaultChecked: true },
  { id: "pump",   label: "Water Pump Repair" },
  { id: "tank",   label: "Water Tank Cleaning" },
];

export default function ProviderSkillsScreen() {
  const router = useRouter();
  const [exp, setExp] = useState<string[]>(["3", "5", "7"]);
  const [skills, setSkills] = useState<string[]>(SKILLS.filter((s) => s.defaultChecked).map((s) => s.id));

  const toggleExp = (y: string) => setExp((prev) => prev.includes(y) ? prev.filter((e) => e !== y) : [...prev, y]);
  const toggleSkill = (id: string) => setSkills((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg hover:bg-white/10" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Plumbing</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Progress */}
        <View className="mb-6">
          <View className="flex-row justify-between mb-1">
            <Text className="text-on-surface-variant text-xs">Profile completion</Text>
            <Text className="text-appbar-bg text-xs font-semibold">60%</Text>
          </View>
          <View className="h-2 bg-surface-container-high rounded-full overflow-hidden">
            <View className="h-full bg-appbar-bg rounded-full" style={{ width: "60%" }} />
          </View>
        </View>

        <Text className="text-on-surface text-base font-bold mb-3">Years of Experience</Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {EXPERIENCE_YEARS.map((y) => {
            const isActive = exp.includes(y);
            return (
              <TouchableOpacity
                key={y}
                className={`px-4 py-2 rounded-xl border-2 ${isActive ? "bg-appbar-bg border-appbar-bg" : "border-outline-variant bg-surface-container-low"}`}
                onPress={() => toggleExp(y)}
              >
                <Text className={`text-sm font-semibold ${isActive ? "text-white" : "text-on-surface"}`}>{y}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text className="text-on-surface text-base font-bold mb-3">Your Skills</Text>
        <View className="gap-2 mb-5">
          {SKILLS.map(({ id, label }) => {
            const isChecked = skills.includes(id);
            return (
              <TouchableOpacity
                key={id}
                className={`flex-row items-center gap-3 p-3.5 rounded-xl border ${isChecked ? "bg-surface-container-low border-appbar-bg/30" : "bg-surface-container-low border-transparent"}`}
                onPress={() => toggleSkill(id)}
              >
                <View className={`w-5 h-5 rounded border-2 items-center justify-center ${isChecked ? "bg-appbar-bg border-appbar-bg" : "border-outline"}`}>
                  {isChecked && <Text className="text-white text-xs font-bold">✓</Text>}
                </View>
                <Text className={`text-sm font-medium ${isChecked ? "text-appbar-bg" : "text-on-surface"}`}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View className="bg-surface-container-low rounded-xl p-4 flex-row items-center gap-3 mb-8 border border-outline-variant">
          <ShieldCheck color="#00A389" size={22} />
          <View className="flex-1">
            <Text className="text-on-surface text-sm font-semibold">Skill Verification</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Skills are cross-verified by our team post-registration</Text>
          </View>
        </View>
      </ScrollView>

      <View className="px-5 pb-8 pt-4 bg-surface-container-lowest border-t border-outline-variant">
        <TouchableOpacity
          className="bg-appbar-bg rounded-xl h-14 items-center justify-center"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 }}
          onPress={() => router.push("/onboarding/provider-preview")}
        >
          <Text className="text-white text-base font-bold">Save & Continue →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
