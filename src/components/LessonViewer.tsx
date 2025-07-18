import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  Modal,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from './AppIcon';
import i18n from '../i18n';
import { LessonContent } from '../data/curriculum';
import PracticeActivity from './PracticeActivity';
import Quiz from './Quiz';

const { width, height } = Dimensions.get('window');

interface LessonViewerProps {
  lesson: LessonContent;
  onComplete: (lessonId: number, score: number) => void;
  onClose: () => void;
}

const LessonViewer: React.FC<LessonViewerProps> = ({
  lesson,
  onComplete,
  onClose,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showPractice, setShowPractice] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNextSection = () => {
    if (currentSection < lesson.content.sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      // Lesson content completed, show practice option
      Alert.alert(
        i18n.t('lessons.contentComplete'),
        i18n.t('lessons.readyForPractice'),
        [
          { text: i18n.t('lessons.startPractice'), onPress: () => setShowPractice(true) },
          { text: i18n.t('lessons.skipPractice'), onPress: () => setShowQuiz(true) },
        ]
      );
    }
  };

  const handlePracticeComplete = (score: number, total: number) => {
    setShowPractice(false);
    Alert.alert(
      i18n.t('lessons.practiceComplete'),
      i18n.t('lessons.practiceScore', { score, total }),
      [
        { text: i18n.t('lessons.takeQuiz'), onPress: () => setShowQuiz(true) },
        { text: i18n.t('lessons.completeLesson'), onPress: () => onComplete(lesson.id, score) },
      ]
    );
  };

  const handleQuizComplete = (score: number, total: number) => {
    setShowQuiz(false);
    onComplete(lesson.id, score);
  };

  const getDifficultyColor = () => {
    switch (lesson.difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#6200ee';
    }
  };

  const getCategoryIcon = () => {
    switch (lesson.category) {
      case 'basics': return 'school';
      case 'notes': return 'musical-notes';
      case 'rhythm': return 'pulse';
      case 'scales': return 'trending-up';
      case 'chords': return 'layers';
      case 'theory': return 'library';
      default: return 'help-circle';
    }
  };

  const currentSectionData = lesson.content.sections[currentSection];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AppIcon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {i18n.t('lessons.sectionProgress', { 
                current: currentSection + 1, 
                total: lesson.content.sections.length 
              })}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentSection + 1) / lesson.content.sections.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        <View style={styles.lessonInfo}>
          <View style={styles.lessonHeader}>
            <AppIcon name={getCategoryIcon()} size={32} color="#fff" />
            <View style={styles.lessonTitleContainer}>
              <Text style={styles.lessonTitle}>
                {i18n.locale === 'fa' ? lesson.titleFa : lesson.title}
              </Text>
              <Text style={styles.lessonDescription}>
                {i18n.locale === 'fa' ? lesson.descriptionFa : lesson.description}
              </Text>
            </View>
          </View>

          <View style={styles.lessonMeta}>
            <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
              <Text style={styles.difficultyText}>
                {i18n.t(`lessons.difficulties.${lesson.difficulty}`)}
              </Text>
            </View>
            <View style={styles.durationBadge}>
              <AppIcon name="time" size={16} color="#fff" />
              <Text style={styles.durationText}>{lesson.duration} {i18n.t('lessons.minutes')}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }) }] }}>
          {/* Learning Objectives */}
          <View style={styles.objectivesContainer}>
            <Text style={styles.objectivesTitle}>{i18n.t('lessons.learningObjectives')}</Text>
            {lesson.learningObjectives.map((objective, index) => (
              <View key={index} style={styles.objectiveItem}>
                <AppIcon name="checkmark-circle" size={16} color="#4CAF50" />
                <Text style={styles.objectiveText}>
                  {i18n.locale === 'fa' ? lesson.learningObjectivesFa[index] : objective}
                </Text>
              </View>
            ))}
          </View>

          {/* Current Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              {i18n.locale === 'fa' ? currentSectionData.titleFa : currentSectionData.title}
            </Text>
            
            <Text style={styles.sectionContent}>
              {i18n.locale === 'fa' ? currentSectionData.contentFa : currentSectionData.content}
            </Text>

            {currentSectionData.imageUrl && (
              <View style={styles.imageContainer}>
                <Text style={styles.imagePlaceholder}>
                  {i18n.t('lessons.imagePlaceholder')}
                </Text>
              </View>
            )}

            {currentSectionData.audioUrl && (
              <TouchableOpacity style={styles.audioButton}>
                <AppIcon name="play-circle" size={24} color="#6200ee" />
                <Text style={styles.audioText}>{i18n.t('lessons.listenToSection')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            {currentSection > 0 && (
              <TouchableOpacity 
                style={[styles.navButton, styles.previousButton]}
                onPress={() => setCurrentSection(currentSection - 1)}
              >
                <AppIcon name="chevron-back" size={20} color="#6200ee" />
                <Text style={styles.previousButtonText}>{i18n.t('lessons.previous')}</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={handleNextSection}
            >
              <Text style={styles.nextButtonText}>
                {currentSection < lesson.content.sections.length - 1 
                  ? i18n.t('lessons.nextSection')
                  : i18n.t('lessons.completeContent')
                }
              </Text>
              <AppIcon name="chevron-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Practice Modal */}
      <Modal
        visible={showPractice}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <PracticeActivity
          exercises={lesson.practice.exercises}
          onComplete={handlePracticeComplete}
          onClose={() => setShowPractice(false)}
          type={lesson.practice.type}
        />
      </Modal>

      {/* Quiz Modal */}
      <Modal
        visible={showQuiz}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <Quiz
          questions={lesson.quiz.questions}
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
          title={i18n.locale === 'fa' ? lesson.titleFa : lesson.title}
        />
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  progressContainer: {
    flex: 1,
    marginLeft: 20,
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  lessonInfo: {
    marginTop: 10,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  lessonTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 20,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  durationText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  objectivesContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  objectivesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  objectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  objectiveText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  imageContainer: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholder: {
    color: '#666',
    fontSize: 14,
  },
  audioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  audioText: {
    fontSize: 14,
    color: '#6200ee',
    marginLeft: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  previousButton: {
    backgroundColor: 'transparent',
    borderColor: '#6200ee',
    borderWidth: 2,
  },
  nextButton: {
    backgroundColor: '#6200ee',
  },
  previousButtonText: {
    color: '#6200ee',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },

});

export default LessonViewer; 