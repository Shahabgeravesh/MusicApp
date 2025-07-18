// @ts-ignore
// eslint-disable-next-line no-undef
/* global console */
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
import { curriculum, getLessonById, getPrerequisitesMet } from '../data/curriculum';
import LessonViewer from '../components/LessonViewer';

const { width } = Dimensions.get('window');

interface Lesson {
  id: number;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'basics' | 'notes' | 'rhythm' | 'scales' | 'chords' | 'theory';
  completed: boolean;
  score?: number;
  timeSpent?: number;
  prerequisites: number[];
}

const LessonsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  const {
    userProgress,
    completedLessons,
    completeLesson,
    addPracticeSession,
    addQuizResult,
    updateWeeklyChallengeProgress,
  } = useAppData();

  // Convert curriculum data to lesson format
  const lessons: Lesson[] = curriculum.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    titleFa: lesson.titleFa,
    description: lesson.description,
    descriptionFa: lesson.descriptionFa,
    duration: lesson.duration,
    difficulty: lesson.difficulty,
    category: lesson.category,
    completed: false,
    prerequisites: lesson.prerequisites,
  }));

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basics': return '#6200ee';
      case 'notes': return '#2196F3';
      case 'rhythm': return '#FF9800';
      case 'scales': return '#4CAF50';
      case 'chords': return '#9C27B0';
      case 'theory': return '#F44336';
      default: return '#666';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basics': return 'school';
      case 'notes': return 'musical-notes';
      case 'rhythm': return 'pulse';
      case 'scales': return 'trending-up';
      case 'chords': return 'layers';
      case 'theory': return 'library';
      default: return 'help-circle';
    }
  };

  const handleLessonPress = (lesson: Lesson) => {
    // Check if prerequisites are met
    const completedLessonIds = completedLessons.map(cl => cl.lessonId);
    const prerequisitesMet = lesson.prerequisites.every(prereq => 
      completedLessonIds.includes(prereq)
    );

    if (!prerequisitesMet && lesson.prerequisites.length > 0) {
      Alert.alert(
        i18n.t('lessons.prerequisitesNotMet'),
        i18n.t('lessons.completePrerequisites'),
        [{ text: i18n.t('ok_button') }]
      );
      return;
    }

    setSelectedLesson(lesson);
    setShowLessonModal(true);
  };

  const handleLessonComplete = async (lessonId: number, score: number) => {
    setShowLessonModal(false);
    setLoading(true);

    try {
      // Complete the lesson
      await completeLesson(lessonId, score);
      
             // Add practice session if score is good
       if (score > 0) {
         await addPracticeSession('rhythm', 10, 8, score, lessonId);
       }

      // Update weekly challenge progress
      await updateWeeklyChallengeProgress();

      Alert.alert(
        i18n.t('lessons.actions.lessonComplete'),
        i18n.t('lessons.actions.lessonCompleteMessage'),
        [
          { 
            text: i18n.t('lessons.actions.nextLesson'), 
            onPress: () => {
              // Find next available lesson
              const nextLesson = lessons.find(l => 
                !l.completed && l.prerequisites.every(prereq => 
                  completedLessons.some(cl => cl.lessonId === prereq)
                )
              );
              if (nextLesson) {
                setSelectedLesson(nextLesson);
                setShowLessonModal(true);
              }
            }
          },
          { text: i18n.t('lessons.actions.backToLessons') }
        ]
      );
    } catch (error) {
      console.error('Error completing lesson:', error);
      Alert.alert(i18n.t('error'), i18n.t('lessons.completionError'));
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = () => {
    const totalLessons = lessons.length;
    const completedCount = completedLessons.length;
    return totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  };

  const getNextLesson = () => {
    return lessons.find(lesson => 
      !lesson.completed && lesson.prerequisites.every(prereq => 
        completedLessons.some(cl => cl.lessonId === prereq)
      )
    );
  };

  const filteredLessons = filterCategory 
    ? lessons.filter(lesson => lesson.category === filterCategory)
    : lessons;

  const categories = [
    { key: null, title: i18n.t('lessons.categories.all'), icon: 'grid' },
    { key: 'basics', title: i18n.t('lessons.categories.basics'), icon: 'school' },
    { key: 'notes', title: i18n.t('lessons.categories.notes'), icon: 'musical-notes' },
    { key: 'rhythm', title: i18n.t('lessons.categories.rhythm'), icon: 'pulse' },
    { key: 'scales', title: i18n.t('lessons.categories.scales'), icon: 'trending-up' },
    { key: 'chords', title: i18n.t('lessons.categories.chords'), icon: 'layers' },
    { key: 'theory', title: i18n.t('lessons.categories.theory'), icon: 'library' },
  ];

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={{ marginTop: 16, color: '#666' }}>{i18n.t('loading')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('lessons.title')}</Text>
        <Text style={styles.headerSubtitle}>
          {i18n.t('lessons.progress', { 
            completed: completedLessons.length, 
            total: lessons.length 
          })}
        </Text>
        
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${getProgressPercentage()}%` }
            ]} 
          />
        </View>
      </LinearGradient>

      {/* Category Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryFilter}
        contentContainerStyle={styles.categoryFilterContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key || 'all'}
            style={[
              styles.categoryButton,
              filterCategory === category.key && styles.activeCategoryButton
            ]}
            onPress={() => setFilterCategory(category.key)}
          >
            <AppIcon 
              name={category.icon} 
              size={16} 
              color={filterCategory === category.key ? '#fff' : '#6200ee'} 
            />
            <Text style={[
              styles.categoryButtonText,
              filterCategory === category.key && styles.activeCategoryButtonText
            ]}>
              {category.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lessons List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredLessons.length === 0 ? (
          <View style={styles.emptyState}>
            <AppIcon name="library" size={64} color="#ccc" />
            <Text style={styles.emptyStateTitle}>
              {i18n.t('lessons.noLessonsInCategory')}
            </Text>
            <Text style={styles.emptyStateText}>
              {i18n.t('lessons.tryDifferentCategory')}
            </Text>
          </View>
        ) : (
          filteredLessons.map((lesson) => {
            const isAvailable = lesson.prerequisites.every(prereq => 
              completedLessons.some(cl => cl.lessonId === prereq)
            );
            
            return (
              <TouchableOpacity
                key={lesson.id}
                style={[
                  styles.lessonCard,
                  !isAvailable && styles.lockedLessonCard
                ]}
                onPress={() => handleLessonPress(lesson)}
                disabled={!isAvailable}
              >
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonInfo}>
                    <View style={styles.lessonTitleRow}>
                      <AppIcon 
                        name={getCategoryIcon(lesson.category)} 
                        size={24} 
                        color={getCategoryColor(lesson.category)} 
                      />
                      <Text style={styles.lessonTitle}>
                        {i18n.locale === 'fa' ? lesson.titleFa : lesson.title}
                      </Text>
                      {lesson.completed && (
                        <AppIcon name="checkmark-circle" size={20} color="#4CAF50" />
                      )}
                    </View>
                    
                    <Text style={styles.lessonDescription}>
                      {i18n.locale === 'fa' ? lesson.descriptionFa : lesson.description}
                    </Text>
                  </View>

                  <View style={styles.lessonMeta}>
                    <View style={[
                      styles.difficultyBadge, 
                      { backgroundColor: getDifficultyColor(lesson.difficulty) }
                    ]}>
                      <Text style={styles.difficultyText}>
                        {i18n.t(`lessons.difficulties.${lesson.difficulty}`)}
                      </Text>
                    </View>
                    
                    <View style={styles.durationBadge}>
                      <AppIcon name="time" size={14} color="#666" />
                      <Text style={styles.durationText}>{lesson.duration}m</Text>
                    </View>
                  </View>
                </View>

                {lesson.completed && lesson.score !== undefined && (
                  <View style={styles.completionInfo}>
                    <Text style={styles.completionText}>
                      {i18n.t('lessons.completedWithScore', { score: lesson.score })}
                    </Text>
                  </View>
                )}

                {!isAvailable && (
                  <View style={styles.lockedOverlay}>
                    <AppIcon name="lock-closed" size={24} color="#ccc" />
                    <Text style={styles.lockedText}>
                      {i18n.t('lessons.completePrerequisitesFirst')}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      {/* Lesson Viewer Modal */}
      <Modal
        visible={showLessonModal}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedLesson && (
          <LessonViewer
            lesson={curriculum.find(l => l.id === selectedLesson.id)!}
            onComplete={handleLessonComplete}
            onClose={() => setShowLessonModal(false)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
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
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  categoryFilter: {
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  categoryFilterContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeCategoryButton: {
    backgroundColor: '#6200ee',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6200ee',
    marginLeft: 6,
    fontWeight: '500',
  },
  activeCategoryButtonText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  lessonCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockedLessonCard: {
    opacity: 0.6,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  lessonInfo: {
    flex: 1,
    marginRight: 16,
  },
  lessonTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  lessonMeta: {
    alignItems: 'flex-end',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  completionInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  completionText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  lockedText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default LessonsScreen; 