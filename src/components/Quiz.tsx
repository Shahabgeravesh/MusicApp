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
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppIcon from './AppIcon';
import i18n from '../i18n';

const { width, height } = Dimensions.get('window');

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

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  onClose: () => void;
  title?: string;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  onComplete,
  onClose,
  title = i18n.t('quiz.title'),
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (answer: any) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowExplanation(false);
      fadeAnim.setValue(0);
    } else {
      // Quiz completed
      setShowResults(true);
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(false);
    onComplete(score, questions.length);
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'multiple_choice':
        return (
          <View style={styles.optionsContainer}>
            {currentQuestion.options?.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && isCorrect && styles.correctOption,
                  selectedAnswer === index && !isCorrect && styles.incorrectOption,
                  selectedAnswer !== null && index === currentQuestion.correctAnswer && styles.correctOption,
                ]}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.selectedOptionText,
                  selectedAnswer !== null && index === currentQuestion.correctAnswer && styles.correctOptionText,
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
        );

      case 'true_false':
        return (
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedAnswer === true && isCorrect && styles.correctOption,
                selectedAnswer === true && !isCorrect && styles.incorrectOption,
                selectedAnswer !== null && currentQuestion.correctAnswer === true && styles.correctOption,
              ]}
              onPress={() => handleAnswerSelect(true)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === true && styles.selectedOptionText,
                selectedAnswer !== null && currentQuestion.correctAnswer === true && styles.correctOptionText,
              ]}>
                {i18n.t('quiz.true')}
              </Text>
              
              {selectedAnswer === true && (
                <AppIcon 
                  name={isCorrect ? "checkmark-circle" : "close-circle"} 
                  size={24} 
                  color={isCorrect ? "#4CAF50" : "#F44336"} 
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedAnswer === false && isCorrect && styles.correctOption,
                selectedAnswer === false && !isCorrect && styles.incorrectOption,
                selectedAnswer !== null && currentQuestion.correctAnswer === false && styles.correctOption,
              ]}
              onPress={() => handleAnswerSelect(false)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === false && styles.selectedOptionText,
                selectedAnswer !== null && currentQuestion.correctAnswer === false && styles.correctOptionText,
              ]}>
                {i18n.t('quiz.false')}
              </Text>
              
              {selectedAnswer === false && (
                <AppIcon 
                  name={isCorrect ? "checkmark-circle" : "close-circle"} 
                  size={24} 
                  color={isCorrect ? "#4CAF50" : "#F44336"} 
                />
              )}
            </TouchableOpacity>
          </View>
        );

      case 'fill_blank':
        return (
          <View style={styles.fillBlankContainer}>
            <Text style={styles.fillBlankText}>
              {i18n.t('quiz.fillBlankInstruction')}
            </Text>
            <View style={styles.fillBlankOptions}>
              {currentQuestion.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.fillBlankOption,
                    selectedAnswer === option && isCorrect && styles.correctOption,
                    selectedAnswer === option && !isCorrect && styles.incorrectOption,
                    selectedAnswer !== null && option === currentQuestion.correctAnswer && styles.correctOption,
                  ]}
                  onPress={() => handleAnswerSelect(option)}
                  disabled={selectedAnswer !== null}
                >
                  <Text style={[
                    styles.fillBlankOptionText,
                    selectedAnswer === option && styles.selectedOptionText,
                    selectedAnswer !== null && option === currentQuestion.correctAnswer && styles.correctOptionText,
                  ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#6200ee', '#03dac6']} style={styles.header}>
          <AppIcon name="trophy" size={48} color="#fff" />
          <Text style={styles.completionTitle}>{i18n.t('quiz.completed')}</Text>
          <Text style={styles.completionSubtitle}>
            {i18n.t('quiz.finalScore', { score, total: questions.length })}
          </Text>
          <Text style={styles.completionPercentage}>
            {Math.round((score / questions.length) * 100)}%
          </Text>
        </LinearGradient>

        <View style={styles.completionContent}>
          <Text style={styles.completionMessage}>
            {score === questions.length 
              ? i18n.t('quiz.perfectScore')
              : score >= questions.length * 0.8
              ? i18n.t('quiz.excellentScore')
              : score >= questions.length * 0.6
              ? i18n.t('quiz.goodScore')
              : i18n.t('quiz.keepPracticing')
            }
          </Text>
          
          <View style={styles.completionButtons}>
            <TouchableOpacity 
              style={[styles.button, styles.primaryButton]}
              onPress={handleFinishQuiz}
            >
              <Text style={styles.buttonText}>{i18n.t('quiz.continue')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={onClose}
            >
              <Text style={styles.secondaryButtonText}>{i18n.t('quiz.close')}</Text>
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
              {i18n.t('quiz.progress', { 
                current: currentQuestionIndex + 1, 
                total: questions.length 
              })}
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>
        
        <View style={styles.quizInfo}>
          <AppIcon name="help-circle" size={32} color="#fff" />
          <Text style={styles.quizTitle}>{title}</Text>
        </View>
      </LinearGradient>

      {/* Question Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim }}>
          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {i18n.locale === 'fa' ? currentQuestion.questionFa : currentQuestion.question}
            </Text>
            
            {currentQuestion.imageUrl && (
              <View style={styles.imageContainer}>
                <Text style={styles.imagePlaceholder}>
                  {i18n.t('quiz.imagePlaceholder')}
                </Text>
              </View>
            )}
          </View>

          {/* Answer Options */}
          {renderQuestionContent()}

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
                  {isCorrect ? i18n.t('quiz.correct') : i18n.t('quiz.incorrect')}
                </Text>
              </View>
              <Text style={styles.explanationText}>
                {i18n.locale === 'fa' ? currentQuestion.explanationFa : currentQuestion.explanation}
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
                {currentQuestionIndex < questions.length - 1 
                  ? i18n.t('quiz.nextQuestion')
                  : i18n.t('quiz.finish')
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
  quizInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizTitle: {
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
  fillBlankContainer: {
    marginBottom: 20,
  },
  fillBlankText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  fillBlankOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  fillBlankOption: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fillBlankOptionText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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

export default Quiz; 