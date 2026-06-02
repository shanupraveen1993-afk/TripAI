import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Search, CreditCard, Star, Shield, ChevronDown, ChevronUp, MessageCircle, Phone } from "lucide-react-native";

const CATEGORIES = [
  { id: "payments", icon: CreditCard, label: "Payments",        sub: "Billing, refunds & transactions", color: "#FF4500", bg: "#fff1ed", large: true },
  { id: "quality",  icon: Star,       label: "Service Quality", sub: "Complaints & feedback",          color: "#15767E", bg: "#D1EDEF", large: false },
  { id: "account",  icon: Shield,     label: "Account Access",  sub: "Login & security",               color: "#0056D2", bg: "#dae2ff", large: false },
];

const FAQS = [
  { q: "How do I book a service?", a: "Tap on any service from the home screen, browse available providers, and tap 'Call' to connect directly with a technician." },
  { q: "Is my call secure and private?", a: "Yes! All calls are routed through our encrypted proxy system. Your real phone number is never shared with the provider." },
  { q: "What if the provider doesn't answer?", a: "If a provider doesn't answer, you can report it via 'Review Status' and we'll immediately suggest other available providers nearby." },
];

export default function HelpCenterScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg" aria-label="Go back">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold flex-1 text-center">Help Center</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View className="flex-row items-center bg-surface-container-lowest rounded-xl px-4 py-3 gap-2 mb-5 border border-outline-variant">
          <Search color="#926f66" size={18} />
          <Text className="text-on-surface-variant text-sm flex-1">Search help articles...</Text>
        </View>

        <Text className="text-on-surface text-base font-bold mb-3">Browse by Topic</Text>
        <View className="mb-5">
          {/* Large card */}
          {CATEGORIES.filter((c) => c.large).map(({ id, icon: Icon, label, sub, color, bg }) => (
            <TouchableOpacity key={id} className="rounded-xl p-5 mb-3 flex-row items-center gap-4 border border-outline-variant" style={{ backgroundColor: bg }}>
              <View className="w-14 h-14 rounded-xl bg-white/70 items-center justify-center">
                <Icon color={color} size={28} />
              </View>
              <View className="flex-1">
                <Text className="text-on-surface text-base font-bold">{label}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{sub}</Text>
              </View>
            </TouchableOpacity>
          ))}
          {/* Small cards row */}
          <View className="flex-row gap-3">
            {CATEGORIES.filter((c) => !c.large).map(({ id, icon: Icon, label, color, bg }) => (
              <TouchableOpacity key={id} className="flex-1 rounded-xl p-4 items-center border border-outline-variant" style={{ backgroundColor: bg }}>
                <View className="w-12 h-12 rounded-xl bg-white/70 items-center justify-center mb-2">
                  <Icon color={color} size={24} />
                </View>
                <Text className="text-on-surface text-sm font-semibold text-center">{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Text className="text-on-surface text-base font-bold mb-3">Frequently Asked</Text>
        <View className="bg-surface-container-lowest rounded-xl overflow-hidden mb-5 border border-outline-variant">
          {FAQS.map(({ q, a }, i) => (
            <View key={q} className={i > 0 ? "border-t border-outline-variant" : ""}>
              <TouchableOpacity className="flex-row items-center gap-3 px-4 py-4" onPress={() => setExpanded(expanded === q ? null : q)}>
                <Text className="flex-1 text-on-surface text-sm font-medium">{q}</Text>
                {expanded === q ? <ChevronUp color="#926f66" size={18} /> : <ChevronDown color="#926f66" size={18} />}
              </TouchableOpacity>
              {expanded === q && (
                <View className="px-4 pb-4">
                  <Text className="text-on-surface-variant text-sm leading-5">{a}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Contact banner */}
        <View className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 mb-8">
          <Text className="text-on-surface text-base font-bold mb-1">Still need help?</Text>
          <Text className="text-on-surface-variant text-sm mb-4">Support available Mon–Sat, 9am–7pm</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-appbar-bg rounded-xl h-12 flex-row items-center justify-center gap-2"
              style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 4 }}>
              <MessageCircle color="white" size={16} />
              <Text className="text-white text-sm font-bold">Chat with Us</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl h-12 flex-row items-center justify-center gap-2">
              <Phone color="#FF4500" size={16} />
              <Text className="text-appbar-bg text-sm font-bold">Call Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
