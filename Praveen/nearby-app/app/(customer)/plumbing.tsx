import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Home, Clock, User } from 'lucide-react-native';

const SERVICES = [
  { id: 'tap',    label: 'Tap Fixing',       uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhnB-Eh1JTNwAJoOvTCq8e7l-L_S1SQtJbb_EBkULufcguDXCDVx3s_TGm_dGpwWmw7yOAKEzA6PPuw52lhNFZXKp_MkswsArhcZdd-ybAg6RCH0ijd_3gr91ndpS_p2t2IQCKtZszb2L9XPukJfcXT0JjyKpKpjNA1n-yP6d0nsb-UWGNhMMBiY63_HX4uKMtDjEt2zx6XEQ5B0nuroFGpLOLjD7ie2z95EVYOnMaa3RzTKHZ61c2kYXAmIl0afrv7GepkJqN2vw' },
  { id: 'basin',  label: 'Wash Basin',        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwhQGNyM5LDO2TT0-cq0PQlxlnMRYxnVJGlG3cq7-5yhnjtWcECQympxh9I_DIVWK6Mw1VXaNAWQYX1JPdNrI_d-fAHrWq9HVAU0kA2ds7FqV6bevWVPRib184XlIB5BfmU1frn_lYVLMZW2yXehMnY3G6eVrIC3YLCTUsY_zV1vCVb7gCphJAtpDZcnnVzbAsAUb80FWTjNJPmBF9bJpyJ-RnjvSfdGdAbEcaUuhGulse2Sv604JsoWfnxXtVh7uC_OZ7Juf4l38' },
  { id: 'leak',   label: 'Leakage',           uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsRFl7EPv-MOKKIV_RT-UYZfLm7TWfiTu2ypGkE2d5IhA40KMqNeXqDVmNz09Ukhi1_qN0LhNp04Ek474gHxzc_1lJBNlRd0E3fZsKQn6R0znsRNk_OQxbBx8XteyKozn0PUq04MYZ00dyDy8eNwj-edWoLUWmyF3XZ9wJknfsOO_l2jowLIPmZcLnEYswMzDFkZGfM7JaSOiZ5U1EMwmMujzFPt0puwv-2tD_F9UmCuYTJbEYt4U3-jJMRq0nPZXQnITD5I7tEuM' },
  { id: 'toilet', label: 'Toilet Fittings',   uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBngZiu9Z9CUsq9HUrAxiXdGCFPBpwGPRh17uty9bJ8QcXtgj54zoHB8eLKXrpNVBsCwQ4906tfF0OcMTf5noNs2pmzdTqzG6JujxU1cqig51mh_uKn9WT8fVuTZgr9inMDmYEo9mxFxVLBrD_pMMYAVtpbRjpzWS8fjrZ0snlg41-sHR9yIr_nYlkvFcS9FmgQQIQL2XADlHbcKEq6zNHfbBoiIsgAxTgBCU5PWIVlrSA049q7ES4z6ftbKieuKlgJyW6-Z-FmBmY' },
  { id: 'ro',     label: 'RO Fitting',        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCMDMbTot5QhCYHLiyzJVKrxWUfufzFaKouVItf5lyZjQ-4d5yH8ztIJ2OsOsOj_B4aDl42CDLLsk6hIUZh2ppIvS7dCdOP1iEIBkFDFsK616A81tWHUBCMLa59IUIkpHg8ohVNwV5JCa0u-7coLZCAnjEmo1YetuMbR5PcwcjQekFw9w9XL0o5sspPcg7grTQD0-IrtBqMidJOZtFYZdPRWjMcMuH3rmeWMWE7FOT_KU5XQtrvsWM9VS_nPBO5JUFBKoPpHMZIUk' },
  { id: 'pipe',   label: 'Pipe Fitting',      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGXFylXbBvqDZPJN3GAniJcu7XR1L8F9qiiF9rACUlLRKQ9qPYUCHIhA9SFTuwgoS7IxYctmwfiEcG1OmYhbhsUI5SmWEPevPfocOw_tqOanlNZ-0UCJl3k3qCpSmwUZbh17pLsvahe8iIchXZzZomU-mmvAfS70k2Eh6FqxlyyXFB3-tZC_zfvv14gHcnOmjoUpgGTVnyNhHYCMeGikAlDz8HP_B7OhDnqw5wjnt27Y2sS72QFAWfT3PksLqBFx70l-pcydMG9Sk' },
  { id: 'pump',   label: 'Water Pump Repair', uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJ4K_irQf3YVLB7jg5IcH7e_phuCGUpeIrRIK1g2NlGibIy_wJc5ieX2CCTd8hdSEjMLurbyM2S35bzntNPCSkpjUn6KiI9v958oS_PVM2tCxw_z2_bi-7dZkVGgq6-VEJySnSk0n7AMdU71eksd_DHXX92RA_7mhmKixOck5UhuV2FLLGqGFfTZaakNO1omYH76Ai4cDx_8S9ntCCjZ1boEW3ziwZJeKZsSksnAjate6UKVPHZsrh0KADStZO-lPBUSGzKEwNCpc' },
  { id: 'tank',   label: 'Water Tank',        uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFkvGXfKakU202o-NbNQGPCTusRiSV8dzkeN6-xnEvsVwloWdkhivHigU_xS4XxPHgcYhM9YSMuYN3j1cT1X72Jc2qsEjUuEr10GvDzP0da6vr03MNQib-QpcTOgcIrj8dffguHwtfhEuMtut6fgZMeWoDImPl-Vab5tlp4OXC6XtOVwq9KnecsYDo0FQ9YgWgef-he5YdpfFFgYA7xfKet7p-BLRq59gl5QEQyCe6Jzu2GoEeqq_Jyx2_0RyMVLHppuuf-4H9EIo' },
];

export default function PlumbingScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-surface-container-lowest">
      {/* AppBar */}
      <View className="h-14 flex-row items-center px-4" style={{ backgroundColor: '#FF4500' }}>
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-white text-xl font-bold" style={{ marginRight: 32 }}>Plumbing</Text>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80, paddingTop: 16 }}>
        <Text className="text-2xl font-bold text-text-primary mb-1">Plumbing Service</Text>
        <Text className="text-sm text-text-secondary mb-5">Select a service to get started with professional plumbers.</Text>

        {/* 2-col bento grid */}
        <View className="flex-row flex-wrap" style={{ gap: 12 }}>
          {SERVICES.map(svc => (
            <TouchableOpacity
              key={svc.id}
              style={{ width: '47%' }}
              onPress={() => router.push('/(customer)/providers')}
              activeOpacity={0.85}
            >
              <View className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 }}>
                <Image
                  source={{ uri: svc.uri }}
                  style={{ width: '100%', aspectRatio: 4 / 3 }}
                  resizeMode="cover"
                />
                <View className="py-2.5 px-2 items-center">
                  <Text className="text-sm font-semibold text-center" style={{ color: '#FF4500' }}>{svc.label}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
