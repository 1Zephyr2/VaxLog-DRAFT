import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, SafeAreaView, Modal, Animated, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

// Mock data - replace with real data from your backend
const familyMembers = [
  { id: '1', name: 'John Doe', age: 35, role: 'Self', vaccinesComplete: 12, vaccinesTotal: 15, upcomingDose: 'COVID-19 Booster' },
  { id: '2', name: 'Jane Doe', age: 32, role: 'Spouse', vaccinesComplete: 14, vaccinesTotal: 15, upcomingDose: 'Flu Shot' },
  { id: '3', name: 'Emma Doe', age: 8, role: 'Daughter', vaccinesComplete: 18, vaccinesTotal: 22, upcomingDose: 'HPV Vaccine' },
];

const upcomingAppointments = [
  { id: '1', memberName: 'Emma Doe', vaccine: 'HPV Vaccine (Dose 2)', date: 'Nov 18, 2025', facility: 'City Health Center' },
  { id: '2', memberName: 'John Doe', vaccine: 'COVID-19 Booster', date: 'Nov 25, 2025', facility: 'Community Hospital' },
];

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Dynamic colors based on theme
  const colors = {
    background: isDark ? '#000000' : '#F8F9FA',
    cardBg: isDark ? '#1C1C1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#1F2937',
    textSecondary: isDark ? '#A0A0A0' : '#6B7280',
    textTertiary: isDark ? '#808080' : '#9CA3AF',
    accent: '#22733A',
    accentLight: isDark ? '#1A5A2D' : '#E8F5E9',
    border: isDark ? '#2C2C2E' : '#E5E7EB',
    progressBg: isDark ? '#2C2C2E' : '#E5E7EB',
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.cardBg }]}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.cardBg }]} onPress={toggleDrawer}>
              <Text style={styles.iconText}>☰</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.statNumber, { color: colors.accent }]}>{familyMembers.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Family{'\n'}Members</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.statNumber, { color: colors.accent }]}>{upcomingAppointments.length}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Upcoming{'\n'}Vaccines</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.cardBg }]}>
            <Text style={[styles.statNumber, { color: colors.accent }]}>
              {familyMembers.reduce((sum, m) => sum + m.vaccinesComplete, 0)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total{'\n'}Vaccines</Text>
          </View>
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Appointments</Text>
            <TouchableOpacity>
              <Text style={[styles.linkButton, { color: colors.accent }]}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity key={appointment.id} style={[styles.appointmentCard, { backgroundColor: colors.cardBg }]}>
              <View style={[styles.appointmentDateBadge, { backgroundColor: colors.accentLight }]}>
                <Text style={[styles.appointmentMonth, { color: colors.accent }]}>{appointment.date.split(' ')[0]}</Text>
                <Text style={[styles.appointmentDay, { color: colors.accent }]}>{appointment.date.split(' ')[1].replace(',', '')}</Text>
              </View>
              <View style={styles.appointmentDetails}>
                <Text style={[styles.appointmentMember, { color: colors.text }]}>{appointment.memberName}</Text>
                <Text style={[styles.appointmentVaccine, { color: colors.textSecondary }]}>{appointment.vaccine}</Text>
                <Text style={[styles.appointmentFacility, { color: colors.textTertiary }]}>📍 {appointment.facility}</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.border }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Family Members */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Family Members</Text>
            <TouchableOpacity>
              <Text style={[styles.linkButton, { color: colors.accent }]}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {familyMembers.map((member) => (
            <TouchableOpacity key={member.id} style={[styles.memberCard, { backgroundColor: colors.cardBg }]}>
              <View style={[styles.memberAvatar, { backgroundColor: colors.accent }]}>
                <Text style={styles.memberInitial}>{member.name.charAt(0)}</Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.text }]}>{member.name}</Text>
                <Text style={[styles.memberRole, { color: colors.textSecondary }]}>{member.role} • {member.age} years</Text>
                <View style={styles.progressContainer}>
                  <View style={[styles.progressBar, { backgroundColor: colors.progressBg }]}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${(member.vaccinesComplete / member.vaccinesTotal) * 100}%`, backgroundColor: colors.accent }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                    {member.vaccinesComplete}/{member.vaccinesTotal} vaccines
                  </Text>
                </View>
                {member.upcomingDose && (
                  <Text style={[styles.upcomingLabel, { color: colors.accent }]}>Next: {member.upcomingDose}</Text>
                )}
              </View>
              <Text style={[styles.chevron, { color: colors.border }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Side Drawer */}
      <Modal
        visible={drawerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleDrawer}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleDrawer}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            style={[styles.drawer, { backgroundColor: colors.cardBg }]}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[styles.drawerHeader, { borderBottomColor: colors.border, backgroundColor: isDark ? '#1C1C1E' : '#F9FAFB' }]}>
              <Text style={[styles.drawerTitle, { color: colors.text }]}>VaxLog</Text>
              <TouchableOpacity onPress={toggleDrawer}>
                <Text style={[styles.closeButton, { color: colors.textSecondary }]}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.drawerContent}>
              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => {
                  toggleDrawer();
                  router.push('/add-vaccine');
                }}
              >
                <Text style={styles.drawerIcon}>💉</Text>
                <View style={styles.drawerItemText}>
                  <Text style={[styles.drawerItemTitle, { color: colors.text }]}>Add Vaccine Record</Text>
                  <Text style={[styles.drawerItemSubtitle, { color: colors.textSecondary }]}>Log a new vaccination</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => {
                  toggleDrawer();
                  router.push('/vaccination-info');
                }}
              >
                <Text style={styles.drawerIcon}>❓</Text>
                <View style={styles.drawerItemText}>
                  <Text style={[styles.drawerItemTitle, { color: colors.text }]}>Vaccination Information</Text>
                  <Text style={[styles.drawerItemSubtitle, { color: colors.textSecondary }]}>Learn about each vaccine</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => {
                  toggleDrawer();
                  router.push('/view-records');
                }}
              >
                <Text style={styles.drawerIcon}>📋</Text>
                <View style={styles.drawerItemText}>
                  <Text style={[styles.drawerItemTitle, { color: colors.text }]}>View All Records</Text>
                  <Text style={[styles.drawerItemSubtitle, { color: colors.textSecondary }]}>Complete vaccination history</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => {
                  toggleDrawer();
                  router.push('/manage-reminders');
                }}
              >
                <Text style={styles.drawerIcon}>🔔</Text>
                <View style={styles.drawerItemText}>
                  <Text style={[styles.drawerItemTitle, { color: colors.text }]}>Manage Reminders</Text>
                  <Text style={[styles.drawerItemSubtitle, { color: colors.textSecondary }]}>Set up notifications</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => {
                  toggleDrawer();
                  router.push('/add-family-member');
                }}
              >
                <Text style={styles.drawerIcon}>👨‍👩‍👧</Text>
                <View style={styles.drawerItemText}>
                  <Text style={[styles.drawerItemTitle, { color: colors.text }]}>Add Family Member</Text>
                  <Text style={[styles.drawerItemSubtitle, { color: colors.textSecondary }]}>Create a new profile</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.drawerItem} 
                onPress={() => {
                  toggleDrawer();
                  router.push('/settings');
                }}
              >
                <Text style={styles.drawerIcon}>⚙️</Text>
                <View style={styles.drawerItemText}>
                  <Text style={[styles.drawerItemTitle, { color: colors.text }]}>Settings</Text>
                  <Text style={[styles.drawerItemSubtitle, { color: colors.textSecondary }]}>App preferences</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  greeting: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 4,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  iconText: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#22733A',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 14,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  linkButton: {
    fontSize: 14,
    color: '#22733A',
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  appointmentDateBadge: {
    width: 60,
    height: 60,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  appointmentMonth: {
    fontSize: 11,
    color: '#22733A',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  appointmentDay: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#22733A',
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentMember: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 3,
  },
  appointmentVaccine: {
    fontSize: 13,
    color: '#4B5563',
    marginBottom: 4,
  },
  appointmentFacility: {
    fontSize: 12,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
    marginLeft: 8,
  },
  memberCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  memberAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#22733A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  memberInitial: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 3,
  },
  memberRole: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
  },
  progressContainer: {
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22733A',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#6B7280',
  },
  upcomingLabel: {
    fontSize: 11,
    color: '#22733A',
    fontWeight: '500',
    marginTop: 2,
  },
  // Drawer Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  drawer: {
    width: '80%',
    maxWidth: 320,
    height: '100%',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  drawerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    fontSize: 28,
    color: '#6B7280',
    lineHeight: 28,
  },
  drawerContent: {
    flex: 1,
    padding: 4,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  drawerIcon: {
    fontSize: 28,
    marginRight: 16,
    width: 40,
    textAlign: 'center',
  },
  drawerItemText: {
    flex: 1,
  },
  drawerItemTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  drawerItemSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
});
