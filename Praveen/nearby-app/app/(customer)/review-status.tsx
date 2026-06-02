import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, CheckCircle, Clock, XCircle, Search } from "lucide-react-native";

const OPTIONS = [
  { id: "accepted",     icon: CheckCircle, color: "#1B8A4A", bg: "#DCFCE7", label: "Service Accepted",  desc: "Provider is on the way to help you",     goToRating: true  },
  { id: "not-answered", icon: Clock,       color: "#926f66", bg: "#fff1ed", label: "Not Answered",       desc: "Call was not answered by provider",        goToRating: false },
  { id: "rejected",     icon: XCircle,     color: "#C62828", bg: "#FFDAD6", label: "Service Rejected",   desc: "Provider couldn't take the call",          goToRating: false },
];

export default function ReviewStatusScreen() {
  const router = useRouter();
  const [finding, setFinding] = useState(false);

  if (finding) {
    return (
      <View className="flex-1 bg-surface items-center justify-center px-8">
        <View className="w-20 h-20 rounded-full bg-surface-container-low items-center justify-center mb-4">
          <Search color="#FF4500" size={32} />
        </View>
        <Text className="text-on-surface text-xl font-bold text-center mb-2">Finding Another Provider</Text>
        <Text className="text-on-surface-variant text-sm text-center mb-8">
          We're looking for available providers nearby. This usually takes under 30 seconds.
        </Text>
        <TouchableOpacity
          className="bg-appbar-bg rounded-xl h-14 items-center justify-center px-8"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 }}
          onPress={() => router.replace("/(customer)/home" as any)}
        >
          <Text className="text-white text-sm font-bold">Back to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      {/* AppBar */}
      <View className="bg-appbar-bg pt-14 pb-6 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-lg">
          <ChevronLeft color="white" size={22} />
        </TouchableOpacity>
        <Text className="text-white text-base font-semibold flex-1 text-center">Call Review</Text>
        <View className="w-10" />
      </View>

      <View className="px-5 pt-5">
        <Text className="text-on-surface text-2xl font-bold mb-1">How did the call go?</Text>
        <Text className="text-on-surface-variant text-sm mb-5">Let us know so we can help you better</Text>

        {/* Provider context card */}
        <View className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center gap-3 mb-6 border border-outline-variant">
          <View className="w-12 h-12 rounded-full bg-primary-fixed items-center justify-center">
            <Text className="text-trust-blue text-xl font-bold">R</Text>
          </View>
          <View className="flex-1">
            <Text className="text-on-surface text-sm font-bold">Rajesh Kumar</Text>
            <Text className="text-brand-teal text-xs font-medium">Electrician<Text className="text-on-surface-variant font-normal"> · Called 2 mins ago</Text></Text>
          </View>
        </View>

        {/* Status options */}
        <View className="gap-3">
          {OPTIONS.map(({ id, icon: Icon, color, bg, label, desc, goToRating }) => (
            <TouchableOpacity
              key={id}
              className="rounded-xl p-4 flex-row items-center gap-4 border-2 border-transparent"
              style={{ backgroundColor: bg }}
              onPress={() => {
                if (goToRating) {
                  router.push("/(customer)/rating" as any);
                } else {
                  setFinding(true);
                }
              }}
            >
              <View className="w-12 h-12 rounded-xl items-center justify-center" style={{ backgroundColor: color + "22" }}>
                <Icon color={color} size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-on-surface text-sm font-bold">{label}</Text>
                <Text className="text-on-surface-variant text-xs mt-0.5">{desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
