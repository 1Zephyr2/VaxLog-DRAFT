import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useColorScheme, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function SettingsScreen() {
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
    danger: '#EF4444',
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailReminders, setEmailReminders] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [shareData, setShareData] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCOUNT</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>👤</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Profile Information</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Update your personal details
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔒</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Change Password</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Update your account password
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>NOTIFICATIONS</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Push Notifications</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Receive mobile notifications
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📧</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Email Reminders</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Get vaccination reminders via email
                </Text>
              </View>
            </View>
            <Switch
              value={emailReminders}
              onValueChange={setEmailReminders}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SECURITY & PRIVACY</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔐</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Biometric Login</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Use fingerprint or face ID
                </Text>
              </View>
            </View>
            <Switch
              value={biometricLogin}
              onValueChange={setBiometricLogin}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🛡️</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Privacy Policy</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  View our privacy policy
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Data & Storage Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>DATA & STORAGE</Text>
          
          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>☁️</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Auto Backup</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Automatically backup to cloud
                </Text>
              </View>
            </View>
            <Switch
              value={autoBackup}
              onValueChange={setAutoBackup}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📥</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Export Data</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Download your vaccination records
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>

          <View style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📊</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Share Analytics</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Help improve VaxLog
                </Text>
              </View>
            </View>
            <Switch
              value={shareData}
              onValueChange={setShareData}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ABOUT</Text>
          
          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>ℹ️</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>App Version</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Version 1.0.0
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📖</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Terms of Service</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Read our terms and conditions
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, { backgroundColor: colors.card, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>💬</Text>
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Contact Support</Text>
                <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
                  Get help or send feedback
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity 
          style={[styles.logoutButton, { backgroundColor: colors.danger }]}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
  },
  chevron: {
    fontSize: 24,
    fontWeight: '300',
    marginLeft: 8,
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
