import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Clock, CheckCircle, XCircle, Star } from "lucide-react-native";

const BOOKINGS = [
  { id: "1", service: "Plumbing - Tap Fixing", pro: "Rajesh Kumar",  date: "25 May 2026", time: "11:30 AM", status: "completed", amount: "₹350", rating: 5 },
  { id: "2", service: "Electrical Wiring",     pro: "Ravi Kumar",    date: "18 May 2026", time: "3:00 PM",  status: "completed", amount: "₹550", rating: 4 },
  { id: "3", service: "AC Repair",             pro: "Murugan S",     date: "10 May 2026", time: "10:00 AM", status: "cancelled", amount: "₹0",   rating: 0 },
  { id: "4", service: "Carpentry",             pro: "Suresh B",      date: "28 Apr 2026", time: "2:00 PM",  status: "completed", amount: "₹800", rating: 5 },
];

export default function CustomerHistoryScreen() {
  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      <View className="bg-appbar-bg pt-14 pb-6 px-5">
        <Text className="text-white text-lg font-semibold">Service History</Text>
        <Text className="text-white/80 text-sm mt-1">All your past service calls</Text>
      </View>

      {/* Stats */}
      <View className="flex-row px-5 pt-5 gap-3 mb-5">
        {[
          { label: "Total Calls",  value: "4", color: "#FF4500", bg: "#fff1ed" },
          { label: "Completed",    value: "3", color: "#1B8A4A", bg: "#DCFCE7" },
          { label: "Cancelled",    value: "1", color: "#C62828", bg: "#FFDAD6" },
        ].map(({ label, value, color, bg }) => (
          <View key={label} className="flex-1 rounded-xl p-3 items-center" style={{ backgroundColor: bg }}>
            <Text className="text-base font-bold" style={{ color }}>{value}</Text>
            <Text className="text-on-surface-variant text-xs mt-0.5">{label}</Text>
          </View>
        ))}
      </View>

      <View className="px-5 gap-3 pb-6">
        {BOOKINGS.map((b) => (
          <View key={b.id} className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant">
            <View className="flex-row justify-between items-start mb-2">
              <View className="flex-1">
                <Text className="text-on-surface text-sm font-bold">{b.service}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{b.pro}</Text>
              </View>
              <View
                className="flex-row items-center gap-1 px-2 py-1 rounded-full"
                style={{ backgroundColor: b.status === "completed" ? "#DCFCE7" : "#FFDAD6" }}
              >
                {b.status === "completed"
                  ? <CheckCircle color="#1B8A4A" size={12} />
                  : <XCircle color="#C62828" size={12} />}
                <Text className="text-xs font-medium" style={{ color: b.status === "completed" ? "#1B8A4A" : "#C62828" }}>
                  {b.status === "completed" ? "Completed" : "Cancelled"}
                </Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center pt-3 border-t border-outline-variant">
              <View className="flex-row items-center gap-1">
                <Clock color="#926f66" size={12} />
                <Text className="text-on-surface-variant text-xs">{b.date} · {b.time}</Text>
              </View>
              <Text className="text-on-surface text-sm font-bold">{b.amount}</Text>
            </View>

            {b.rating > 0 && (
              <View className="flex-row items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} color="#FFC107" size={12} fill={i < b.rating ? "#FFC107" : "none"} />
                ))}
                <Text className="text-on-surface-variant text-xs ml-1">Your rating</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
