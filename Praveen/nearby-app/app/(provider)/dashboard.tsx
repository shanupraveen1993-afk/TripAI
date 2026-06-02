import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Phone, Star, ShieldCheck, Users, MapPin, BarChart2 } from "lucide-react-native";

const RECENT_REQUESTS = [
  { name: "Amit Sharma", service: "Electrician Needed", dist: "2.4 km", online: true },
  { name: "Priya Patel",  service: "AC Repair",          dist: "0.8 km", online: true },
  { name: "Dr. V. Rao",   service: "Switchboard",         dist: "5.1 km", online: false },
];

export default function ProviderDashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        className="bg-surface-container-lowest pt-14 pb-4 px-5 flex-row items-center justify-between"
        style={{ borderBottomWidth: 1, borderBottomColor: "#e7bdb2" }}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-outline-variant items-center justify-center">
            <Text className="text-on-surface-variant text-base font-bold">R</Text>
          </View>
          <Text className="text-appbar-bg text-xl font-bold">Dashboard</Text>
        </View>
        <View className="bg-surface-container-low rounded-full px-3 py-1.5 flex-row items-center gap-1.5 border border-outline-variant">
          <ShieldCheck color="#FF4500" size={14} />
          <Text className="text-appbar-bg text-xs font-bold">VERIFIED</Text>
        </View>
      </View>

      <View className="px-4 pt-4 gap-4 pb-8">
        {/* Greeting */}
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-on-surface-variant text-sm">Welcome back,</Text>
            <Text className="text-appbar-bg text-3xl font-bold leading-tight">Hi Ramesh</Text>
          </View>
        </View>

        {/* Free trial CTA */}
        <TouchableOpacity
          className="bg-surface-container-low rounded-xl p-5 overflow-hidden border border-outline-variant"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}
          onPress={() => router.push("/(provider)/growth-plans" as any)}
        >
          <View className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/30" />
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-on-surface text-base font-bold">180 Days Free Trial</Text>
              <Text className="text-on-surface-variant text-sm mt-0.5">Enjoy premium features &amp; priority leads</Text>
            </View>
            <TouchableOpacity
              className="bg-surface-container-lowest rounded-xl px-4 py-2.5 border border-outline-variant"
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}
              onPress={() => router.push("/(provider)/growth-plans" as any)}
            >
              <Text className="text-appbar-bg text-sm font-bold">Check Status</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Stats bento */}
        <View className="gap-3">
          {/* Demand card */}
          <View
            className="bg-surface-container-lowest rounded-xl p-5 flex-row items-center gap-4 border border-outline-variant"
            style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 }}
          >
            <View className="w-14 h-14 rounded-full bg-appbar-bg/10 items-center justify-center flex-shrink-0">
              <Users color="#FF4500" size={28} />
            </View>
            <View>
              <Text className="text-on-surface-variant text-xs font-bold uppercase tracking-widest">Market Demand</Text>
              <Text className="text-on-surface text-xl font-bold">150+ customers nearby</Text>
            </View>
          </View>

          {/* Monthly report */}
          <View className="bg-surface-container-low rounded-xl p-5 border border-outline-variant">
            <View className="flex-row items-center justify-between mb-5">
              <View className="flex-row items-center gap-2">
                <BarChart2 color="#FF4500" size={20} />
                <Text className="text-on-surface text-base font-bold">Monthly Report</Text>
              </View>
              <Text className="text-appbar-bg text-xs font-bold uppercase tracking-wide">Details</Text>
            </View>
            <View className="flex-row">
              {[
                { label: "Calls Received", value: "42", color: "#FF4500" },
                { label: "Missed",          value: "5",  color: "#C62828" },
                { label: "Messages",        value: "12", color: "#15767E" },
              ].map(({ label, value, color }) => (
                <View key={label} className="flex-1 items-center gap-1.5">
                  <Text className="text-3xl font-bold" style={{ color }}>{value}</Text>
                  <Text className="text-on-surface-variant text-xs text-center leading-tight">{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Recent Requests */}
        <View>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-on-surface text-base font-bold">Recent Requests</Text>
            <Text className="text-appbar-bg text-xs font-bold">View All</Text>
          </View>
          <View className="gap-3">
            {RECENT_REQUESTS.map((r) => (
              <View
                key={r.name}
                className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center justify-between border border-outline-variant"
                style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="relative flex-shrink-0">
                    <View className="w-12 h-12 rounded-full bg-surface-container-high border-2 border-outline-variant items-center justify-center">
                      <Text className="text-on-surface text-base font-bold">{r.name[0]}</Text>
                    </View>
                    <View
                      className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                      style={{ backgroundColor: r.online ? "#00A389" : "#926f66" }}
                    />
                  </View>
                  <View>
                    <Text className="text-on-surface text-sm font-bold">{r.name}</Text>
                    <Text className="text-on-surface-variant text-xs">{r.service} · {r.dist}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="w-11 h-11 rounded-full bg-appbar-bg items-center justify-center"
                  style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 4 }}
                  onPress={() => router.push("/(provider)/incoming-call" as any)}
                >
                  <Phone color="white" size={18} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
