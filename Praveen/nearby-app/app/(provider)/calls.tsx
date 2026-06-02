import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Bell, Phone, ShieldCheck, CheckCircle, XCircle, PhoneMissed } from "lucide-react-native";

const CALL_GROUPS = [
  {
    month: "October 2023",
    calls: [
      { id: "1", name: "Amit Sharma",  service: "Electrical Wiring", status: "answered", amount: "₹550" },
      { id: "2", name: "Priya Verma",  service: "Tap Fixing",         status: "missed",   amount: "" },
      { id: "3", name: "Rahul Singh",  service: "AC Servicing",       status: "rejected", amount: "" },
    ],
  },
  {
    month: "September 2023",
    calls: [
      { id: "4", name: "Sunita Rao",   service: "House Cleaning",     status: "answered", amount: "₹300" },
      { id: "5", name: "Vikram Das",   service: "Plumbing",           status: "missed",   amount: "" },
    ],
  },
];

const STATUS_CONFIG: Record<string, { icon: any; color: string; bg: string; label: string; btnColor: string }> = {
  answered: { icon: CheckCircle, color: "#1B8A4A", bg: "#DCFCE7", label: "Answered",  btnColor: "#FF4500" },
  missed:   { icon: PhoneMissed, color: "#926f66", bg: "#fff1ed", label: "Missed",    btnColor: "#926f66" },
  rejected: { icon: XCircle,     color: "#C62828", bg: "#FFDAD6", label: "Rejected",  btnColor: "#926f66" },
};

export default function ProviderCallsScreen() {
  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-6 px-5">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-12 h-12 rounded-full bg-white/25 items-center justify-center">
              <Text className="text-white text-xl font-bold">R</Text>
            </View>
            <View>
              <Text className="text-white text-base font-bold">Ramesh Kumar</Text>
              <Text className="text-white/70 text-xs">Expert Plumber</Text>
            </View>
          </View>
          <TouchableOpacity className="bg-white/20 rounded-full p-2">
            <Bell color="white" size={20} />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-lg font-semibold">Call History</Text>
        <View className="flex-row gap-3 mt-4">
          {[
            { label: "Total Calls", value: "128" },
            { label: "Answer Rate", value: "92%" },
          ].map(({ label, value }) => (
            <View key={label} className="flex-1 bg-white/20 rounded-xl p-3">
              <Text className="text-white text-xl font-bold">{value}</Text>
              <Text className="text-white/70 text-xs mt-0.5">{label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-5 pt-5 pb-6 gap-5">
        {CALL_GROUPS.map((group) => (
          <View key={group.month}>
            <Text className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest mb-3">{group.month}</Text>
            <View className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant">
              {group.calls.map(({ id, name, service, status, amount }, i) => {
                const cfg = STATUS_CONFIG[status];
                const Icon = cfg.icon;
                return (
                  <View key={id} className={`flex-row items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-outline-variant" : ""}`}>
                    <View className="w-10 h-10 rounded-full bg-primary-fixed items-center justify-center">
                      <Text className="text-trust-blue text-sm font-bold">{name[0]}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-on-surface text-sm font-semibold">{name}</Text>
                      <Text className="text-on-surface-variant text-xs">{service}</Text>
                    </View>
                    <View className="items-end gap-1.5">
                      <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.bg }}>
                        <Icon color={cfg.color} size={13} />
                        <Text className="text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</Text>
                      </View>
                      {amount ? <Text className="text-status-success text-xs font-bold">{amount}</Text> : null}
                    </View>
                    <TouchableOpacity
                      className="w-9 h-9 rounded-xl items-center justify-center ml-1"
                      style={{ backgroundColor: cfg.btnColor + "20" }}
                    >
                      <Phone color={cfg.btnColor} size={16} />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        {/* Trust anchor */}
        <View className="bg-teal-fixed rounded-xl p-4 flex-row items-center gap-3 border border-teal-container">
          <ShieldCheck color="#15767E" size={20} />
          <View className="flex-1">
            <Text className="text-on-teal-container text-sm font-semibold">Aadhaar Verified Professional</Text>
            <Text className="text-on-teal-container/70 text-xs mt-0.5">Your identity is verified and trusted</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
