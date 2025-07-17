import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../i18n';

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface FeaturedLesson {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed: boolean;
}

const HomeScreen: React.FC = () => {
  const [currentStreak, setCurrentStreak] = useState(7);
  const [totalPracticeTime, setTotalPracticeTime] = useState(1240); // minutes
  const [lastLesson, setLastLesson] = useState(3);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Mock data - in real app this would come from storage/API
  const totalLessons = 14;
  const completedLessons = 3;
  const progress = (completedLessons / totalLessons) * 100;
  
  const getBadge = () => {
    if (progress >= 100) return { emoji: '🎓', title: 'Master', color: '#FFD700' };
    if (progress >= 80) return { emoji: '🌟', title: 'Expert', color: '#FF6B6B' };
    if (progress >= 60) return { emoji: '⭐', title: 'Advanced', color: '#4ECDC4' };
    if (progress >= 40) return { emoji: '📚', title: 'Intermediate', color: '#45B7D1' };
    if (progress >= 20) return { emoji: '🎵', title: 'Beginner', color: '#96CEB4' };
    return { emoji: '🎼', title: 'New', color: '#FFEAA7' };
  };

  const quickActions: QuickAction[] = [
    {
      id: 'continue',
      title: i18n.t('home.continueLearning'),
      subtitle: `Lesson ${lastLesson + 1}: ${i18n.t(`lessons.${lastLesson + 1}.title`)}`,
      icon: '▶️',
      color: '#6200ee',
      onPress: () => Alert.alert('Continue', 'Navigate to next lesson')
    },
    {
      id: 'daily',
      title: i18n.t('home.dailyPractice'),
      subtitle: '5 min rhythm exercise',
      icon: '⏰',
      color: '#03dac6',
      onPress: () => Alert.alert('Daily Practice', 'Start daily practice session')
    },
    {
      id: 'quiz',
      title: i18n.t('home.quickQuiz'),
      subtitle: 'Test your knowledge',
      icon: '📝',
      color: '#ff6b6b',
      onPress: () => Alert.alert('Quiz', 'Start quick quiz')
    }
  ];

  const featuredLessons: FeaturedLesson[] = [
    {
      id: 4,
      title: 'Notes and Pitches',
      description: 'Learn to read musical notes',
      difficulty: 'Beginner',
      duration: '10 min',
      completed: false
    },
    {
      id: 7,
      title: 'Major Scales',
      description: 'Master the major scale pattern',
      difficulty: 'Intermediate',
      duration: '15 min',
      completed: false
    },
    {
      id: 11,
      title: 'Chords',
      description: 'Build and play basic chords',
      difficulty: 'Intermediate',
      duration: '20 min',
      completed: false
    }
  ];

  const recentLessons = [
    { id: 3, title: 'Clefs', progress: 100 },
    { id: 2, title: 'The Staff', progress: 100 },
    { id: 1, title: 'What is Music?', progress: 100 }
  ];

  const achievements = [
    { id: 1, title: 'First Steps', emoji: '🎵', unlocked: true },
    { id: 2, title: 'Note Reader', emoji: '📖', unlocked: true },
    { id: 3, title: 'Scale Master', emoji: '🎼', unlocked: false },
    { id: 4, title: 'Rhythm King', emoji: '🥁', unlocked: false }
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
      <Text style={styles.actionIcon}>{action.icon}</Text>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{action.title}</Text>
        <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const FeaturedLessonCard = ({ lesson }: { lesson: FeaturedLesson }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <View style={styles.featuredHeader}>
        <Text style={styles.featuredTitle}>{lesson.title}</Text>
        <View style={[styles.difficultyBadge, { backgroundColor: lesson.difficulty === 'Beginner' ? '#96CEB4' : '#FFB347' }]}>
          <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.featuredDescription}>{lesson.description}</Text>
      <View style={styles.featuredFooter}>
        <Text style={styles.durationText}>⏱️ {lesson.duration}</Text>
        <Text style={styles.completedText}>{lesson.completed ? '✅ Completed' : '▶️ Start'}</Text>
      </View>
    </TouchableOpacity>
  );

  const AchievementCard = ({ achievement }: { achievement: any }) => (
    <View style={[styles.achievementCard, { opacity: achievement.unlocked ? 1 : 0.5 }]}>
      <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
      <Text style={styles.achievementTitle}>{achievement.title}</Text>
    </View>
  );

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
              <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{completedLessons} of {totalLessons} lessons completed</Text>
            
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{currentStreak}</Text>
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

        {/* Featured Lessons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.featuredLessons')}</Text>
          {featuredLessons.map(lesson => (
            <FeaturedLessonCard key={lesson.id} lesson={lesson} />
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.recentActivity')}</Text>
          <View style={styles.recentCard}>
            {recentLessons.map(lesson => (
              <View key={lesson.id} style={styles.recentItem}>
                <Text style={styles.recentTitle}>{lesson.title}</Text>
                <Text style={styles.recentProgress}>{lesson.progress}% complete</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.achievements')}</Text>
          <View style={styles.achievementsContainer}>
            {achievements.map(achievement => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </View>
        </View>

        {/* Weekly Challenge */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{i18n.t('home.weeklyChallenge')}</Text>
          <View style={styles.challengeCard}>
            <Text style={styles.challengeEmoji}>🎯</Text>
            <Text style={styles.challengeTitle}>{i18n.t('home.completePracticeSessions')}</Text>
            <Text style={styles.challengeProgress}>{i18n.t('home.ofCompleted', { total: 5 })}</Text>
            <View style={styles.challengeBar}>
              <View style={[styles.challengeFill, { width: '60%' }]} />
            </View>
          </View>
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
    fontSize: 24,
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
  featuredCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  featuredDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6200ee',
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
  achievementEmoji: {
    fontSize: 32,
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
  challengeEmoji: {
    fontSize: 32,
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