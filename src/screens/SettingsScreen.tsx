import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, I18nManager, Switch, ScrollView, Alert } from 'react-native';
import i18n from '../i18n';

const SettingsScreen: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const switchLanguage = (language: string) => {
    if (language === currentLanguage) return;
    
    setCurrentLanguage(language);
    i18n.setLocale(language);
    
    // Enable RTL for Farsi, disable for English
    if (language === 'fa' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    } else if (language === 'en' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
    
    // Show confirmation and suggest restart for RTL changes
    if (language === 'fa') {
      Alert.alert(
        'Language Changed',
        'Farsi language activated with RTL layout. The app will now display in Persian.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Language Changed',
        'English language activated.',
        [{ text: 'OK' }]
      );
    }
    
    console.log(`Language switched to: ${language}`);
  };

  const SettingItem = ({ title, subtitle, value, onPress, showSwitch = false, switchValue = false, onSwitchChange }: any) => {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress} disabled={showSwitch}>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
        {showSwitch ? (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{ false: '#e0e0e0', true: '#6200ee' }}
            thumbColor={switchValue ? '#fff' : '#f4f3f4'}
          />
        ) : (
          <Text style={styles.settingValue}>{value}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your learning experience</Text>
      </View>

      {/* Language Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Language</Text>
        <View style={styles.languageContainer}>
          <TouchableOpacity
            style={[
              styles.languageButton,
              currentLanguage === 'en' && styles.activeLanguageButton
            ]}
            onPress={() => switchLanguage('en')}
          >
            <Text style={[
              styles.languageButtonText,
              currentLanguage === 'en' && styles.activeLanguageButtonText
            ]}>
              English            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.languageButton,
              currentLanguage === 'fa' && styles.activeLanguageButton
            ]}
            onPress={() => switchLanguage('fa')}
          >
            <Text style={[
              styles.languageButtonText,
              currentLanguage === 'fa' && styles.activeLanguageButtonText
            ]}>
              فارسی            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <SettingItem
          title="Notifications"
          subtitle="Get reminders to practice daily"
          showSwitch={true}
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        <SettingItem
          title="Sound Effects"
          subtitle="Play sounds for correct/incorrect answers"
          showSwitch={true}
          switchValue={soundEnabled}
          onSwitchChange={setSoundEnabled}
        />
        <SettingItem
          title="Auto-play Audio"
          subtitle="Automatically play lesson audio"
          showSwitch={true}
          switchValue={autoPlayEnabled}
          onSwitchChange={setAutoPlayEnabled}
        />
      </View>

      {/* Progress & Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress & Data</Text>
        <SettingItem
          title="Reset Progress"
          subtitle="Start over with all lessons"
          value=""
          onPress={() => alert('Reset progress? This cannot be undone.')}
        />
        <SettingItem
          title="Export Progress"
          subtitle="Save your learning data"
          value=""
          onPress={() => alert('Export feature coming soon!')}
        />
        <SettingItem
          title="Clear Cache"
          subtitle="Free up storage space"
          value=""
          onPress={() => alert('Cache cleared!')}
        />
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <SettingItem
          title="Version"
          subtitle="Current app version"
          value="1.0.0"
          onPress={() => {}}
        />
        <SettingItem
          title="Terms of Service"
          subtitle="Read our terms and conditions"
          value=""
          onPress={() => alert('Terms of Service coming soon!')}
        />
        <SettingItem
          title="Privacy Policy"
          subtitle="How we handle your data"
          value=""
          onPress={() => alert('Privacy Policy coming soon!')}
        />
        <SettingItem
          title="Contact Support"
          subtitle="Get help with the app"
          value=""
          onPress={() => alert('Contact support coming soon!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    color: '#333',
  },
  languageContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeLanguageButton: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  languageButtonText: {
    fontSize: 16,
    fontWeight: 500,
    color: '#333',
  },
  activeLanguageButtonText: {
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 500,
    color: '#333',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  settingValue: {
    fontSize: 16,
    color: '#6200ee',
    fontWeight: 500,
  },
});

export default SettingsScreen; 