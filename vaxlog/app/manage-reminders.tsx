import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function ManageRemindersScreen() {
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

  const [reminders, setReminders] = useState([
    {
      id: '1',
      member: 'Emma Johnson',
      vaccine: 'HPV Vaccine (Dose 3)',
      dueDate: 'Jan 15, 2025',
      time: '09:00 AM',
      enabled: true,
      daysNotice: 7,
    },
    {
      id: '2',
      member: 'Sarah Johnson',
      vaccine: 'Annual Flu Shot',
      dueDate: 'Sep 1, 2025',
      time: '10:00 AM',
      enabled: true,
      daysNotice: 14,
    },
    {
      id: '3',
      member: 'Michael Johnson',
      vaccine: 'Tetanus Booster',
      dueDate: 'Aug 5, 2034',
      time: '02:00 PM',
      enabled: false,
      daysNotice: 30,
    },
  ]);

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Manage Reminders</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Introduction Card */}
        <View style={[styles.introCard, { backgroundColor: colors.accent }]}>
          <Text style={[styles.introIcon, { color: colors.text }]}>🔔</Text>
          <Text style={[styles.introTitle, { color: colors.text }]}>Stay on Schedule</Text>
          <Text style={[styles.introText, { color: colors.textSecondary }]}>
            Get notified before upcoming vaccinations. Toggle reminders on or off for each appointment.
          </Text>
        </View>

        {/* Add New Reminder Button */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonIcon}>➕</Text>
          <Text style={styles.addButtonText}>Add New Reminder</Text>
        </TouchableOpacity>

        {/* Active Reminders Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Reminders</Text>
        
        {reminders.filter(r => r.enabled).length > 0 ? (
          reminders.filter(r => r.enabled).map((reminder) => (
            <View
              key={reminder.id}
              style={[styles.reminderCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.reminderHeader}>
                <View style={styles.reminderInfo}>
                  <Text style={[styles.reminderMember, { color: colors.text }]}>{reminder.member}</Text>
                  <Text style={[styles.reminderVaccine, { color: colors.textSecondary }]}>
                    {reminder.vaccine}
                  </Text>
                </View>
                <Switch
                  value={reminder.enabled}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#FFFFFF"
                />
              </View>

              <View style={styles.reminderDetails}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    Due: {reminder.dueDate}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>⏰</Text>
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    Remind at: {reminder.time}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailIcon}>📢</Text>
                  <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                    Notify {reminder.daysNotice} days before
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.editButton}>
                <Text style={[styles.editButtonText, { color: colors.primary }]}>Edit Reminder</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View style={[styles.emptyState, { backgroundColor: colors.accent }]}>
            <Text style={styles.emptyIcon}>🔕</Text>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No active reminders
            </Text>
          </View>
        )}

        {/* Inactive Reminders Section */}
        {reminders.filter(r => !r.enabled).length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24 }]}>
              Inactive Reminders
            </Text>
            
            {reminders.filter(r => !r.enabled).map((reminder) => (
              <View
                key={reminder.id}
                style={[
                  styles.reminderCard, 
                  { backgroundColor: colors.card, borderColor: colors.border, opacity: 0.6 }
                ]}
              >
                <View style={styles.reminderHeader}>
                  <View style={styles.reminderInfo}>
                    <Text style={[styles.reminderMember, { color: colors.text }]}>{reminder.member}</Text>
                    <Text style={[styles.reminderVaccine, { color: colors.textSecondary }]}>
                      {reminder.vaccine}
                    </Text>
                  </View>
                  <Switch
                    value={reminder.enabled}
                    onValueChange={() => toggleReminder(reminder.id)}
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                </View>

                <View style={styles.reminderDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>📅</Text>
                    <Text style={[styles.detailText, { color: colors.textSecondary }]}>
                      Due: {reminder.dueDate}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Settings Section */}
        <View style={[styles.settingsCard, { backgroundColor: colors.accent, marginTop: 24 }]}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>Notification Settings</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Push Notifications</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Receive mobile notifications
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>Email Reminders</Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Send reminders via email
              </Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
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
    paddingBottom: 32,
  },
  introCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  introIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  introTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  introText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  addButtonIcon: {
    fontSize: 18,
    marginRight: 8,
    color: '#FFFFFF',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  reminderCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderMember: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  reminderVaccine: {
    fontSize: 14,
  },
  reminderDetails: {
    gap: 8,
    marginBottom: 12,
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
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 14,
  },
  settingsCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
});
