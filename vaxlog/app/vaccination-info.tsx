import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function VaccinationInfoScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    card: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#000000',
    textSecondary: isDark ? '#8E8E93' : '#6B7280',
    border: isDark ? '#38383A' : '#E5E7EB',
    primary: '#10B981',
    accent: isDark ? '#2C2C2E' : '#F3F4F6',
  };

  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const vaccines = [
    {
      id: '1',
      name: 'COVID-19 Vaccine',
      icon: '🦠',
      description: 'Protects against COVID-19 and its variants',
      details: 'The COVID-19 vaccine helps protect against severe illness, hospitalization, and death from COVID-19. Multiple doses may be required for full protection.',
      ageGroup: 'All ages (6 months+)',
      doses: '2-3 doses (depending on vaccine type)',
    },
    {
      id: '2',
      name: 'Influenza (Flu)',
      icon: '🤧',
      description: 'Annual protection against seasonal flu',
      details: 'The flu vaccine is recommended annually to protect against the most common influenza strains. It reduces the risk of flu illness and complications.',
      ageGroup: 'All ages (6 months+)',
      doses: '1 dose annually',
    },
    {
      id: '3',
      name: 'MMR (Measles, Mumps, Rubella)',
      icon: '🔴',
      description: 'Protects against three serious diseases',
      details: 'The MMR vaccine provides immunity against measles, mumps, and rubella. It is typically given in childhood but adults may need boosters.',
      ageGroup: 'Children & Adults',
      doses: '2 doses (1st at 12-15 months, 2nd at 4-6 years)',
    },
    {
      id: '4',
      name: 'HPV (Human Papillomavirus)',
      icon: '💜',
      description: 'Prevents HPV-related cancers',
      details: 'HPV vaccine protects against human papillomavirus infections that can cause cervical, throat, and other cancers. Most effective when given before exposure.',
      ageGroup: 'Ages 9-45',
      doses: '2-3 doses (depending on age at first dose)',
    },
    {
      id: '5',
      name: 'Hepatitis B',
      icon: '💛',
      description: 'Protects liver from hepatitis B virus',
      details: 'Hepatitis B vaccine prevents infection that can lead to liver disease, cirrhosis, and liver cancer. Often given at birth and in childhood.',
      ageGroup: 'All ages (birth+)',
      doses: '3 doses (at birth, 1-2 months, 6-18 months)',
    },
    {
      id: '6',
      name: 'DTaP/Tdap (Diphtheria, Tetanus, Pertussis)',
      icon: '🔵',
      description: 'Protects against three bacterial diseases',
      details: 'DTaP is for children, Tdap for adults and pregnant women. Protects against diphtheria, tetanus (lockjaw), and pertussis (whooping cough).',
      ageGroup: 'All ages',
      doses: '5 doses in childhood, boosters every 10 years',
    },
  ];

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Vaccination Information</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Introduction */}
        <View style={[styles.introCard, { backgroundColor: colors.accent }]}>
          <Text style={[styles.introTitle, { color: colors.text }]}>Learn About Vaccines</Text>
          <Text style={[styles.introText, { color: colors.textSecondary }]}>
            Tap on any vaccine below to learn more about what it protects against, recommended age groups, and dosing schedules.
          </Text>
        </View>

        {/* Vaccine Cards */}
        {vaccines.map((vaccine) => (
          <TouchableOpacity
            key={vaccine.id}
            style={[styles.vaccineCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => toggleCard(vaccine.id)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Text style={styles.vaccineIcon}>{vaccine.icon}</Text>
                <View style={styles.cardHeaderText}>
                  <Text style={[styles.vaccineName, { color: colors.text }]}>{vaccine.name}</Text>
                  <Text style={[styles.vaccineDescription, { color: colors.textSecondary }]}>
                    {vaccine.description}
                  </Text>
                </View>
              </View>
              <Text style={[styles.expandIcon, { color: colors.textSecondary }]}>
                {expandedCard === vaccine.id ? '▼' : '▶'}
              </Text>
            </View>

            {expandedCard === vaccine.id && (
              <View style={[styles.cardDetails, { borderTopColor: colors.border }]}>
                <Text style={[styles.detailsText, { color: colors.text }]}>
                  {vaccine.details}
                </Text>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Age Group:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{vaccine.ageGroup}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>Recommended Doses:</Text>
                  <Text style={[styles.detailValue, { color: colors.text }]}>{vaccine.doses}</Text>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}

        {/* Footer Note */}
        <View style={[styles.footerNote, { backgroundColor: colors.accent }]}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            💡 This information is for educational purposes. Always consult with your healthcare provider for personalized medical advice.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 60,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: '#10B981',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  introCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    lineHeight: 20,
  },
  vaccineCard: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vaccineIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  vaccineDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  expandIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  cardDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  detailsText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
  },
  footerNote: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  footerText: {
    fontSize: 13,
    lineHeight: 18,
  },
});
