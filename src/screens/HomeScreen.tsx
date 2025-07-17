import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '../i18n';

const HomeScreen: React.FC = () => {
  // Mock progress data - in a real app this would come from storage
  const totalLessons = 14;
  const completedLessons = 3;
  const progress = (completedLessons / totalLessons) * 100;
  
  const getBadge = () => {
    if (progress >= 100) return '🎓 Master';
    if (progress >= 80) return '🌟 Expert';
    if (progress >= 60) return '⭐ Advanced';
    if (progress >= 40) return '📚 Intermediate';
    if (progress >= 20) return '🎵 Beginner';
    return '🎼 New';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('home.title')}</Text>
      <Text style={styles.subtitle}>{i18n.t('home.subtitle')}</Text>
      
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{completedLessons} of {totalLessons} lessons completed</Text>
        <Text style={styles.badge}>{getBadge()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 32,
  },
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 16,
    textAlign: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  badge: {
    fontSize: 16,
    fontWeight: 500,
    color: '#6200ee',
    textAlign: 'center',
  },
});

export default HomeScreen; 