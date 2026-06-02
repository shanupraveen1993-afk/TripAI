import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Lock } from "lucide-react-native";

const NOTIFICATION_GROUPS = [
  {
    title: "Service Alerts",
    items: [
      { id: "service", label: "Service Updates",  desc: "Status of your active bookings",    value: true },
      { id: "promo",   label: "Promotions",        desc: "Special offers & discounts",        value: false },
      { id: "account", label: "Account Activity",  desc: "Login alerts & security updates",   value: true },
      { id: "tips",    label: "App Tips",           desc: "Feature guides & suggestions",      value: true },
    ],
  },
  {
    title: "Channels",
    items: [
      { id: "push",     label: "Push Notifications", desc: "In-app & device alerts",          value: true },
      { id: "sms",      label: "SMS",                desc: "Text message updates",             value: false },
      { id: "whatsapp", label: "WhatsApp",            desc: "Messages on WhatsApp",            value: true },
    ],
  },
];

function ToggleSwitch({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <TouchableOpacity
      className={`w-12 h-6 rounded-full justify-center px-0.5 ${value ? "bg-appbar-bg" : "bg-surface-container-high"}`}
      onPress={onChange}
    >
      <View
        className={`w-5 h-5 rounded-full bg-white ${value ? "ml-auto" : ""}`}
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 2, elevation: 2 }}
      />
    </TouchableOpacity>
  );
}

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState(NOTIFICATION_GROUPS);

  const toggle = (groupTitle: string, id: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.title === groupTitle
          ? { ...g, items: g.items.map((item) => item.id === id ? { ...item, value: !item.value } : item) }
          : g
      )
    );
  };

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-6 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Notifications</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {groups.map((group) => (
          <View key={group.title} className="mb-5">
            <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-3">{group.title}</Text>
            <View className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
              {group.items.map(({ id, label, desc, value }, i) => (
                <View key={id} className={`flex-row items-center gap-4 px-4 py-4 ${i > 0 ? "border-t border-outline-variant" : ""}`}>
                  <View className="flex-1">
                    <Text className="text-on-surface text-sm font-medium">{label}</Text>
                    <Text className="text-on-surface-variant text-xs mt-0.5">{desc}</Text>
                  </View>
                  <ToggleSwitch value={value} onChange={() => toggle(group.title, id)} />
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Quiet hours — locked pro */}
        <View className="bg-surface-container-high rounded-xl p-4 flex-row items-center gap-3 mb-8 opacity-60 border border-outline-variant">
          <Lock color="#926f66" size={20} />
          <View className="flex-1">
            <Text className="text-on-surface text-sm font-medium">Scheduled Quiet Hours</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">Pause notifications at specific times</Text>
          </View>
          <View className="bg-appbar-bg/20 rounded-full px-2 py-0.5">
            <Text className="text-appbar-bg text-xs font-semibold">Pro</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
