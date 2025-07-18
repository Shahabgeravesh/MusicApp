import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  Animated,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import i18n from '../i18n';
import { useAppData } from '../hooks/useAppData';
import AppIcon from '../components/AppIcon';
import WeeklyChallengeCard from '../components/WeeklyChallengeCard';
import { ChallengeSystem } from '../utils/challengeSystem';

const { width } = Dimensions.get('window');





const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [fadeAnim] = useState(new Animated.Value(0));
  const {
    userProgress,
    completedLessons,
    practiceSessions,
    achievements,
    learningStreak,
    weeklyChallenge,
    totalPracticeTime,
    settings,
    loading,
    progressPercentage,
    recentLessons,
    thisWeekSessions,
    unlockedAchievements,
    completeLesson,
    addPracticeSession,
    addQuizResult,
    updateWeeklyChallengeProgress,
    completeWeeklyChallenge,
  } = useAppData();
  
  const getBadge = () => {
    if (progressPercentage >= 100) return { emoji: '🎓', title: 'Master', color: '#FFD700' };
    if (progressPercentage >= 80) return { emoji: '🌟', title: 'Expert', color: '#FF6B6B' };
    if (progressPercentage >= 60) return { emoji: '⭐', title: 'Advanced', color: '#4ECDC4' };
    if (progressPercentage >= 40) return { emoji: '📚', title: 'Intermediate', color: '#45B7D1' };
    if (progressPercentage >= 20) return { emoji: '🎵', title: 'Beginner', color: '#96CEB4' };
    return { emoji: '🎼', title: 'New', color: '#FFEAA7' };
  };



  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // Update challenge progress when component mounts
  useEffect(() => {
    if (!loading) {
      updateWeeklyChallengeProgress();
    }
  }, [loading, updateWeeklyChallengeProgress]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };





  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <View style={styles.achievementCard}>
      <AppIcon 
        name="achievement" 
        size={32} 
        color="#FFD700" 
        style={styles.achievementIcon} 
      />
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
      <Text style={styles.achievementDescription}>{achievement.description}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 16, color: '#666' }}>Loading your progress...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Header Section */}
        <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
          <Text style={styles.welcomeTitle}>{i18n.t('home.title')}</Text>
          <Text style={styles.welcomeSubtitle}>{i18n.t('home.subtitle')}</Text>
        </LinearGradient>



        {/* Progress Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.yourProgress')}</Text>
                      <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>{i18n.t('home.overallProgress')}</Text>
                <Text style={styles.progressPercentage}>{Math.round(progressPercentage)}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {userProgress?.completedLessons || 0} of {userProgress?.totalLessons || 14} lessons completed
              </Text>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{learningStreak?.currentStreak || 0}</Text>
                  <Text style={styles.statLabel}>{i18n.t('home.dayStreak')}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{formatTime(totalPracticeTime)}</Text>
                  <Text style={styles.statLabel}>{i18n.t('home.totalPractice')}</Text>
                </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{getBadge().emoji}</Text>
                <Text style={styles.statLabel}>{getBadge().title}</Text>
              </View>
            </View>
          </View>
        </View>



        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.recentActivity')}</Text>
          <View style={styles.recentCard}>
            {recentLessons.map(lesson => (
              <TouchableOpacity 
                key={lesson.lessonId} 
                style={styles.recentItem}
                onPress={() => {
                  navigation.navigate('Lessons' as never);
                  Alert.alert('Recent Lesson', `Reviewing ${i18n.t(`lessons.${lesson.lessonId}.title`)}`);
                }}
              >
                <Text style={styles.recentTitle}>{i18n.t(`lessons.${lesson.lessonId}.title`)}</Text>
                <Text style={styles.recentProgress}>100% complete</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{i18n.t('home.achievements')}</Text>
            <TouchableOpacity 
              onPress={() => {
                navigation.navigate('Settings' as never);
                Alert.alert('Achievements', 'View all achievements in Settings');
              }}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          {unlockedAchievements.length > 0 ? (
            <View style={styles.achievementsContainer}>
              {unlockedAchievements.slice(0, 4).map(achievement => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyAchievements}>
              <AppIcon name="star" size={48} color="#ccc" />
              <Text style={styles.emptyAchievementsTitle}>No Achievements Yet</Text>
              <Text style={styles.emptyAchievementsText}>
                Complete lessons, practice sessions, and challenges to unlock achievements!
              </Text>
            </View>
          )}
        </View>

        {/* Weekly Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.weeklyChallenge')}</Text>
          {weeklyChallenge && (
            <WeeklyChallengeCard
              challenge={weeklyChallenge}
              onComplete={async () => {
                // Handle challenge completion
                await completeWeeklyChallenge();
                await updateWeeklyChallengeProgress();
                Alert.alert(
                  'Challenge Completed! 🎉',
                  'Great job! Your progress has been updated.',
                  [{ text: 'Continue' }]
                );
              }}
            />
          )}
        </View>

        {/* Motivational Quote */}
        <View style={styles.section}>
          <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>{i18n.t('home.motivationalQuote')}</Text>
            <Text style={styles.quoteAuthor}>{i18n.t('home.quoteAuthor')}</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: '500',
  },
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },

  recentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentTitle: {
    fontSize: 14,
    color: '#333',
  },
  recentProgress: {
    fontSize: 12,
    color: '#666',
  },
  achievementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    width: (width - 60) / 2,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementIcon: {
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    lineHeight: 12,
  },
  challengeCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  challengeIcon: {
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  challengeProgress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  challengeBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  challengeFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  quoteCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  emptyAchievements: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyAchievementsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyAchievementsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default HomeScreen; 