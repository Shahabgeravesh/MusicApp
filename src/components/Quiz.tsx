import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import i18n from '../i18n';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizProps = {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
};

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleAnswer = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === questions[current].correctAnswer) {
      setScore(score + 1);
    }
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      onComplete(score, questions.length);
    }
  };

  const q = questions[current];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('quiz_title')}</Text>
      <Text style={styles.progress}>{i18n.t('question_progress', { current: current + 1, total: questions.length })}</Text>
      <Text style={styles.question}>{q.question}</Text>
      <View style={styles.optionsContainer}>
        {q.options.map((option, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.optionButton,
              answered && option === q.correctAnswer && styles.correctAnswer,
              answered && selected === option && option !== q.correctAnswer && styles.incorrectAnswer,
            ]}
            onPress={() => handleAnswer(option)}
            disabled={answered}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {answered && (
        <TouchableOpacity style={styles.nextButton} onPress={next}>
          <Text style={styles.nextButtonText}>{current < questions.length - 1 ? i18n.t('next_button') : i18n.t('finish_button')}</Text>
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
  question: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
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
    fontWeight: '500',
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

export default Quiz; 