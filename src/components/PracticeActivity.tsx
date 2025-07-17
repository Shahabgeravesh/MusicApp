import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import i18n from '../i18n/index';

export type PracticeQuestion = {
  type: 'note_identification' | 'rhythm_tapping' | 'scale_recognition' | 'chord_building';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  audio?: any;
  image?: any;
  hint?: string;
};

type PracticeActivityProps = {
  questions: PracticeQuestion[];
  onComplete: (score: number, total: number) => void;
};

const PracticeActivity: React.FC<PracticeActivityProps> = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answer: string | number) => {
    if (answered) return;
    
    setAnswered(true);
    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      Alert.alert(i18n.t('correct_alert_title'), i18n.t('correct_alert_message'), [{ text: i18n.t('ok_button') }]);
    } else {
      Alert.alert(i18n.t('incorrect_alert_title'), `${i18n.t('incorrect_alert_message')}: ${questions[currentQuestion].correctAnswer}`, [{ text: i18n.t('ok_button') }]);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else {
      onComplete(score, questions.length);
    }
  };

  const question = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('practice_activity_title')}</Text>
      <Text style={styles.progress}>
        {i18n.t('question_progress', { current: currentQuestion + 1, total: questions.length })}
      </Text>
      
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{question.question}</Text>
        {question.hint && (
          <Text style={styles.hint}>{question.hint}</Text>
        )}
        {question.options && (
          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  answered && option === question.correctAnswer && styles.correctAnswer,
                  answered && option !== question.correctAnswer && styles.incorrectAnswer,
                ]}
                onPress={() => handleAnswer(option)}
                disabled={answered}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {answered && (
        <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
          <Text style={styles.nextButtonText}>
            {currentQuestion < questions.length - 1 ? i18n.t('next_question_button') : i18n.t('finish_button')}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  progress: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  correctAnswer: {
    backgroundColor: '#4CAF50',
  },
  incorrectAnswer: {
    backgroundColor: '#f44336',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 500,
  },
  nextButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PracticeActivity; 