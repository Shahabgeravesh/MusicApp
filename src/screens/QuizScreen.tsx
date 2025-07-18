// @ts-ignore
// eslint-disable-next-line no-undef
/* global console */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from '../components/AppIcon';
import i18n from '../i18n';
import { curriculum, getLessonsByCategory } from '../data/curriculum';
import Quiz from '../components/Quiz';
import { useAppData } from '../hooks/useAppData';

// Import QuizQuestion type from Quiz component
interface QuizQuestion {
  question: string;
  questionFa: string;
  type: 'multiple_choice' | 'true_false' | 'matching' | 'fill_blank';
  options?: string[];
  correctAnswer: number | string | boolean;
  explanation: string;
  explanationFa: string;
  imageUrl?: string;
  audioUrl?: string;
}

type QuizCategory = {
  id: string;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  icon: string;
  lessonRange: string;
  questionCount: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
};

const QuizScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const { addQuizResult, updateWeeklyChallengeProgress } = useAppData();

  const quizCategories: QuizCategory[] = [
    {
      id: 'basics',
      title: 'Music Basics Quiz',
      titleFa: 'آزمون مبانی موسیقی',
      description: 'Test your knowledge of the musical staff, clefs, and fundamental concepts.',
      descriptionFa: 'دانش خود را در مورد خط حامل، کلیدها و مفاهیم اساسی موسیقی محک بزنید.',
      icon: 'school',
      lessonRange: 'Lessons 1-3',
      questionCount: 5,
      difficulty: 'beginner',
    },
    {
      id: 'notes',
      title: 'Notes and Pitches Quiz',
      titleFa: 'آزمون نت‌ها و زیر و بَم‌ها',
      description: 'Challenge yourself with note identification and pitch recognition.',
      descriptionFa: 'خود را با شناسایی نت و تشخیص زیر و بَم به چالش بکشید.',
      icon: 'musical-notes',
      lessonRange: 'Lessons 4-6',
      questionCount: 6,
      difficulty: 'beginner',
    },
    {
      id: 'rhythm',
      title: 'Rhythm and Timing Quiz',
      titleFa: 'آزمون ریتم و زمان‌بندی',
      description: 'Test your understanding of note values, time signatures, and rhythm.',
      descriptionFa: 'درک خود را از ارزش‌های زمانی نت‌ها، کسر میزان و ریتم محک بزنید.',
      icon: 'pulse',
      lessonRange: 'Lessons 7-9',
      questionCount: 5,
      difficulty: 'intermediate',
    },
    {
      id: 'scales',
      title: 'Scales and Keys Quiz',
      titleFa: 'آزمون گام‌ها و کلیدها',
      description: 'Challenge yourself with major/minor scales and key signatures.',
      descriptionFa: 'خود را با گام‌های ماژور/مینور و علامت‌های سرکلید به چالش بکشید.',
      icon: 'trending-up',
      lessonRange: 'Lessons 10-12',
      questionCount: 6,
      difficulty: 'intermediate',
    },
    {
      id: 'chords',
      title: 'Chords and Harmony Quiz',
      titleFa: 'آزمون آکوردها و هارمونی',
      description: 'Test your knowledge of chord construction and basic harmony.',
      descriptionFa: 'دانش خود را در مورد ساخت آکورد و هارمونی پایه محک بزنید.',
      icon: 'layers',
      lessonRange: 'Lessons 13-14',
      questionCount: 5,
      difficulty: 'advanced',
    },
  ];

  const generateQuizQuestions = (category: QuizCategory): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];
    
    // Generate questions based on category
    switch (category.id) {
      case 'basics':
        questions.push(
          {
            question: "How many lines are in a musical staff?",
            questionFa: "چند خط در یک خط حامل موسیقی وجود دارد؟",
            type: 'multiple_choice' as const,
            options: ["3", "4", "5", "6"],
            correctAnswer: 2,
            explanation: "A musical staff has exactly 5 horizontal lines.",
            explanationFa: "یک خط حامل موسیقی دقیقاً 5 خط افقی دارد."
          },
          {
            question: "Which clef is used for higher-pitched instruments?",
            questionFa: "کدام کلید برای سازهای زیرتر استفاده می‌شود؟",
            type: 'multiple_choice',
            options: ["Treble Clef", "Bass Clef", "Alto Clef", "Tenor Clef"],
            correctAnswer: 0,
            explanation: "The treble clef (G clef) is used for higher-pitched instruments and voices.",
            explanationFa: "کلید سل (کلید G) برای سازها و صداهای زیرتر استفاده می‌شود."
          },
          {
            question: "The staff has 5 lines and 4 spaces.",
            questionFa: "خط حامل 5 خط و 4 فاصله دارد.",
            type: 'true_false',
            correctAnswer: true,
            explanation: "This is the standard structure of a musical staff.",
            explanationFa: "این ساختار استاندارد خط حامل موسیقی است."
          }
        );
        break;
        
      case 'notes':
        questions.push(
          {
            question: "What note is on the first line of the treble clef?",
            questionFa: "کدام نت روی اولین خط کلید سل قرار دارد؟",
            type: 'multiple_choice',
            options: ["C", "D", "E", "F"],
            correctAnswer: 2,
            explanation: "The first line (bottom line) of the treble clef is E.",
            explanationFa: "اولین خط (خط پایین) کلید سل E است."
          },
          {
            question: "How many letters are in the musical alphabet?",
            questionFa: "چند حرف در الفبای موسیقی وجود دارد؟",
            type: 'multiple_choice',
            options: ["5", "6", "7", "8"],
            correctAnswer: 2,
            explanation: "The musical alphabet has 7 letters: A, B, C, D, E, F, G.",
            explanationFa: "الفبای موسیقی 7 حرف دارد: A، B، C، D، E، F، G."
          }
        );
        break;
        
      case 'rhythm':
        questions.push(
          {
            question: "How many beats does a whole note get in 4/4 time?",
            questionFa: "نت گرد در میزان 4/4 چند ضرب دارد؟",
            type: 'multiple_choice',
            options: ["1", "2", "3", "4"],
            correctAnswer: 3,
            explanation: "A whole note gets 4 beats in 4/4 time.",
            explanationFa: "نت گرد در میزان 4/4 چهار ضرب دارد."
          },
          {
            question: "A quarter note gets 1 beat in 4/4 time.",
            questionFa: "نت سیاه در میزان 4/4 یک ضرب دارد.",
            type: 'true_false',
            correctAnswer: true,
            explanation: "A quarter note gets exactly 1 beat in 4/4 time.",
            explanationFa: "نت سیاه دقیقاً یک ضرب در میزان 4/4 دارد."
          }
        );
        break;
        
      case 'scales':
        questions.push(
          {
            question: "What is the pattern of whole and half steps in a major scale?",
            questionFa: "الگوی پرده و نیم‌پرده در گام ماژور چیست؟",
            type: 'multiple_choice',
            options: ["W W H W W W H", "W H W W H W W", "H W W H W W W", "W W W H W W H"],
            correctAnswer: 0,
            explanation: "The major scale pattern is Whole, Whole, Half, Whole, Whole, Whole, Half.",
            explanationFa: "الگوی گام ماژور: پرده، پرده، نیم‌پرده، پرده، پرده، پرده، نیم‌پرده است."
          },
          {
            question: "How many notes are in a major scale?",
            questionFa: "چند نت در یک گام ماژور وجود دارد؟",
            type: 'multiple_choice',
            options: ["6", "7", "8", "9"],
            correctAnswer: 2,
            explanation: "A major scale has 8 notes (including the octave).",
            explanationFa: "یک گام ماژور 8 نت دارد (شامل اکتاو)."
          }
        );
        break;
        
      case 'chords':
        questions.push(
          {
            question: "What notes make up a C major triad?",
            questionFa: "نت‌های تریاد دو ماژور کدامند؟",
            type: 'multiple_choice',
            options: ["C E G", "C D E", "C F G", "A C E"],
            correctAnswer: 0,
            explanation: "A C major triad consists of C (root), E (major third), and G (perfect fifth).",
            explanationFa: "تریاد دو ماژور از دو (پایه)، می (سوم ماژور) و سل (پنجم کامل) تشکیل شده است."
          },
          {
            question: "A chord must have at least 3 notes.",
            questionFa: "یک آکورد باید حداقل 3 نت داشته باشد.",
            type: 'true_false',
            correctAnswer: false,
            explanation: "While triads have 3 notes, chords can have 2 notes (dyads) or more.",
            explanationFa: "در حالی که تریادها 3 نت دارند، آکوردها می‌توانند 2 نت (دیاد) یا بیشتر داشته باشند."
          }
        );
        break;
    }
    
    return questions;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#6200ee';
    }
  };

  const handleQuizCategory = (category: QuizCategory) => {
    setSelectedCategory(category);
    setShowQuiz(true);
  };

  const handleQuizComplete = async (score: number, total: number) => {
    setShowQuiz(false);
    
    try {
      // Add quiz result
      await addQuizResult('rhythm', score, total, score, 10);
      
      // Update weekly challenge progress
      await updateWeeklyChallengeProgress();
      
      Alert.alert(
        i18n.t('quiz.completed'),
        i18n.t('quiz.finalScore', { score, total }),
        [{ text: i18n.t('quiz.continue') }]
      );
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('quiz.title')}</Text>
        <Text style={styles.headerSubtitle}>{i18n.t('quiz.subtitle')}</Text>
      </LinearGradient>

      {/* Categories */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {quizCategories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => handleQuizCategory(category)}
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
                <View style={styles.categoryMeta}>
                  <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(category.difficulty) }]}>
                    <Text style={styles.difficultyText}>
                      {i18n.t(`lessons.difficulties.${category.difficulty}`)}
                    </Text>
                  </View>
                  <View style={styles.questionCount}>
                    <Text style={styles.questionCountText}>{category.questionCount}</Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.categoryDescription}>
                {i18n.locale === 'fa' ? category.descriptionFa : category.description}
              </Text>
              
              <View style={styles.categoryFooter}>
                <Text style={styles.startButton}>{i18n.t('quiz.startQuiz')}</Text>
                <AppIcon name="chevron-forward" size={16} color="#6200ee" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>{i18n.t('quizStats')}</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>{i18n.t('quiz.completed')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0%</Text>
              <Text style={styles.statLabel}>{i18n.t('quiz.averageScore')}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>{i18n.t('quiz.totalQuestions')}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Quiz Modal */}
      <Modal
        visible={showQuiz}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedCategory && (
          <Quiz
            questions={generateQuizQuestions(selectedCategory)}
            onComplete={handleQuizComplete}
            onClose={() => setShowQuiz(false)}
            title={i18n.locale === 'fa' ? selectedCategory.titleFa : selectedCategory.title}
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
  categoryMeta: {
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

export default QuizScreen; 