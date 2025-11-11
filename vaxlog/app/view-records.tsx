import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ViewRecordsScreen() {
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
    success: isDark ? '#34D399' : '#10B981',
  };

  const [selectedFilter, setSelectedFilter] = useState('all');

  const vaccineRecords = [
    {
      id: '1',
      member: 'Sarah Johnson',
      vaccine: 'COVID-19 Booster',
      date: 'Oct 15, 2024',
      location: 'City Health Center',
      status: 'Complete',
      nextDose: null,
    },
    {
      id: '2',
      member: 'Sarah Johnson',
      vaccine: 'Influenza',
      date: 'Sep 20, 2024',
      location: 'Community Clinic',
      status: 'Complete',
      nextDose: 'Sep 2025',
    },
    {
      id: '3',
      member: 'Michael Johnson',
      vaccine: 'COVID-19 Booster',
      date: 'Oct 12, 2024',
      location: 'City Health Center',
      status: 'Complete',
      nextDose: null,
    },
    {
      id: '4',
      member: 'Michael Johnson',
      vaccine: 'Tetanus (Tdap)',
      date: 'Aug 5, 2024',
      location: 'General Hospital',
      status: 'Complete',
      nextDose: 'Aug 2034',
    },
    {
      id: '5',
      member: 'Emma Johnson',
      vaccine: 'HPV (Dose 2 of 3)',
      date: 'Jul 18, 2024',
      location: 'Pediatric Clinic',
      status: 'In Progress',
      nextDose: 'Jan 2025',
    },
    {
      id: '6',
      member: 'Emma Johnson',
      vaccine: 'MMR',
      date: 'Jun 3, 2024',
      location: 'Pediatric Clinic',
      status: 'Complete',
      nextDose: null,
    },
  ];

  const filters = [
    { id: 'all', label: 'All Records' },
    { id: 'sarah', label: 'Sarah' },
    { id: 'michael', label: 'Michael' },
    { id: 'emma', label: 'Emma' },
  ];

  const getFilteredRecords = () => {
    if (selectedFilter === 'all') return vaccineRecords;
    return vaccineRecords.filter(record => 
      record.member.toLowerCase().includes(selectedFilter)
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Vaccination Records</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterTab,
                {
                  backgroundColor: selectedFilter === filter.id ? colors.primary : colors.accent,
                  borderColor: selectedFilter === filter.id ? colors.primary : colors.border,
                }
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterText,
                { color: selectedFilter === filter.id ? '#FFFFFF' : colors.text }
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Summary Stats */}
        <View style={[styles.summaryCard, { backgroundColor: colors.accent }]}>
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.text }]}>{getFilteredRecords().length}</Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Total Records</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.success }]}>
              {getFilteredRecords().filter(r => r.status === 'Complete').length}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Completed</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={[styles.summaryNumber, { color: colors.text }]}>
              {getFilteredRecords().filter(r => r.nextDose).length}
            </Text>
            <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Upcoming</Text>
          </View>
        </View>

        {/* Records List */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Vaccination History</Text>
        
        {getFilteredRecords().map((record) => (
          <TouchableOpacity
            key={record.id}
            style={[styles.recordCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.recordHeader}>
              <View style={styles.recordHeaderLeft}>
                <Text style={[styles.recordMember, { color: colors.text }]}>{record.member}</Text>
                <Text style={[styles.recordVaccine, { color: colors.textSecondary }]}>{record.vaccine}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: record.status === 'Complete' ? colors.success : '#F59E0B' }
              ]}>
                <Text style={styles.statusText}>{record.status}</Text>
              </View>
            </View>

            <View style={styles.recordDetails}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailIcon, { color: colors.textSecondary }]}>📅</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  Administered: {record.date}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailIcon, { color: colors.textSecondary }]}>📍</Text>
                <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                  {record.location}
                </Text>
              </View>
              {record.nextDose && (
                <View style={styles.detailRow}>
                  <Text style={[styles.detailIcon, { color: colors.textSecondary }]}>⏰</Text>
                  <Text style={[styles.detailText, { color: colors.primary }]}>
                    Next dose: {record.nextDose}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {getFilteredRecords().length === 0 && (
          <View style={[styles.emptyState, { backgroundColor: colors.accent }]}>
            <Text style={[styles.emptyIcon, { color: colors.textSecondary }]}>📋</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No vaccination records found
            </Text>
          </View>
        )}
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
  filterContainer: {
    marginBottom: 16,
  },
  filterContent: {
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  recordCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  recordHeaderLeft: {
    flex: 1,
  },
  recordMember: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordVaccine: {
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  recordDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  detailText: {
    fontSize: 13,
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
  },
});
