// @ts-ignore
// eslint-disable-next-line no-undef
/* global setTimeout */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Animated,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from './AppIcon';
import i18n from '../i18n';

const { width, height } = Dimensions.get('window');

interface PracticeExercise {
  question: string;
  questionFa: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationFa: string;
  imageUrl?: string;
  audioUrl?: string;
}

interface PracticeActivityProps {
  exercises: PracticeExercise[];
  onComplete: (score: number, totalQuestions: number) => void;
  onClose: () => void;
  type: 'note_identification' | 'rhythm_tapping' | 'scale_recognition' | 'chord_building' | 'interval_recognition';
}

const PracticeActivity: React.FC<PracticeActivityProps> = ({
  exercises,
  onComplete,
  onClose,
  type,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const currentExercise = exercises[currentQuestionIndex];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentExercise.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    // Show explanation after a short delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNext = () => {
    if (currentQuestionIndex < exercises.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
      fadeAnim.setValue(0);
    } else {
      // Practice completed
      setIsCompleted(true);
      onComplete(score, exercises.length);
    }
  };

  const getPracticeTypeIcon = () => {
    switch (type) {
      case 'note_identification':
        return 'musical-notes';
      case 'rhythm_tapping':
        return 'pulse';
      case 'scale_recognition':
        return 'trending-up';
      case 'chord_building':
        return 'layers';
      case 'interval_recognition':
        return 'git-compare';
      default:
        return 'help-circle';
    }
  };

  const getPracticeTypeTitle = () => {
    switch (type) {
      case 'note_identification':
        return i18n.t('practice.types.noteIdentification');
      case 'rhythm_tapping':
        return i18n.t('practice.types.rhythmTapping');
      case 'scale_recognition':
        return i18n.t('practice.types.scaleRecognition');
      case 'chord_building':
        return i18n.t('practice.types.chordBuilding');
      case 'interval_recognition':
        return i18n.t('practice.types.intervalRecognition');
      default:
        return i18n.t('practice.types.general');
    }
  };

  if (isCompleted) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
          <AppIcon name="trophy" size={48} color="#fff" />
          <Text style={styles.completionTitle}>{i18n.t('practice.completed')}</Text>
          <Text style={styles.completionSubtitle}>
            {i18n.t('practice.score', { score, total: exercises.length })}
          </Text>
          <Text style={styles.completionPercentage}>
            {Math.round((score / exercises.length) * 100)}%
          </Text>
        </LinearGradient>

        <View style={styles.completionContent}>
          <Text style={styles.completionMessage}>
            {score === exercises.length 
              ? i18n.t('practice.perfectScore')
              : i18n.t('practice.goodJob')
            }
          </Text>
          
          <View style={styles.completionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={() => onComplete(score, exercises.length)}
            >
              <Text style={styles.buttonText}>{i18n.t('practice.continue')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={onClose}
            >
              <Text style={styles.secondaryButtonText}>{i18n.t('practice.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
              {i18n.t('practice.progress', { 
                current: currentQuestionIndex + 1, 
                total: exercises.length 
              })}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex + 1) / exercises.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>
        
        <View style={styles.practiceTypeContainer}>
          <AppIcon name={getPracticeTypeIcon()} size={32} color="#fff" />
          <Text style={styles.practiceTypeTitle}>{getPracticeTypeTitle()}</Text>
        </View>
      </LinearGradient>

      {/* Question Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {i18n.locale === 'fa' ? currentExercise.questionFa : currentExercise.question}
            </Text>
            
            {currentExercise.imageUrl && (
              <View style={styles.imageContainer}>
                <Text style={styles.imagePlaceholder}>
                  {i18n.t('practice.imagePlaceholder')}
                </Text>
              </View>
            )}
          </View>

          {/* Answer Options */}
          <View style={styles.optionsContainer}>
            {currentExercise.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && isCorrect && styles.correctOption,
                  selectedAnswer === index && !isCorrect && styles.incorrectOption,
                  selectedAnswer !== null && index === currentExercise.correctAnswer && styles.correctOption,
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                  selectedAnswer !== null && index === currentExercise.correctAnswer && styles.correctOptionText,
                ]}>
                  {option}
                </Text>
                
                {selectedAnswer === index && (
                  <AppIcon 
                    name={isCorrect ? "checkmark-circle" : "close-circle"} 
                    size={24} 
                    color={isCorrect ? "#4CAF50" : "#F44336"} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Explanation */}
          {showExplanation && (
            <View style={styles.explanationContainer}>
              <View style={styles.explanationHeader}>
                <AppIcon 
                  name={isCorrect ? "checkmark-circle" : "information-circle"} 
                  size={24} 
                  color={isCorrect ? "#4CAF50" : "#FF9800"} 
                />
                <Text style={styles.explanationTitle}>
                  {isCorrect ? i18n.t('practice.correct') : i18n.t('practice.incorrect')}
                </Text>
              </View>
              <Text style={styles.explanationText}>
                {i18n.locale === 'fa' ? currentExercise.explanationFa : currentExercise.explanation}
              </Text>
            </View>
          )}

          {/* Next Button */}
          {showExplanation && (
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton, styles.nextButton]}
              onPress={handleNext}
            >
              <Text style={styles.buttonText}>
                {currentQuestionIndex < exercises.length - 1 
                  ? i18n.t('practice.nextQuestion')
                  : i18n.t('practice.finish')
                }
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
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
  practiceTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceTypeTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
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
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    lineHeight: 26,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 16,
    height: 120,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    color: '#666',
    fontSize: 14,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  correctOption: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
    borderWidth: 2,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#6200ee',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderColor: '#6200ee',
    borderWidth: 2,
  },
  nextButton: {
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
  completionSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  completionPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  completionContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  completionMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
  },
  completionButtons: {
    gap: 12,
  },
});

export default PracticeActivity; 