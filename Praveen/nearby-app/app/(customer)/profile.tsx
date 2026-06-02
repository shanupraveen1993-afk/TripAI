import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Bell, ChevronRight, LogOut, ShieldCheck, Share2, HelpCircle, Info, MapPin, Home, Plus } from "lucide-react-native";

export default function CustomerProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-surface" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View
        className="bg-surface-container-lowest pt-14 pb-4 px-5 flex-row items-center justify-between"
        style={{ borderBottomWidth: 1, borderBottomColor: "#e7bdb2" }}
      >
        <View className="flex-row items-center gap-3">
          <View className="w-8 h-8 rounded-full bg-primary-fixed border border-outline-variant items-center justify-center">
            <Text className="text-trust-blue text-sm font-bold">P</Text>
          </View>
          <Text className="text-appbar-bg text-xl font-bold">Profile</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
          <Bell color="#5d4038" size={22} />
        </TouchableOpacity>
      </View>

      <View className="px-4 pt-5 gap-5 pb-10">
        {/* Profile card */}
        <View className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center gap-4 border border-outline-variant"
          style={{ shadowColor: "#FF4500", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 }}>
          <View className="relative">
            <View className="w-20 h-20 rounded-full border-2 border-appbar-bg/20 p-0.5 items-center justify-center">
              <View className="w-full h-full rounded-full bg-primary-fixed items-center justify-center">
                <Text className="text-trust-blue text-3xl font-bold">P</Text>
              </View>
            </View>
            <View className="absolute bottom-0 right-0 bg-success-teal rounded-full p-1 border-2 border-white">
              <ShieldCheck color="white" size={10} />
            </View>
          </View>
          <View className="flex-1">
            <Text className="text-on-surface text-xl font-bold">Praveen Kumar</Text>
            <Text className="text-on-surface-variant text-sm">+91 98765 43210</Text>
            <View className="flex-row items-center self-start mt-1.5 bg-surface-container rounded-full px-2 py-0.5">
              <Text className="text-aadhaar-gold text-xs font-bold">AADHAAR VERIFIED</Text>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <Text className="text-appbar-bg text-sm font-bold">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Free tier — plan card */}
        <View
          className="rounded-xl p-4 overflow-hidden"
          style={{ backgroundColor: "#FF4500", shadowColor: "#FF4500", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 }}
        >
          <View className="absolute -right-4 -top-4 w-32 h-32 rounded-full bg-white/10" />
          <Text className="text-white/80 text-xs font-bold uppercase tracking-widest">Current Plan</Text>
          <Text className="text-white text-2xl font-bold mt-0.5">Free Tier</Text>
          <View className="flex-row items-end justify-between mt-3">
            <View>
              <Text className="text-white text-4xl font-bold leading-none">3</Text>
              <Text className="text-white/80 text-xs font-semibold mt-0.5">Calls Left This Month</Text>
            </View>
            <TouchableOpacity
              className="bg-white rounded-xl px-4 py-2.5"
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
              onPress={() => router.push("/onboarding/welcome" as any)}
            >
              <Text className="text-appbar-bg text-sm font-bold">Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Saved addresses */}
        <View className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
          <View className="flex-row items-center gap-2 px-4 pt-4 pb-3">
            <MapPin color="#FF4500" size={18} />
            <Text className="text-on-surface text-sm font-bold">Saved Addresses</Text>
          </View>
          <View className="mx-4 mb-4 bg-surface-container-low rounded-xl border border-dashed border-outline-variant p-3 flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-full bg-surface-container-high items-center justify-center">
              <Home color="#5d4038" size={18} />
            </View>
            <View className="flex-1">
              <Text className="text-on-surface text-sm font-semibold">Home</Text>
              <Text className="text-on-surface-variant text-xs mt-0.5">H-12, Sector 62, Noida, UP - 201301</Text>
            </View>
          </View>
          <TouchableOpacity className="mx-4 mb-4 flex-row items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-appbar-bg/20">
            <Plus color="#FF4500" size={16} />
            <Text className="text-appbar-bg text-sm font-semibold">Add New Address</Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View>
          <Text className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-2 px-1">Settings &amp; App Info</Text>
          <View className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 }}>
            {[
              { icon: Bell,       label: "Notification Settings", sub: "Manage alerts & preferences", color: "#5d4038",  route: "/(customer)/notification-settings" },
              { icon: Share2,     label: "Share with Friends",    sub: "Invite friends, earn credits",  color: "#00A389",  route: undefined },
              { icon: HelpCircle, label: "Help & Support",        sub: "FAQs & contact",               color: "#BF953F",  route: "/(customer)/help-center" },
              { icon: Info,       label: "About Nearby",          sub: "Version 1.0.0",                color: "#926f66",  route: undefined },
            ].map(({ icon: Icon, label, sub, color, route }, i) => (
              <TouchableOpacity
                key={label}
                className={`flex-row items-center gap-4 p-4 ${i > 0 ? "border-t border-outline-variant" : ""}`}
                onPress={() => route && router.push(route as any)}
              >
                <View className="w-10 h-10 rounded-xl bg-surface-container-high items-center justify-center">
                  <Icon color={color} size={20} />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface text-sm font-medium">{label}</Text>
                  <Text className="text-on-surface-variant text-xs mt-0.5">{sub}</Text>
                </View>
                <ChevronRight color="#926f66" size={16} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center justify-center gap-3 h-14 rounded-xl border border-error-red/20 bg-error-red/5"
          onPress={() => router.replace("/onboarding/welcome")}
        >
          <LogOut color="#D92D20" size={18} />
          <Text className="text-error-red text-sm font-bold">Logout</Text>
        </TouchableOpacity>
        <Text className="text-center text-on-surface-variant text-xs">App Version 1.0.0 · Proudly Made in India</Text>
      </View>
    </ScrollView>
  );
}
