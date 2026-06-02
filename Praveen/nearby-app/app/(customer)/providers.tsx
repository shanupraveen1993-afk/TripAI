import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, Home, Clock, User } from 'lucide-react-native';

const PROVIDERS = [
  { id: '1', name: 'Ram',   specialty: 'Plumber', exp: '8 yrs',  dist: '0.5Km', rating: 4.5, uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGwoY6sCJdW3IzXnX3rXTjYZbzJktOfvaKgDagn4iN4oHKR7bKDRRaxvZKPlV59jqYCr1yr9e9-r_BvNXFFMerIZNAzzV5aDn26LBPtR44a89tV_q0c6yAoUiLmYhxNMC0iyev_6N1bJUfGIgalJs8VB-rJLydNxTYDlynI8M_k7Rz9VJpV0ykap8plo0J9m_8lXQSkFov7_o0IkJlIOilc9c9BzvngJBj585KKZLW-TqtLA6aKtxtgUe4gmWam205YXLxvcnRBec' },
  { id: '2', name: 'John',  specialty: 'Plumber', exp: '12 yrs', dist: '1.2Km', rating: 4.8, uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNUrlmXtJnf98iy0YPP4SnZBU0sQKRa8hTfHn4Os25PPfrOtCASqwVLdxG4ihBc2qBR-fgvHock11pGK3Q-dbKpW5EpkeV0Do1xFWx0GwsZU0mzIPmKeGiaE3hCR2QCkuD14TmvxG_f6-g6nlYori5J2sLlaMRxpwO4NepXI_z_i7nWZGb4qyfkYEmMFVeX43mpSrE5K6CbWIv6gu0oaVuoza4_lEkRMV4tSk74UWpZqIZFBW3oRfaOj7KVZ-tWMkv88bD-sUh_pI' },
  { id: '3', name: 'David', specialty: 'Plumber', exp: '5 yrs',  dist: '2.0Km', rating: 4.2, uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Fj5CC_EPyhapXy7FTRVvFas7L7KW4I5GiQueTeolejvgMOVBdoR36QaR8UwBd40kkD-wLEQL_I72p7cv-tLPMA90PSP20IuUT2lqPEhC1EPUyQbqgEjfxqpeuafz6aZt6FM601H5kC4s2R_MWw-xt5NtcfpEZ_P7VxuBu3ibmR9POIs83LY_edGS8OW4j9XYNAkN2xnUUls7M2oqkCVQyKEc0oqCKsiHvIHbyPhAI4p7Oexnjq5rHLox0Ogm7PgZtEkd-3z9ROE' },
  { id: '4', name: 'Mike',  specialty: 'Plumber', exp: '15 yrs', dist: '3.5Km', rating: 4.9, uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqnpW3NnOHF9GCmmODfFvn2rdcuhu5JagCIRHpWLbisTavXNJ1rCRbG22LwwVG7L-5llgaQpi-WjLDla5aPEbHv0Fa9-mjfxvXX-Hnqdt2Wljz1unXp_6raxC5zrDmqhNLRCzY1ZhWxTRaO7oWP4w_4nJbEcXKBuqFUhf93b3ZZ9eIFD0Fr66qmu4Ueq_WxSPr6ZIVse-jKy7D9v0HcHPZsCnGq6zr4Ac4WeSFMpJoLQ0mp-sV8zwfKd74iSMNM1DgJHdLcS80UGA' },
  { id: '5', name: 'Alex',  specialty: 'Plumber', exp: '6 yrs',  dist: '4.1Km', rating: 4.6, uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj2ExAdE4DK9DWQU0_20fmixSBQ7bd20Ypou61yo5H6HlYc4hHQ1s7jWOXoHc9NsDCU0h9CK1woNWGRz2vpPJ0r2EaCe7cd8UFBwGpVPO-uqlRn182LTEMkeUNnWLelh6zwe1pr-0Th-xK41Q37bTNDzBLngS2H5evuQpJVQBNLIaxOxdMPRrbJjD-t8tpUEnSAFjAFEMbSBzxWSsrNarPbEsk0R0fa3DLIO4VO0mKD6j2DOhj7LQ8avH_XWcbg8xZukZ8ZkbAUN8' },
  { id: '6', name: 'Chris', specialty: 'Plumber', exp: '10 yrs', dist: '5.0Km', rating: 4.7, uri: null },
];

export default function ProvidersScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-off-white">
      {/* AppBar */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>Service Provider List</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 80, gap: 12 }}>
        {PROVIDERS.map(p => (
          <TouchableOpacity
            key={p.id}
            className="bg-white rounded-xl border border-secondary-fixed-dim flex-row items-center p-4"
            style={{ gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 }}
            onPress={() => router.push('/(customer)/provider-detail')}
            activeOpacity={0.85}
          >
            {p.uri ? (
              <Image source={{ uri: p.uri }} style={{ width: 64, height: 64, borderRadius: 32, borderWidth: 1, borderColor: '#e4e2e1' }} resizeMode="cover" />
            ) : (
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#ffe2db', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#e4e2e1' }}>
                <User size={28} color="#FF4500" />
              </View>
            )}

            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold text-text-primary">{p.name}</Text>
                <View className="flex-row items-center" style={{ gap: 3 }}>
                  <Star size={16} color="#FFC107" fill="#FFC107" />
                  <Text className="text-sm font-semibold text-text-primary">{p.rating}/5</Text>
                </View>
              </View>
              <Text className="text-sm font-medium mt-1" style={{ color: '#FF4500' }}>
                {p.specialty} | {p.exp} | {p.dist} away
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Nav */}
      <View className="flex-row justify-around items-center bg-surface-container-lowest border-t border-outline-variant h-16 px-4">
        <TouchableOpacity className="flex-col items-center" style={{ gap: 2 }} onPress={() => router.push('/(customer)/home')}>
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
