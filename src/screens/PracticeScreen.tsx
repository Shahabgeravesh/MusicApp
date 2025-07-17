import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import i18n from '../i18n';

type PracticeCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessonRange: string;
  questionCount: number;
};

const PracticeScreen: React.FC = () => {
  const practiceCategories: PracticeCategory[] = [
    {
      id: 'basics',
      title: 'Music Basics',
      description: 'Learn about staff, clefs, and fundamental music concepts.',
      icon: '🎼',
      lessonRange: 'Lessons 1-3',
      questionCount: 3,
    },
    {
      id: 'notes',
      title: 'Notes & Pitches',
      description: 'Practice identifying notes on the staff and understanding pitch.',
      icon: '🎵',
      lessonRange: 'Lessons 4-7',
      questionCount: 2,
    },
    {
      id: 'rhythm',
      title: 'Rhythm & Timing',
      description: 'Master note values, time signatures, and rhythm patterns.',
      icon: '🥁',
      lessonRange: 'Lessons 8-10',
      questionCount: 2,
    },
    {
      id: 'scales',
      title: 'Scales & Keys',
      description: 'Learn major and minor scales, key signatures, and intervals.',
      icon: '🎹',
      lessonRange: 'Lessons 11-12',
      questionCount: 2,
    },
    {
      id: 'chords',
      title: 'Chords & Harmony',
      description: 'Understand chord construction and basic harmony.',
      icon: '🎸',
      lessonRange: 'Lesson 13',
      questionCount: 2,
    },
  ];

  const handlePracticeCategory = (category: PracticeCategory) => {
    // In a real app, this would navigate to the specific practice
    console.log(`Starting practice for: ${category.title}`);
    // For now, we'll just show an alert
    alert(`Starting ${category.title} practice with ${category.questionCount} questions!`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Activities</Text>
        <Text style={styles.subtitle}>Choose a category to practice your music theory skills</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {practiceCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => handlePracticeCategory(category)}
          >
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryRange}>{category.lessonRange}</Text>
              </View>
              <View style={styles.questionCount}>
                <Text style={styles.questionCountText}>{category.questionCount}</Text>
              </View>
            </View>
            <Text style={styles.categoryDescription}>{category.description}</Text>
            <View style={styles.categoryFooter}>
              <Text style={styles.startButton}>Start Practice</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Practice Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Total Questions</Text>
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
  categoriesContainer: {
    padding: 16,
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
  categoryIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 600,
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
    color: '#555',
    lineHeight: 20,
    marginBottom: 16,
  },
  categoryFooter: {
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
});

export default PracticeScreen; 