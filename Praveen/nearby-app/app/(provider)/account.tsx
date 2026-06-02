import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Menu, Bell, Star, Droplets, Briefcase, Share2, ImageIcon, Wrench, Crosshair, CreditCard, HelpCircle, LogOut, ChevronRight, Home, Clock, User } from 'lucide-react-native';

const AVATAR_URI = 'https://lh3.googleusercontent.com/aida-public/AB6AXuANWi_qV7dJAdSzY5gDQcosRvYys9_czWOXqHlzLB55iSAwSJRebgFssPKXAXLEqvBK1LBDyuAsqLNY34pvTSsbh98bZTnOVxOHVPNfUvlnXvnWzBVihBv4wbGoZ0mmnxJOxs_HkAH5RY95BtyXiqdL6KTRqattHkGdqX4FKd-QAjQ1sB4vkxjty4_ek77rp7J50U0_JBDt8QjKUrVwRzEm4iHmYYwUiyGUfFiW47-ka5O2RXfWCKdteleJzu4NM2f8CT8RqzOfyIA';

const MENU = [
  { icon: ImageIcon, label: 'Manage Work Gallery/Photos', badge: 'NEW',     badgeColor: '#d83900', route: null },
  { icon: Wrench,    label: 'Edit Skills',                 badge: null,      badgeColor: null,      route: null },
  { icon: Crosshair, label: 'Edit Work Radius',            badge: null,      badgeColor: null,      route: null },
  { icon: CreditCard,label: 'Manage Subscription',         badge: 'EXPIRED', badgeColor: '#C62828', route: '/(provider)/growth-plans' as const },
  { icon: HelpCircle,label: 'Contact Support',             badge: null,      badgeColor: null,      route: null },
];

export default function ProviderAccount() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center justify-between px-4" style={{ backgroundColor: '#FF4500' }}>
        <View className="flex-row items-center" style={{ gap: 16 }}>
          <Menu size={22} color="#fff" />
          <Text className="text-white text-xl font-bold">Profile</Text>
        </View>
        <Bell size={22} color="#fff" />
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16, paddingBottom: 80, gap: 16 }}>
        {/* Profile Card */}
        <View className="bg-surface-container-lowest rounded-xl border border-secondary-container p-4"
          style={{ gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
          <View className="flex-row items-center" style={{ gap: 16 }}>
            <Image source={{ uri: AVATAR_URI }} style={{ width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: 'rgba(255,69,0,0.2)' }} resizeMode="cover" />
            <View style={{ gap: 4 }}>
              <Text className="text-base font-semibold text-text-primary">Alex Rodriguez</Text>
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <Star size={16} color="#FF4500" fill="#FF4500" />
                <Text className="text-sm font-semibold" style={{ color: '#FF4500' }}>4.5</Text>
                <Text className="text-sm text-text-secondary">(128 reviews)</Text>
              </View>
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <View className="flex-row items-center" style={{ gap: 4 }}>
                  <Droplets size={14} color="#757575" />
                  <Text className="text-sm text-text-secondary">Plumber</Text>
                </View>
                <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#c8c6c6' }} />
                <View className="flex-row items-center" style={{ gap: 4 }}>
                  <Briefcase size={14} color="#757575" />
                  <Text className="text-sm text-text-secondary">8 Yrs Exp</Text>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="w-full rounded-lg py-3 flex-row items-center justify-center"
            style={{ backgroundColor: '#FF4500', gap: 8, marginTop: 4 }}
            activeOpacity={0.85}
          >
            <Share2 size={16} color="#fff" />
            <Text className="text-white text-sm font-semibold">Share My Profile Link</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Menu */}
        <View className="bg-surface-container-lowest rounded-xl border border-secondary-container overflow-hidden"
          style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}>
          {MENU.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              className="flex-row items-center justify-between p-4"
              style={{ borderBottomWidth: i < MENU.length - 1 ? 1 : 0, borderBottomColor: '#e4e2e1' }}
              onPress={() => item.route && router.push(item.route)}
              activeOpacity={0.8}
            >
              <View className="flex-row items-center" style={{ gap: 16 }}>
                <item.icon size={20} color="#5d4038" />
                <Text className="text-base text-text-primary">{item.label}</Text>
              </View>
              <View className="flex-row items-center" style={{ gap: 8 }}>
                {item.badge && (
                  <View style={{ backgroundColor: item.badgeColor ?? '#e4e2e1', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 }}>
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>{item.badge}</Text>
                  </View>
                )}
                <ChevronRight size={18} color="#5d4038" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity
          className="flex-row items-center p-4 bg-surface-container-lowest rounded-xl border border-secondary-container"
          onPress={() => router.replace('/onboarding/customer-signup')}
          activeOpacity={0.8}
          style={{ gap: 16, marginTop: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 }}
        >
          <LogOut size={20} color="#C62828" />
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#C62828' }}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Nav — Profile active */}
      <View className="flex-row justify-around items-center bg-white border-t border-outline-variant h-16 px-4">
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/dashboard')}>
          <Home size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(provider)/calls')}>
          <Clock size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }}>
          <User size={24} color="#FF4500" fill="#FF4500" />
          <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
