// @ts-ignore
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, I18nManager, Switch, ScrollView, Alert, Modal, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from '../components/AppIcon';
import { useAppData } from '../hooks/useAppData';
import i18n from '../i18n';

const SettingsScreen: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  
  const { achievements, unlockedAchievements } = useAppData();

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
      i18n.t('settings.languageChanged'),
      i18n.t('settings.farsiActivated'),
      [{ text: i18n.t('ok_button') }]
    );
  } else {
    Alert.alert(
      i18n.t('settings.languageChanged'),
      i18n.t('settings.englishActivated'),
      [{ text: i18n.t('ok_button') }]
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
        <Text style={styles.title}>{i18n.t('settings.title')}</Text>
        <Text style={styles.subtitle}>{i18n.t('settings.subtitle')}</Text>
      </View>

      {/* Language Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.language')}</Text>
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
              {i18n.t('english')}            </Text>
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
              {i18n.t('farsi')}            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.notifications')}</Text>
        <SettingItem
          title={i18n.t('settings.notifications')}
          subtitle={i18n.t('settings.notificationsSubtitle')}
          showSwitch={true}
          switchValue={notificationsEnabled}
          onSwitchChange={setNotificationsEnabled}
        />
        <SettingItem
          title={i18n.t('settings.soundEffects')}
          subtitle={i18n.t('settings.soundEffectsSubtitle')}
          showSwitch={true}
          switchValue={soundEnabled}
          onSwitchChange={setSoundEnabled}
        />
        <SettingItem
          title={i18n.t('settings.autoPlayAudio')}
          subtitle={i18n.t('settings.autoPlayAudioSubtitle')}
          showSwitch={true}
          switchValue={autoPlayEnabled}
          onSwitchChange={setAutoPlayEnabled}
        />
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.achievements')}</Text>
        <SettingItem
          title={i18n.t('settings.viewAchievements')}
          subtitle={`${unlockedAchievements.length} ${i18n.t('settings.of')} ${achievements.length} ${i18n.t('settings.unlocked')}`}
          value=""
          onPress={() => setShowAchievements(true)}
        />
      </View>

      {/* Progress & Data */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.dataManagement')}</Text>
        <SettingItem
          title={i18n.t('settings.resetProgress')}
          subtitle={i18n.t('settings.resetProgressSubtitle')}
          value=""
          onPress={() => alert(i18n.t('settings.resetProgressConfirm'))}
        />
        <SettingItem
          title={i18n.t('settings.exportProgress')}
          subtitle={i18n.t('settings.exportProgressSubtitle')}
          value=""
          onPress={() => alert(i18n.t('settings.exportFeatureComing'))}
        />
        <SettingItem
          title={i18n.t('settings.clearCache')}
          subtitle={i18n.t('settings.clearCacheSubtitle')}
          value=""
          onPress={() => alert(i18n.t('settings.cacheCleared'))}
        />
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('settings.about')}</Text>
        <SettingItem
          title={i18n.t('settings.version')}
          subtitle={i18n.t('settings.versionSubtitle')}
          value="1.0.0"
          onPress={() => {}}
        />
        <SettingItem
          title={i18n.t('settings.termsOfService')}
          subtitle={i18n.t('settings.termsOfServiceSubtitle')}
          value=""
          onPress={() => alert(i18n.t('settings.termsComingSoon'))}
        />
        <SettingItem
          title={i18n.t('settings.privacyPolicy')}
          subtitle={i18n.t('settings.privacyPolicySubtitle')}
          value=""
          onPress={() => alert(i18n.t('settings.privacyComingSoon'))}
        />
        <SettingItem
          title={i18n.t('settings.contactSupport')}
          subtitle={i18n.t('settings.contactSupportSubtitle')}
          value=""
          onPress={() => alert(i18n.t('settings.supportComingSoon'))}
        />
      </View>

      {/* Achievements Modal */}
      <Modal
        visible={showAchievements}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAchievements(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{i18n.t('settings.achievementsTitle')}</Text>
              <TouchableOpacity onPress={() => setShowAchievements(false)}>
                <AppIcon name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.achievementsList}>
              {achievements.map((achievement) => (
                <View key={achievement.id} style={[
                  styles.achievementItem,
                  achievement.unlocked && styles.unlockedAchievement
                ]}>
                  <View style={styles.achievementIcon}>
                    <AppIcon 
                      name={achievement.unlocked ? "achievement" : "star"} 
                      size={24} 
                      color={achievement.unlocked ? "#FFD700" : "#ccc"} 
                    />
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={[
                      styles.achievementTitle,
                      !achievement.unlocked && styles.lockedAchievementTitle
                    ]}>
                      {achievement.title}
                    </Text>
                    <Text style={[
                      styles.achievementDescription,
                      !achievement.unlocked && styles.lockedAchievementDescription
                    ]}>
                      {achievement.description}
                    </Text>
                    {achievement.unlocked && achievement.unlockedAt && (
                                          <Text style={styles.achievementDate}>
                      {i18n.t('settings.unlocked')}: {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </Text>
                    )}
                  </View>
                  <View style={styles.achievementProgress}>
                    <Text style={styles.progressText}>
                      {achievement.progress}/{achievement.maxProgress}
                    </Text>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${(achievement.progress / achievement.maxProgress) * 100}%` }
                        ]} 
                      />
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: Dimensions.get('window').width - 40,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementsList: {
    maxHeight: 500,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    opacity: 0.6,
  },
  unlockedAchievement: {
    opacity: 1,
    backgroundColor: '#F8F9FA',
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lockedAchievementTitle: {
    color: '#999',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  lockedAchievementDescription: {
    color: '#ccc',
  },
  achievementDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  achievementProgress: {
    alignItems: 'flex-end',
    minWidth: 60,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
});

export default SettingsScreen; 