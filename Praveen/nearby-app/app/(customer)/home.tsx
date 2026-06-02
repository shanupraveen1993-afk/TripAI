import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, ChevronDown, Bell, Search, Home, Clock, User } from 'lucide-react-native';

const SERVICES = [
  { id: 'plumbing',    label: 'Plumbing',    route: '/(customer)/plumbing', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe1NQZr8_BL_lQHBtSetOQcR_spuTtJhcW5j1c9wZo-arg-g0IgWm8yzuAfsaHPN5ajFWHHUt3V0r2KFquHptxlI9m4pXOb1aAGO28IpPKfwmrh5VmMs-qa7-QNx49mgdP6tmOjruKmm4uL4Dv6LWx6ZDJN7bU9Su0fmSL1MANaz92zZwu46bkIZv4n5jXcyYdxd5sgB-Qe7TcwZrQKoENm9P-SMvo8KBYhEI10Q-rOrsDalH5ypCPE-p12tV8jxqqT4W-d9FeESE', active: true },
  { id: 'electrical',  label: 'Electrical',  route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_aJ0ID86HOaSsJwEQK-9RgMno5AodOQmFqm4MbVSJKj4EcD8KPY46jD1EJBeJ2mDhYxNJGgLU4ciCzlwALgWwbTdAe5LVJ095KkF59bh2KbHktYxs_Z01aCy7yjvfxSHKMpNHfMNe-JpVHOZXOijUt0UY7tD26BSpzpyNLHjiosAY1KxdUkw9lMdE2Fq7YPE4Eie-e1cFVFGZB_EAQRG05iLwsQl62QoR1YSv2LJilqpZ7Vm2zLcjyt7YELXwV-KB6thOptT85WQ', active: false },
  { id: 'carpentry',   label: 'Carpentry',   route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANBmi4CnpDz-P0_xzRUWhWAI3RwM-bRbeTb2wTHFKcxClN72TS9IRwAxeGcHYtUbU7PvqqbFA2saYnWsR-ml9MX80DmTsR6KwDmfkyhsmZWLr0kzC_wfgxep1FCfaO5yjlSdCd7usCWdy5OwKdXRijWfMtYNryLWsJNoaM9ygdmoDEwRoosRV131VHe-WZxpHNGDt38eDsw-RAdbQMD99o8XGSk4AfKRVC3ndELAXZ4mGyJ9wEEfRd6acPsLG9b1wo3DTGx_VBOJY', active: false },
  { id: 'painting',    label: 'Painting',    route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmdsMAr75J-wPVPjjI0pHUCp3cuILUz4VcQ1x4PErd7WN4IaCm4WBIJIy53fv3Y6w7Of0sETw94nF3AB6k2LTmmVXObc91nZ62jgTsTielQung2_sRuqDgzDGn9_8zAl0e1O4eCMDKQu5fNjjfFBb3OIbDyPiF4UFvhF12o1I90uMs8B3GKGzovWC19F6VeHZzMakGoW1GRK3BjG7zjXFoab02AvaPi_I6UVUNB92QnRnE9JiuFLABuUZT1ggLDAyub7Vw5ypZKtQ', active: false },
  { id: 'civil',       label: 'Civil Mason', route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbrSW-OmVVIKoLmH6If3IXC5amIRrvPNU8UsqqO5n8irQjFJrL7mW4B6elmRYBf2w2Nj4JDu3uwhDDsjWO4-ti9VkdAMq1VZbCk528iNPA8XaDqvtAfNUpZrY9IyMDy7k2XTlqfWHYR4eKE5OVMcueHLWiBnm8LmpbC5_FLj3vbeV0ttRzWDyVWosYRX8IIT9s3HFh9d9PUdWSsIJu_Aa_L4JTegHx52tqa1CN894iGh02rjGGOS1joLENmtshN4e4DVU4YwqBizE', active: false },
  { id: 'tile',        label: 'Tile Mason',  route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLhsfgIPWeeF5WOnhs4uArPnMsjYgAoYPsB2Z4cjZX-B-xXehYJ1N5PWPiXOE-nKyc5YIYUl7fnP4ngR17IwQmplO3t214dUjrHrCZM5q7qSqQw8fCbFBG25cA6OGtR8Wi8bGgPu4-XdliA04lxDuA6-vBZ4gnTD0QGP-3k3RY9diFz5E5vXACbbJdroCqiduJZ1-2GQItkFhhAP4jguxCD9HRwT-GN8BsfWfr4H_RuvKaNBTJdD8oWc42q1pjZGd86iv7Ga9-Qk', active: false },
  { id: 'appliance',   label: 'Appliance',   route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2VKdpqesbWjdIQSKIX-KS747Hm_tk17F-buU326SFxMvMdhj1UHDUJxnLBgdRMJ3vsnhu333ngQ0cDQzwvSCcoVvx7UHFPDapaEsG_qPajHTaJpSctbpxD9sr9gpFg_-dMSenerYXShL9Bd9UaGDUDiasEn_-ugP7XKLt-Anbpl1dUJv0mQ-jgdMc5O1wgekbKoZQnekQkiwzCtyZw9xXqT4tmqcyvjoBhMLIKIB1W4ZMSUkvKzNDbIO76BgFYKFyJpBpvnKBA_A', active: false },
  { id: 'mechanic',    label: 'Mechanic',    route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4HZOtKGtzRidGW-BE8GIdGU2NcL1RFiTo1WZGWgpQDFOBbt708hT6-oEBb43wRQWM5WTUssvVAHA_1ZkZZ3uPM2trmppg2SS0jHc6O7PAMMZv4uLT6_b1cv56eGkl6Mz8FVhKpIWZLs3uBfdTC9-zyTBGWObtoCW_JU-20FfzqgGFjbJSvmdtJfTlRalvI_E11wiL4q7RdF6eY__GqghHmnTf-jSYzBSEZtSZQWdUEyMeDTxY9VpvX1fcFp4rlus7gAWbpo8AWt8', active: false },
  { id: 'puncture',    label: 'Puncture',    route: '/(customer)/providers', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-PJsMvKBoV-JQHI_kjgmIqZAWPMMAB-7-fEnxtQ47BFkuZ6pIW0UGsSCVEQ2_IhzQExhNGMcWjrx2t5R686mcRxpumeoKS6VFpzhHF8J4-aDjKoVEZE-zHuCveY1TZLDc4RtXFCk4Zc6o6qD8KQCI-glGGo5rSc3MXQ3PBzgMDQ1_BAPYAdk8lx5sHN1BpCcg0OiGoWxcbmxQadBzYhRGFANSoF6TCi8Iyt2hmBIra92m0C7OjBzxXphH1dbI3GTRm_BVv8v-gwE', active: false },
];

export default function CustomerHome() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* Extended Orange Header */}
      <View style={{ backgroundColor: '#FF4500', paddingTop: 48, paddingBottom: 16, paddingHorizontal: 16, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }}>
        {/* Location + Bell row */}
        <View className="flex-row justify-between items-center mb-4">
          <TouchableOpacity className="flex-row items-center" style={{ gap: 4 }}>
            <MapPin size={18} color="#fff" fill="#fff" />
            <Text className="text-white text-sm font-semibold">Current Location</Text>
            <ChevronDown size={18} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={26} color="#fff" fill="#fff" />
            <View style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#FF4500' }} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <Text className="text-white text-2xl font-bold mb-0.5">Hi Praveen</Text>
        <Text className="text-white text-sm mb-4" style={{ opacity: 0.9 }}>What service do you need today?</Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-xl px-4" style={{ height: 48, gap: 10 }}>
          <Search size={18} color="#757575" />
          <TextInput
            className="flex-1 text-base text-text-primary"
            placeholder="Search for services..."
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Service Grid */}
      <ScrollView className="flex-1 px-4 pt-3" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text className="text-lg font-bold text-on-background mb-3 mt-1">Select Service</Text>

        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {SERVICES.map(svc => (
            <TouchableOpacity
              key={svc.id}
              style={{ width: '47%' }}
              onPress={() => {
                if (svc.active) router.push(svc.route as any);
              }}
              activeOpacity={svc.active ? 0.85 : 0.6}
            >
              <View
                className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
                style={{ opacity: svc.active ? 1 : 0.6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}
              >
                <Image
                  source={{ uri: svc.uri }}
                  style={{ width: '100%', aspectRatio: 16 / 10 }}
                  resizeMode="cover"
                />
                <View className="py-2 px-2 items-center">
                  <Text className="text-xs font-semibold text-on-background text-center">{svc.label}</Text>
                  {!svc.active && (
                    <View style={{ backgroundColor: '#F0F0F0', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 1, marginTop: 2 }}>
                      <Text style={{ fontSize: 9, color: '#888', fontWeight: '600' }}>Coming Soon</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View className="flex-row justify-around items-center bg-surface-container-lowest border-t border-outline-variant h-16 px-4" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 10 }}>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }}>
          <Home size={24} color="#FF4500" fill="#FF4500" />
          <Text className="text-xs font-semibold" style={{ color: '#FF4500' }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/history')}>
          <Clock size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">History</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/profile')}>
          <User size={24} color="#5d4038" />
          <Text className="text-xs text-on-surface-variant">Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
