// @ts-ignore
// eslint-disable-next-line no-undef
/* global console */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from '../components/AppIcon';
import i18n from '../i18n';
import { curriculum, getLessonsByCategory } from '../data/curriculum';
import PracticeActivity from '../components/PracticeActivity';
import { useAppData } from '../hooks/useAppData';

type PracticeCategory = {
  id: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  icon: string;
  lessonRange: string;
  questionCount: number;
  type: 'note_identification' | 'rhythm_tapping' | 'scale_recognition' | 'chord_building' | 'interval_recognition';
};

const PracticeScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | null>(null);
  const [showPractice, setShowPractice] = useState(false);
  const { addPracticeSession, updateWeeklyChallengeProgress } = useAppData();

  const practiceCategories: PracticeCategory[] = [
    {
      id: 'basics',
      title: 'Music Basics',
      titleFa: 'مبانی موسیقی',
      description: 'Learn about the musical staff, clefs, and fundamental concepts.',
      descriptionFa: 'درباره خط حامل، کلیدها و مفاهیم اساسی موسیقی بیاموزید.',
      icon: 'school',
      lessonRange: 'Lessons 1-3',
      questionCount: 5,
      type: 'note_identification',
    },
    {
      id: 'notes',
      title: 'Notes and Pitches',
      titleFa: 'نت‌ها و زیر و بَم‌ها',
      description: 'Practice identifying notes on the staff and understanding pitch relationships.',
      descriptionFa: 'شناسایی نت‌ها روی خط حامل و درک روابط زیر و بَم را تمرین کنید.',
      icon: 'musical-notes',
      lessonRange: 'Lessons 4-6',
      questionCount: 6,
      type: 'note_identification',
    },
    {
      id: 'rhythm',
      title: 'Rhythm and Timing',
      titleFa: 'ریتم و زمان‌بندی',
      description: 'Master note values, time signatures, and rhythmic patterns.',
      descriptionFa: 'ارزش‌های زمانی نت‌ها، کسر میزان و الگوهای ریتم را تسلط یابید.',
      icon: 'pulse',
      lessonRange: 'Lessons 7-9',
      questionCount: 5,
      type: 'rhythm_tapping',
    },
    {
      id: 'scales',
      title: 'Scales and Keys',
      titleFa: 'گام‌ها و کلیدها',
      description: 'Learn major and minor scales, key signatures, and intervals.',
      descriptionFa: 'گام‌های ماژور و مینور، علامت‌های سرکلید و فواصل را بیاموزید.',
      icon: 'trending-up',
      lessonRange: 'Lessons 10-12',
      questionCount: 6,
      type: 'scale_recognition',
    },
    {
      id: 'chords',
      title: 'Chords and Harmony',
      titleFa: 'آکوردها و هارمونی',
      description: 'Understand chord construction and basic harmony.',
      descriptionFa: 'ساخت آکورد و هارمونی پایه را درک کنید.',
      icon: 'layers',
      lessonRange: 'Lessons 13-14',
      questionCount: 5,
      type: 'chord_building',
    },
  ];

  const generatePracticeExercises = (category: PracticeCategory) => {
    const lessons = getLessonsByCategory(category.id as any);
    const exercises = [];
    
    // Generate exercises based on category
    switch (category.type) {
      case 'note_identification':
        exercises.push(
          {
            question: "What note is on the first line of the treble clef?",
            questionFa: "کدام نت روی اولین خط کلید سل قرار دارد؟",
            options: ["C", "D", "E", "F"],
            correctAnswer: 2,
            explanation: "The first line (bottom line) of the treble clef is E.",
            explanationFa: "اولین خط (خط پایین) کلید سل E است."
          },
          {
            question: "What note is in the first space of the treble clef?",
            questionFa: "کدام نت در اولین فاصله کلید سل قرار دارد؟",
            options: ["C", "D", "E", "F"],
            correctAnswer: 3,
            explanation: "The first space (bottom space) of the treble clef is F.",
            explanationFa: "اولین فاصله (فاصله پایین) کلید سل F است."
          },
          {
            question: "How many lines are in a musical staff?",
            questionFa: "چند خط در یک خط حامل موسیقی وجود دارد؟",
            options: ["3", "4", "5", "6"],
            correctAnswer: 2,
            explanation: "A musical staff has exactly 5 horizontal lines.",
            explanationFa: "یک خط حامل موسیقی دقیقاً 5 خط افقی دارد."
          }
        );
        break;
        
      case 'rhythm_tapping':
        exercises.push(
          {
            question: "How many beats does a whole note get in 4/4 time?",
            questionFa: "نت گرد در میزان 4/4 چند ضرب دارد؟",
            options: ["1", "2", "3", "4"],
            correctAnswer: 3,
            explanation: "A whole note gets 4 beats in 4/4 time.",
            explanationFa: "نت گرد در میزان 4/4 چهار ضرب دارد."
          },
          {
            question: "How many beats does a half note get in 4/4 time?",
            questionFa: "نت سفید در میزان 4/4 چند ضرب دارد؟",
            options: ["1", "2", "3", "4"],
            correctAnswer: 1,
            explanation: "A half note gets 2 beats in 4/4 time.",
            explanationFa: "نت سفید در میزان 4/4 دو ضرب دارد."
          }
        );
        break;
        
      case 'scale_recognition':
        exercises.push(
          {
            question: "What is the pattern of whole and half steps in a major scale?",
            questionFa: "الگوی پرده و نیم‌پرده در گام ماژور چیست؟",
            options: ["W W H W W W H", "W H W W H W W", "H W W H W W W", "W W W H W W H"],
            correctAnswer: 0,
            explanation: "The major scale pattern is Whole, Whole, Half, Whole, Whole, Whole, Half.",
            explanationFa: "الگوی گام ماژور: پرده، پرده، نیم‌پرده، پرده، پرده، پرده، نیم‌پرده است."
          },
          {
            question: "How many notes are in a major scale?",
            questionFa: "چند نت در یک گام ماژور وجود دارد؟",
            options: ["6", "7", "8", "9"],
            correctAnswer: 2,
            explanation: "A major scale has 8 notes (including the octave).",
            explanationFa: "یک گام ماژور 8 نت دارد (شامل اکتاو)."
          }
        );
        break;
        
      case 'chord_building':
        exercises.push(
          {
            question: "What notes make up a C major triad?",
            questionFa: "نت‌های تریاد دو ماژور کدامند؟",
            options: ["C E G", "C D E", "C F G", "A C E"],
            correctAnswer: 0,
            explanation: "A C major triad consists of C (root), E (major third), and G (perfect fifth).",
            explanationFa: "تریاد دو ماژور از دو (پایه)، می (سوم ماژور) و سل (پنجم کامل) تشکیل شده است."
          },
          {
            question: "How many notes are in a basic triad?",
            questionFa: "چند نت در یک تریاد وجود دارد؟",
            options: ["2", "3", "4", "5"],
            correctAnswer: 1,
            explanation: "A triad is a three-note chord.",
            explanationFa: "تریاد یک آکورد سه‌نتی است."
          }
        );
        break;
    }
    
    return exercises;
  };

  const handlePracticeCategory = (category: PracticeCategory) => {
    setSelectedCategory(category);
    setShowPractice(true);
  };

  const handlePracticeComplete = async (score: number, total: number) => {
    setShowPractice(false);
    
    try {
      // Add practice session
      await addPracticeSession('rhythm', 10, 8, score, 1);
      
      // Update weekly challenge progress
      await updateWeeklyChallengeProgress();
      
      Alert.alert(
        i18n.t('practice.completed'),
        i18n.t('practice.score', { score, total }),
        [{ text: i18n.t('practice.continue') }]
      );
    } catch (error) {
      console.error('Error saving practice session:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('practice.title')}</Text>
        <Text style={styles.headerSubtitle}>{i18n.t('practice.subtitle')}</Text>
      </LinearGradient>

      {/* Categories */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {practiceCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handlePracticeCategory(category)}
            >
              <View style={styles.categoryHeader}>
                <View style={styles.categoryIconContainer}>
                  <AppIcon name={category.icon} size={24} color="#6200ee" />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>
                    {i18n.locale === 'fa' ? category.titleFa : category.title}
                  </Text>
                  <Text style={styles.categoryRange}>{category.lessonRange}</Text>
                </View>
                <View style={styles.questionCount}>
                  <Text style={styles.questionCountText}>{category.questionCount}</Text>
                </View>
              </View>
              
              <Text style={styles.categoryDescription}>
                {i18n.locale === 'fa' ? category.descriptionFa : category.description}
              </Text>
              
              <View style={styles.categoryFooter}>
                <Text style={styles.startButton}>{i18n.t('practice.startPractice')}</Text>
                <AppIcon name="chevron-forward" size={16} color="#6200ee" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>{i18n.t('practiceStats')}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>{i18n.t('practice.completed')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0%</Text>
              <Text style={styles.statLabel}>{i18n.t('practice.accuracy')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
                              <Text style={styles.statLabel}>{i18n.t('practiceTotalQuestions')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Practice Modal */}
      <Modal
        visible={showPractice}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedCategory && (
          <PracticeActivity
            exercises={generatePracticeExercises(selectedCategory)}
            onComplete={handlePracticeComplete}
            onClose={() => setShowPractice(false)}
            type={selectedCategory.type}
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
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 20,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoryRange: {
    fontSize: 14,
    color: '#666',
  },
  questionCount: {
    backgroundColor: '#6200ee',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  questionCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  categoryFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startButton: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default PracticeScreen; 