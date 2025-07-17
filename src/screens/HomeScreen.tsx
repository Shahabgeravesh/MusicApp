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

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  onPress: () => void;
}



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
  } = useAppData();
  
  const getBadge = () => {
    if (progressPercentage >= 100) return { emoji: '🎓', title: 'Master', color: '#FFD700' };
    if (progressPercentage >= 80) return { emoji: '🌟', title: 'Expert', color: '#FF6B6B' };
    if (progressPercentage >= 60) return { emoji: '⭐', title: 'Advanced', color: '#4ECDC4' };
    if (progressPercentage >= 40) return { emoji: '📚', title: 'Intermediate', color: '#45B7D1' };
    if (progressPercentage >= 20) return { emoji: '🎵', title: 'Beginner', color: '#96CEB4' };
    return { emoji: '🎼', title: 'New', color: '#FFEAA7' };
  };

  const quickActions: QuickAction[] = [
    {
      id: 'continue',
      title: i18n.t('home.continueLearning'),
      subtitle: userProgress ? `Lesson ${userProgress.currentLesson + 1}: ${i18n.t(`lessons.${userProgress.currentLesson + 1}.title`)}` : 'Start your journey',
      iconName: 'continue-learning',
      color: '#6200ee',
      onPress: () => {
        if (userProgress && userProgress.currentLesson < 14) {
          // Navigate to the next lesson
          navigation.navigate('Lessons' as never);
          Alert.alert('Continue Learning', `Navigate to Lesson ${userProgress.currentLesson + 1}`);
        } else {
          Alert.alert('Congratulations!', 'You have completed all lessons!');
        }
      }
    },
    {
      id: 'daily',
      title: i18n.t('home.dailyPractice'),
      subtitle: '5 min rhythm exercise',
      iconName: 'daily-practice',
      color: '#03dac6',
      onPress: () => {
        navigation.navigate('Practice' as never);
        Alert.alert('Daily Practice', 'Starting your daily practice session...');
      }
    },
    {
      id: 'quiz',
      title: i18n.t('home.quickQuiz'),
      subtitle: 'Test your knowledge',
      iconName: 'quick-quiz',
      color: '#ff6b6b',
      onPress: () => {
        navigation.navigate('Quiz' as never);
        Alert.alert('Quick Quiz', 'Starting your quiz...');
      }
    }
  ];



  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const QuickActionCard = ({ action }: { action: QuickAction }) => (
    <TouchableOpacity 
      style={[styles.quickActionCard, { borderLeftColor: action.color }]} 
      onPress={action.onPress}
    >
      <AppIcon name={action.iconName} size={24} color={action.color} style={styles.actionIcon} />
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{action.title}</Text>
        <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );



  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <View style={[styles.achievementCard, { opacity: achievement.unlocked ? 1 : 0.5 }]}>
      <AppIcon 
        name={achievement.unlocked ? "achievement" : "star"} 
        size={32} 
        color={achievement.unlocked ? "#FFD700" : "#ccc"} 
        style={styles.achievementIcon} 
      />
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
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

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.quickActions')}</Text>
          {quickActions.map(action => (
            <QuickActionCard key={action.id} action={action} />
          ))}
        </View>

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
          <View style={styles.achievementsContainer}>
            {achievements.slice(0, 4).map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>

        {/* Weekly Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.weeklyChallenge')}</Text>
          <TouchableOpacity 
            style={styles.challengeCard}
            onPress={() => {
              navigation.navigate('Practice' as never);
              Alert.alert('Weekly Challenge', 'Complete practice sessions to meet your weekly goal!');
            }}
          >
            <AppIcon name="challenge" size={32} color="#6200ee" style={styles.challengeIcon} />
            <Text style={styles.challengeTitle}>{weeklyChallenge?.title || i18n.t('home.completePracticeSessions')}</Text>
            <Text style={styles.challengeProgress}>
              {weeklyChallenge ? `${weeklyChallenge.current} of ${weeklyChallenge.target} completed` : '0 of 5 completed'}
            </Text>
            <View style={styles.challengeBar}>
              <View style={[
                styles.challengeFill, 
                { width: weeklyChallenge ? `${(weeklyChallenge.current / weeklyChallenge.target) * 100}%` : '0%' }
              ]} />
            </View>
          </TouchableOpacity>
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
  quickActionCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#666',
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
});

export default HomeScreen; 