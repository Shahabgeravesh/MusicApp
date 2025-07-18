import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from '../components/AppIcon';
import i18n from '../i18n';
import { useAppData } from '../hooks/useAppData';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

interface Lesson {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'basics' | 'notes' | 'rhythm' | 'scales' | 'chords' | 'theory';
  completed: boolean;
  score?: number;
  timeSpent?: number;
}

const LessonsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    userProgress,
    completedLessons,
    completeLesson,
    addPracticeSession,
    addQuizResult,
    updateWeeklyChallengeProgress,
  } = useAppData();

  // Lesson data with comprehensive content
  const lessons: Lesson[] = [
    {
      id: 1,
      title: i18n.t('lessons.0.title'),
      description: 'Introduction to music and its fundamental concepts',
      duration: 5,
      difficulty: 'beginner',
      category: 'basics',
      completed: false,
    },
    {
      id: 2,
      title: i18n.t('lessons.1.title'),
      description: 'Understanding the musical staff and its structure',
      duration: 8,
      difficulty: 'beginner',
      category: 'basics',
      completed: false,
    },
    {
      id: 3,
      title: i18n.t('lessons.2.title'),
      description: 'Learning about treble and bass clefs',
      duration: 10,
      difficulty: 'beginner',
      category: 'basics',
      completed: false,
    },
    {
      id: 4,
      title: i18n.t('lessons.3.title'),
      description: 'Mastering note reading and pitch recognition',
      duration: 12,
      difficulty: 'intermediate',
      category: 'notes',
      completed: false,
    },
    {
      id: 5,
      title: i18n.t('lessons.4.title'),
      description: 'Understanding musical silence and rest values',
      duration: 8,
      difficulty: 'intermediate',
      category: 'rhythm',
      completed: false,
    },
    {
      id: 6,
      title: i18n.t('lessons.5.title'),
      description: 'Learning note durations and time values',
      duration: 15,
      difficulty: 'intermediate',
      category: 'rhythm',
      completed: false,
    },
    {
      id: 7,
      title: i18n.t('lessons.6.title'),
      description: 'Understanding time signatures and meter',
      duration: 12,
      difficulty: 'intermediate',
      category: 'rhythm',
      completed: false,
    },
    {
      id: 8,
      title: i18n.t('lessons.7.title'),
      description: 'Building major scales and their patterns',
      duration: 15,
      difficulty: 'advanced',
      category: 'scales',
      completed: false,
    },
    {
      id: 9,
      title: i18n.t('lessons.8.title'),
      description: 'Exploring minor scales and their variations',
      duration: 15,
      difficulty: 'advanced',
      category: 'scales',
      completed: false,
    },
    {
      id: 10,
      title: i18n.t('lessons.9.title'),
      description: 'Understanding key signatures and transposition',
      duration: 18,
      difficulty: 'advanced',
      category: 'theory',
      completed: false,
    },
    {
      id: 11,
      title: i18n.t('lessons.10.title'),
      description: 'Learning musical intervals and their relationships',
      duration: 20,
      difficulty: 'advanced',
      category: 'theory',
      completed: false,
    },
    {
      id: 12,
      title: i18n.t('lessons.11.title'),
      description: 'Building chords and understanding harmony',
      duration: 18,
      difficulty: 'advanced',
      category: 'chords',
      completed: false,
    },
    {
      id: 13,
      title: i18n.t('lessons.12.title'),
      description: 'Mastering rhythm patterns and timing',
      duration: 15,
      difficulty: 'intermediate',
      category: 'rhythm',
      completed: false,
    },
    {
      id: 14,
      title: i18n.t('lessons.13.title'),
      description: 'Putting all concepts together in practice',
      duration: 25,
      difficulty: 'advanced',
      category: 'theory',
      completed: false,
    },
  ];

  // Update lesson completion status based on user progress
  useEffect(() => {
    if (completedLessons.length > 0) {
      lessons.forEach(lesson => {
        const completedLesson = completedLessons.find(cl => cl.lessonId === lesson.id);
        if (completedLesson) {
          lesson.completed = true;
          lesson.score = completedLesson.score;
          lesson.timeSpent = completedLesson.timeSpent;
        }
      });
    }
  }, [completedLessons]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#6200ee';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basics': return 'book';
      case 'notes': return 'music-note';
      case 'rhythm': return 'musical-notes';
      case 'scales': return 'scale';
      case 'chords': return 'layers';
      case 'theory': return 'graduation';
      default: return 'star';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basics': return '#4CAF50';
      case 'notes': return '#2196F3';
      case 'rhythm': return '#FF9800';
      case 'scales': return '#9C27B0';
      case 'chords': return '#F44336';
      case 'theory': return '#607D8B';
      default: return '#6200ee';
    }
  };

  const handleLessonPress = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setShowLessonModal(true);
  };

  const handleStartLesson = async (lesson: Lesson) => {
    setShowLessonModal(false);
    setLoading(true);

    try {
      // Simulate lesson completion with practice
      const practiceScore = Math.floor(Math.random() * 20) + 80; // 80-100
      const timeSpent = lesson.duration + Math.floor(Math.random() * 5);

      // Add practice session
      let practiceType: 'rhythm' | 'notes' | 'scales' | 'chords' = 'rhythm';
      switch (lesson.category) {
        case 'notes': practiceType = 'notes'; break;
        case 'scales': practiceType = 'scales'; break;
        case 'chords': practiceType = 'chords'; break;
        default: practiceType = 'rhythm';
      }

      await addPracticeSession(practiceType, timeSpent, 10, 8, practiceScore);
      
      // Complete lesson
      await completeLesson(lesson.id, practiceScore, timeSpent);
      
      // Update weekly challenge progress
      await updateWeeklyChallengeProgress();

      Alert.alert(
        'Lesson Completed! 🎉',
        `Great job! You've completed "${lesson.title}" with a score of ${practiceScore}%!`,
        [
          {
            text: 'Continue Learning',
            onPress: () => {
              // Navigate to practice or quiz based on lesson type
              if (lesson.category === 'rhythm') {
                navigation.navigate('Practice' as never);
              } else if (lesson.category === 'theory') {
                navigation.navigate('Quiz' as never);
              } else {
                // Stay on lessons screen
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error completing lesson:', error);
      Alert.alert('Error', 'There was an issue completing the lesson. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = () => {
    if (!userProgress) return 0;
    return (userProgress.completedLessons / userProgress.totalLessons) * 100;
  };

  const getNextLesson = () => {
    if (!userProgress) return lessons[0];
    const nextLessonId = userProgress.currentLesson + 1;
    return lessons.find(lesson => lesson.id === nextLessonId) || lessons[0];
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Completing lesson...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
          <Text style={styles.headerTitle}>{i18n.t('lessons.title')}</Text>
          <Text style={styles.headerSubtitle}>Master music theory step by step</Text>
          
          {/* Progress Overview */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Progress</Text>
              <Text style={styles.progressPercentage}>{Math.round(getProgressPercentage())}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} />
            </View>
            <Text style={styles.progressText}>
              {userProgress?.completedLessons || 0} of {userProgress?.totalLessons || 14} lessons completed
            </Text>
          </View>
        </LinearGradient>

        {/* Continue Learning Section */}
        {userProgress && userProgress.completedLessons > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <TouchableOpacity 
              style={styles.continueCard}
              onPress={() => handleLessonPress(getNextLesson())}
            >
              <View style={styles.continueContent}>
                <AppIcon name="play-circle" size={32} color="#6200ee" />
                <View style={styles.continueText}>
                  <Text style={styles.continueTitle}>{getNextLesson().title}</Text>
                  <Text style={styles.continueSubtitle}>Next lesson in your journey</Text>
                </View>
              </View>
              <AppIcon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        )}

        {/* Lessons List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Lessons</Text>
          {lessons.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonCard, lesson.completed && styles.completedLesson]}
              onPress={() => handleLessonPress(lesson)}
            >
              <View style={styles.lessonHeader}>
                <View style={styles.lessonInfo}>
                  <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor(lesson.category) }]}>
                    <AppIcon name={getCategoryIcon(lesson.category)} size={20} color="#fff" />
                  </View>
                  <View style={styles.lessonDetails}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonDescription}>{lesson.description}</Text>
                  </View>
                </View>
                
                <View style={styles.lessonMeta}>
                  {lesson.completed && (
                    <View style={styles.completedBadge}>
                      <AppIcon name="checkmark" size={16} color="#fff" />
                    </View>
                  )}
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(lesson.difficulty) }]}>
                    <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
                  </View>
                  <Text style={styles.durationText}>{lesson.duration}m</Text>
                </View>
              </View>
              
              {lesson.completed && lesson.score && (
                <View style={styles.scoreSection}>
                  <Text style={styles.scoreText}>Score: {lesson.score}%</Text>
                  {lesson.timeSpent && (
                    <Text style={styles.timeText}>Time: {lesson.timeSpent}m</Text>
                  )}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Lesson Detail Modal */}
      <Modal
        visible={showLessonModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowLessonModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedLesson && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedLesson.title}</Text>
                  <TouchableOpacity onPress={() => setShowLessonModal(false)}>
                    <AppIcon name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalScroll}>
                  <View style={styles.lessonContent}>
                    <Text style={styles.lessonText}>
                      {i18n.t(`lessons.${selectedLesson.id - 1}.text`)}
                    </Text>
                    
                    <View style={styles.lessonStats}>
                      <View style={styles.statItem}>
                        <AppIcon name="time" size={16} color="#666" />
                        <Text style={styles.statText}>{selectedLesson.duration} minutes</Text>
                      </View>
                      <View style={styles.statItem}>
                        <AppIcon name="trending-up" size={16} color="#666" />
                        <Text style={styles.statText}>{selectedLesson.difficulty}</Text>
                      </View>
                      <View style={styles.statItem}>
                        <AppIcon name={getCategoryIcon(selectedLesson.category)} size={16} color="#666" />
                        <Text style={styles.statText}>{selectedLesson.category}</Text>
                      </View>
                    </View>

                    {selectedLesson.completed ? (
                      <View style={styles.completedSection}>
                        <AppIcon name="checkmark-circle" size={48} color="#4CAF50" />
                        <Text style={styles.completedTitle}>Lesson Completed!</Text>
                        {selectedLesson.score && (
                          <Text style={styles.completedScore}>Score: {selectedLesson.score}%</Text>
                        )}
                        <Text style={styles.completedMessage}>
                          Great job! You've mastered this lesson. Keep practicing to reinforce your knowledge.
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.startSection}>
                        <Text style={styles.startTitle}>Ready to learn?</Text>
                        <Text style={styles.startDescription}>
                          This lesson will teach you {selectedLesson.description.toLowerCase()}. 
                          Take your time and practice the concepts thoroughly.
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                  {!selectedLesson.completed && (
                    <TouchableOpacity
                      style={styles.startButton}
                      onPress={() => handleStartLesson(selectedLesson)}
                    >
                      <AppIcon name="play" size={20} color="#fff" />
                      <Text style={styles.startButtonText}>Start Lesson</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowLessonModal(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 24,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
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
  continueCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  continueText: {
    marginLeft: 12,
    flex: 1,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  continueSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  lessonCard: {
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
  completedLesson: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  lessonDetails: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lessonMeta: {
    alignItems: 'flex-end',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  scoreText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#666',
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
    width: width - 40,
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
    flex: 1,
  },
  modalScroll: {
    maxHeight: 400,
  },
  lessonContent: {
    padding: 20,
  },
  lessonText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 20,
  },
  lessonStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textTransform: 'capitalize',
  },
  completedSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#E8F5E8',
    borderRadius: 8,
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 12,
    marginBottom: 8,
  },
  completedScore: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 12,
  },
  completedMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  startSection: {
    paddingVertical: 20,
    backgroundColor: '#F3E5F5',
    borderRadius: 8,
  },
  startTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 8,
    textAlign: 'center',
  },
  startDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  startButton: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  closeButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default LessonsScreen; 