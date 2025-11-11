import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function AddVaccineScreen() {
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
    inputBg: isDark ? '#2C2C2E' : '#F3F4F6',
  };

  const [selectedMember, setSelectedMember] = useState('');
  const [vaccineName, setVaccineName] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [location, setLocation] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [notes, setNotes] = useState('');

  const familyMembers = [
    { id: '1', name: 'Sarah Johnson' },
    { id: '2', name: 'Michael Johnson' },
    { id: '3', name: 'Emma Johnson' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Add Vaccine Record</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Select Family Member */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Select Family Member</Text>
          <View style={styles.memberGrid}>
            {familyMembers.map((member) => (
              <TouchableOpacity
                key={member.id}
                style={[
                  styles.memberCard,
                  { 
                    backgroundColor: colors.card,
                    borderColor: selectedMember === member.id ? colors.primary : colors.border,
                    borderWidth: selectedMember === member.id ? 2 : 1,
                  }
                ]}
                onPress={() => setSelectedMember(member.id)}
              >
                <View style={[
                  styles.memberAvatar,
                  { backgroundColor: selectedMember === member.id ? colors.primary : colors.inputBg }
                ]}>
                  <Text style={[styles.memberInitial, { color: selectedMember === member.id ? '#FFFFFF' : colors.text }]}>
                    {member.name.charAt(0)}
                  </Text>
                </View>
                <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vaccine Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Vaccine Information</Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Vaccine Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
              placeholder="e.g., COVID-19, Flu, MMR"
              placeholderTextColor={colors.textSecondary}
              value={vaccineName}
              onChangeText={setVaccineName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Date Administered</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
              placeholder="MM/DD/YYYY"
              placeholderTextColor={colors.textSecondary}
              value={dateAdministered}
              onChangeText={setDateAdministered}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Location/Clinic</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
              placeholder="Where was it administered?"
              placeholderTextColor={colors.textSecondary}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Batch/Lot Number (Optional)</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
              placeholder="Enter batch number"
              placeholderTextColor={colors.textSecondary}
              value={batchNumber}
              onChangeText={setBatchNumber}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Notes (Optional)</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.inputBg, color: colors.text, borderColor: colors.border }]}
              placeholder="Any additional information or side effects"
              placeholderTextColor={colors.textSecondary}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]}>
            <Text style={styles.saveButtonText}>Save Vaccine Record</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.cancelButton, { borderColor: colors.border }]}
            onPress={() => router.back()}
          >
            <Text style={[styles.cancelButtonText, { color: colors.textSecondary }]}>Cancel</Text>
          </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  memberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  memberCard: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    width: '30%',
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  memberInitial: {
    fontSize: 20,
    fontWeight: '600',
  },
  memberName: {
    fontSize: 12,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  textArea: {
    minHeight: 100,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  saveButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
