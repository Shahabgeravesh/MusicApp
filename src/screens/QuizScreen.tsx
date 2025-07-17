import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Quiz from '../components/Quiz';
import i18n from '../i18n';

type QuizModule = {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessonRange: string;
  questionCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
};

const QuizScreen: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const quizModules: QuizModule[] = [
    {
      id: 'basics',
      title: 'Music Basics Quiz',
      description: 'Test your knowledge of staff, clefs, and fundamental music concepts.',
      icon: '🎼',
      lessonRange: 'Lessons 1-3',
      questionCount: 2,
      difficulty: 'Beginner',
    },
    {
      id: 'notes',
      title: 'Notes & Pitches Quiz',
      description: 'Challenge yourself with note identification and pitch recognition.',
      icon: '🎵',
      lessonRange: 'Lessons 4-7',
      questionCount: 2,
      difficulty: 'Beginner',
    },
    {
      id: 'rhythm',
      title: 'Rhythm & Timing Quiz',
      description: 'Test your understanding of note values, time signatures, and rhythm.',
      icon: '🥁',
      lessonRange: 'Lessons 8-10',
      questionCount: 2,
      difficulty: 'Intermediate',
    },
    {
      id: 'scales',
      title: 'Scales & Keys Quiz',
      description: 'Challenge yourself with major/minor scales and key signatures.',
      icon: '🎹',
      lessonRange: 'Lessons 11-12',
      questionCount: 2,
      difficulty: 'Intermediate',
    },
    {
      id: 'chords',
      title: 'Chords & Harmony Quiz',
      description: 'Test your knowledge of chord construction and basic harmony.',
      icon: '🎸',
      lessonRange: 'Lesson 13',
      questionCount: 2,
      difficulty: 'Advanced',
    },
  ];

  const handleQuizModule = (module: QuizModule) => {
    setSelectedModule(module.id);
    setQuizScore(null);
  };

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore(score);
  };

  const handleQuizContinue = () => {
    setSelectedModule(null);
    setQuizScore(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#666';
    }
  };

  // Show quiz if module is selected
  if (selectedModule) {
    if (quizScore === null) {
      const quizQuestions = i18n.t(`quiz.${selectedModule}`);
      return (
        <Quiz
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      );
    } else {
      const quizQuestions = i18n.t(`quiz.${selectedModule}`);
      return (
        <View style={styles.quizCompleteContainer}>
          <Text style={styles.quizCompleteTitle}>Quiz Complete!</Text>
          <Text style={styles.quizCompleteScore}>
            Your score: {quizScore} / {quizQuestions.length}
          </Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleQuizContinue}
          >
            <Text style={styles.continueButtonText}>Back to Quiz Modules</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  // Show quiz modules list
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Modules</Text>
        <Text style={styles.subtitle}>Test your music theory knowledge with these comprehensive quizzes</Text>
      </View>

      <View style={styles.modulesContainer}>
        {quizModules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={styles.moduleCard}
            onPress={() => handleQuizModule(module)}
          >
            <View style={styles.moduleHeader}>
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleRange}>{module.lessonRange}</Text>
              </View>
              <View style={styles.moduleMeta}>
                <View style={styles.questionCount}>
                  <Text style={styles.questionCountText}>{module.questionCount}</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(module.difficulty) }]}>
                  <Text style={styles.difficultyText}>{module.difficulty}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.moduleDescription}>{module.description}</Text>
            <View style={styles.moduleFooter}>
              <Text style={styles.startButton}>Start Quiz</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Quiz Performance</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Quizzes Taken</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Perfect Scores</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  modulesContainer: {
    padding: 16,
  },
  moduleCard: {
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
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  moduleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 4,
  },
  moduleRange: {
    fontSize: 14,
    color: '#666',
  },
  moduleMeta: {
    alignItems: 'flex-end',
  },
  questionCount: {
    backgroundColor: '#6200ee',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 4,
  },
  questionCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  moduleDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  moduleFooter: {
    alignItems: 'flex-end',
  },
  startButton: {
    color: '#6200ee',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 16,
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
    fontWeight: 600,
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
    fontSize: 14,
    color: '#666',
  },
  quizCompleteContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  quizCompleteTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  quizCompleteScore: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuizScreen; 